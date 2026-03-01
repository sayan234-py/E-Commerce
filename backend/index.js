// ================= IMPORTS =================
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

// ================= CHECK ENV =================
if (!process.env.MONGO_URI) {
  console.log("❌ MONGO_URI not found!");
}
if (!process.env.JWT_SECRET) {
  console.log("❌ JWT_SECRET not found!");
}

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(
  cors({
    origin: "*", // later change to frontend URL
  })
);

// ================= MONGODB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.log("❌ MongoDB error:", err.message));

// ================= CLOUDINARY =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= MULTER =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= CLOUDINARY UPLOAD =================
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("✅ Express server running");
});

// ================= PRODUCT MODEL =================
const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

// ================= ALL PRODUCTS =================
app.get("/allproducts", async (req, res) => {
  try {
    const data = await Product.find({});
    res.json(data);
  } catch (err) {
    console.log("Allproducts error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================= POPULAR WOMEN =================
app.get("/popularwomen", async (req, res) => {
  try {
    const data = await Product.find({ category: "women" }).limit(8);
    res.json(data);
  } catch (err) {
    console.log("Popularwomen error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================= ADD PRODUCT =================
app.post("/addproduct", async (req, res) => {
  try {
    const last = await Product.findOne().sort({ id: -1 });
    const id = last ? last.id + 1 : 1;

    const product = new Product({ ...req.body, id });
    await product.save();

    res.json({ success: true });
  } catch (err) {
    console.log("Addproduct error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================= USERS =================
const Users = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    const exists = await Users.findOne({ email: req.body.email });
    if (exists) return res.json({ success: false, msg: "User exists" });

    const user = new Users(req.body);
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    console.log("Signup error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.json({ success: false, msg: "Wrong email" });

    if (user.password !== req.body.password)
      return res.json({ success: false, msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    console.log("Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// =================  =================
app.get("/newcollections", async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ date: -1 })
      .limit(8);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= START =================
app.listen(port, () => {
  console.log("🚀 Server running on port", port);
});
