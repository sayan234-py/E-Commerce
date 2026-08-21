// index.js - COMPLETE WITH DATABASE-AWARE CHATBOT

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { Groq } = require("groq-sdk");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
const requiredEnvVars = ["MONGO_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
const hasCloudinaryConfig =
process.env.CLOUDINARY_CLOUD_NAME &&
process.env.CLOUDINARY_API_KEY &&
process.env.CLOUDINARY_API_SECRET;

// Initialize Groq client
const groqClient = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

/* ---------------- Middleware ---------------- */
app.use(express.json());
const configuredOrigins = process.env.CORS_ORIGINS
? process.env.CORS_ORIGINS.split(",")
.map((origin) => origin.trim())
.filter(Boolean)
: [];
const strictCors = process.env.STRICT_CORS === "true";

if (!strictCors || configuredOrigins.length === 0) {
app.use(cors());
} else {
app.use(
cors({
origin: (origin, callback) => {
if (!origin || configuredOrigins.includes(origin)) {
callback(null, true);
return;
}
callback(null, false);
},
})
);
}

/* ---------------- MongoDB Connection ---------------- */
const connectToMongo = async () => {
await mongoose.connect(process.env.MONGO_URI);
console.log("✅ MongoDB Atlas connected");
};

/* ---------------- Cloudinary Config ---------------- */
if (hasCloudinaryConfig) {
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});
} else {
console.warn(
"⚠️ Cloudinary is not fully configured. /upload endpoint will be unavailable."
);
}

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

