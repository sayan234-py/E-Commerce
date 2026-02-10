// index.js
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;

/* ---------------- Middleware ---------------- */
app.use(express.json());
app.use(cors());

/* ---------------- MongoDB Connection ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ---------------- Cloudinary Config ---------------- */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ---------------- Multer (Memory Storage) ---------------- */
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ---------------- Cloudinary Upload Helper ---------------- */
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* ---------------- Test Route ---------------- */
app.get("/", (req, res) => {
  res.send("✅ Express server is running!");
});

/* ---------------- Product Schema ---------------- */
const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Product = mongoose.model("Product", productSchema);

/* ---------------- Upload Image (Cloudinary) ---------------- */
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    const result = await uploadToCloudinary(req.file.buffer);

    res.json({
      success: true,
      image_url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

/* ---------------- Add Product ---------------- */
app.post("/addproduct", async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const id = lastProduct ? lastProduct.id + 1 : 1;

    const product = new Product({
      id,
      name,
      image,
      category,
      new_price,
      old_price,
    });

    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ---------------- Remove Product ---------------- */
app.post("/removeproduct", async (req, res) => {
  const deleted = await Product.findOneAndDelete({ id: req.body.id }); 
  if (!deleted)
    return res.status(404).json({ success: false, message: "Product not found" });

  res.json({ success: true, name: deleted.name });
});

/* ---------------- Get All Products ---------------- */
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/* ---------------- User Schema ---------------- */
const Users = mongoose.model("Users", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  cartData: Object,
  date: { type: Date, default: Date.now },
});

/* ---------------- Signup ---------------- */
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check)
    return res.status(400).json({ success: false, errors: "User exists" });

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

/* ---------------- Login ---------------- */
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user)
    return res.json({ success: false, errors: "Wrong email" });

  if (req.body.password !== user.password)
    return res.json({ success: false, errors: "Wrong password" });

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

/* ---------------- Auth Middleware ---------------- */
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ errors: "Authentication required" });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch {
    res.status(401).json({ errors: "Invalid token" });
  }
};

/* ---------------- Cart APIs ---------------- */
app.post("/addtocart", fetchUser, async (req, res) => {
  const userData = await Users.findById(req.user.id);

  if (!userData) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!userData.cartData[req.body.itemId]) {
    userData.cartData[req.body.itemId] = 0;
  }

  userData.cartData[req.body.itemId] += 1;

  await Users.findByIdAndUpdate(req.user.id, {
    cartData: userData.cartData,
  });

  res.json({ success: true });
});


app.post("/removefromcart", fetchUser, async (req, res) => {
  const userData = await Users.findById(req.user.id);

  if (!userData) {
    return res.status(404).json({ error: "User not found" });
  }

  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findByIdAndUpdate(req.user.id, {
    cartData: userData.cartData,
  });

  res.json({ success: true });
});


app.post("/getcart", fetchUser, async (req, res) => {
  const userData = await Users.findById(req.user.id);

  if (!userData) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(userData.cartData);
});

/* ---------------- New Collection ---------------- */
app.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ date: -1 })
      .limit(8);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ---------------- Popular in Women ---------------- */
app.get("/popinwoman", async (req, res) => {
  try {
    const products = await Product.find({ category: "women" }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


/* ---------------- Server ---------------- */
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