app.get("/health", (req, res) => {
const dbState = mongoose.connection.readyState;
const dbConnected = dbState === 1;
const statusCode = dbConnected ? 200 : 503;

res.status(statusCode).json({
status: dbConnected ? "ok" : "degraded",
dbConnected,
});
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
if (!hasCloudinaryConfig) {
return res.status(503).json({
success: false,
message: "Image upload service is not configured",
});
}

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
app.get("/popularwomen", async (req, res) => {
try {
const products = await Product.find({ category: "women" }).limit(8);
res.json(products);
} catch (error) {
res.status(500).json({ error: "Server error" });
}
});

/* ============================================
CHATBOT ROUTES WITH DATABASE PRODUCTS
============================================ */

// Helper function to format products for the chatbot
const formatProductsForPrompt = (products) => {
if (!products || products.length === 0) {
return "Currently, we don't have products in our catalog.";
}

const productsByCategory = {};

products.forEach((product) => {
if (!productsByCategory[product.category]) {
productsByCategory[product.category] = [];
}
productsByCategory[product.category].push(product);
});

let productText = "Our Current Products:\n\n";

Object.entries(productsByCategory).forEach(([category, items]) => {
productText += `**${category.toUpperCase()}**\n`;
items.slice(0, 5).forEach((product) => {
productText += `- ${product.name} | ₹${product.new_price} (Was ₹${product.old_price}) | ID: ${product.id}\n`;
});
productText += "\n";
});

return productText;
};

// Dynamic system prompt that includes products
const getSystemPrompt = (products) => {
const productsData = formatProductsForPrompt(products);

return `You are a friendly and expert shopping assistant for an e-commerce fashion store.

${productsData}

Your job is to help customers find the perfect products by:
1. Understanding their needs (occasion, style preference, budget, category)
2. Asking clarifying questions if needed
3. Recommending actual products from our catalog with names, prices, and IDs
4. Helping them make a purchase decision

IMPORTANT BEHAVIORS:
- Be conversational and friendly
- Ask about: occasion (casual/formal/party), budget, preferred category (men/women/kids)
- Always recommend ACTUAL products from the list above with their REAL names and prices
- Include product IDs (for cart functionality)
- Keep responses concise but detailed
- Use emojis to make responses engaging
- If customer wants something we don't have, be honest and suggest similar alternatives
- Product cards with images are shown automatically beneath your reply when a match is found, so don't repeat long price/ID lists — keep the text short and let the cards do the showing

When recommending products, format like:
"Based on your needs, I suggest:
1. **[Product Name]** - ₹[Price]
✓ Perfect for [use case]
✓ ID: [product_id]

2. **[Product Name]** - ₹[Price]
✓ Perfect for [use case]
✓ ID: [product_id]"`;
};

// Stopwords ignored when extracting search keywords from a user message
const CHAT_SEARCH_STOPWORDS = new Set([
"the","a","an","for","of","and","to","in","on","with","show","me","find",
"looking","look","want","need","some","any","please","have","do","you",
"can","give","suggest","recommend","under","below","above","near","best",
"good","nice","hi","hey","hello","buy","get","cheap","new","product",
"products","item","items","please","would","like","about",
]);

// Extract meaningful keywords from the latest user message and match them
// against product name/category so the frontend can render product cards.
const findMatchingProducts = async (userText, limit = 4) => {
if (!userText || typeof userText !== "string") return [];

const words = userText.toLowerCase().match(/[a-z]+/g) || [];
const keywords = [...new Set(words.filter((w) => w.length > 2 && !CHAT_SEARCH_STOPWORDS.has(w)))];

if (keywords.length === 0) return [];

const orConditions = keywords.flatMap((word) => [
{ name: { $regex: word, $options: "i" } },
{ category: { $regex: word, $options: "i" } },
]);

try {
const matches = await Product.find({ $or: orConditions }).limit(limit);
return matches;
} catch (error) {
console.error("Product search error:", error);
return [];
}
};

/* POST /api/chatbot/chat (Streaming with DB) */
app.post("/api/chatbot/chat", async (req, res) => {
try {
const { messages } = req.body;

if (!messages || !Array.isArray(messages)) {
return res.status(400).json({ error: "messages array required" });
}

if (!process.env.GROQ_API_KEY) {
return res.status(503).json({
error: "Chatbot service is not configured. Add GROQ_API_KEY to .env",
});
}

// Fetch ALL products from database
const products = await Product.find({});

if (!products || products.length === 0) {
return res.status(503).json({
error: "No products in database. Please add products first.",
});
}

// Get dynamic system prompt with actual products
const systemPrompt = getSystemPrompt(products);

// Find products matching the customer's latest message for card display
const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
const matchedProducts = await findMatchingProducts(lastUserMessage?.content);

// Set headers for Server-Sent Events (SSE)
res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");

// Call Groq API with streaming
const stream = await groqClient.chat.completions.create({
model: "openai/gpt-oss-20b",
messages: [
{ role: "system", content: systemPrompt },
...messages,
],
stream: true,
temperature: 0.7,
max_tokens: 500,
});

// Stream chunks back to client as SSE format
for await (const chunk of stream) {
if (chunk.choices[0].delta.content) {
res.write(
`data: ${JSON.stringify({ content: chunk.choices[0].delta.content })}\n\n`
);
}
}

// Send matched products as a dedicated SSE event so the frontend can render cards
if (matchedProducts.length > 0) {
res.write(`data: ${JSON.stringify({ products: matchedProducts })}\n\n`);
}

res.write("data: [DONE]\n\n");
res.end();
} catch (error) {
console.error("Chatbot Error:", error?.error || error?.message || error);
if (!res.headersSent) {
res.status(500).json({ error: "Failed to generate response" });
} else {
res.end();
}
}
});

/* POST /api/chatbot/chat-simple (No Streaming) */
app.post("/api/chatbot/chat-simple", async (req, res) => {
try {
const { messages } = req.body;

if (!messages || !Array.isArray(messages)) {
return res.status(400).json({ error: "messages array required" });
}

if (!process.env.GROQ_API_KEY) {
return res.status(503).json({
error: "Chatbot service is not configured. Add GROQ_API_KEY to .env",
});
}

// Fetch products from database
const products = await Product.find({});

if (!products || products.length === 0) {
return res.status(503).json({
error: "No products in database.",
});
}

// Get dynamic system prompt with actual products
const systemPrompt = getSystemPrompt(products);

// Find products matching the customer's latest message for card display
const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
const matchedProducts = await findMatchingProducts(lastUserMessage?.content);

const response = await groqClient.chat.completions.create({
model: "openai/gpt-oss-20b",
messages: [
{ role: "system", content: systemPrompt },
...messages,
],
temperature: 0.7,
max_tokens: 500,
});

res.json({
success: true,
response: response.choices[0].message.content,
products: matchedProducts,
});
} catch (error) {
console.error("Chatbot Error:", error?.error || error?.message || error);
res.status(500).json({ error: "Failed to generate response" });
}
});

/* GET /api/chatbot/products (Get all products for debugging) */
app.get("/api/chatbot/products", async (req, res) => {
try {
const products = await Product.find({});
res.json(products);
} catch (error) {
res.status(500).json({ error: "Failed to fetch products" });
}
});

/* ============================================
SERVER START
============================================ */

const startServer = async () => {
if (missingEnvVars.length > 0) {
console.error(
`❌ Missing required environment variables: ${missingEnvVars.join(", ")}`
);
process.exit(1);
}

try {
await connectToMongo();
app.listen(port, () => {
console.log(`✅ Server running on http://localhost:${port}`);
console.log(`✅ Chatbot routes available at /api/chatbot/*`);
});
} catch (error) {
console.error("❌ Failed to start server:", error);
process.exit(1);
}
};

startServer();
