# 🛍️ Nandi Fashions — Full-Stack MERN E-Commerce

A full-stack e-commerce web application built with the **MERN stack**, featuring a customer-facing storefront, a dedicated admin dashboard, and a RESTful backend API. Products are managed via Cloudinary image uploads and persisted in MongoDB Atlas.

🔗 **Live Demo:** [e-commerce-bd1y.onrender.com](https://e-commerce-bd1y.onrender.com)

---

## 📸 Features

### 🛒 Customer Storefront
- Browse products by category — Men, Women, Kids
- View product details with related item suggestions
- Add / remove items from cart (persisted per user)
- User authentication — Signup & Login with JWT
- New Collections and Popular Products sections
- Newsletter subscription section
- Fully responsive layout

### 🔧 Admin Dashboard
- Add new products with image upload (Cloudinary)
- View and manage all listed products
- Dashboard with analytics using Recharts
- Built with Vite + React + Tailwind CSS + Framer Motion

### ⚙️ Backend API
- RESTful API with Express.js
- MongoDB Atlas via Mongoose
- JWT-based authentication middleware
- Cart operations (get, add, remove) per authenticated user
- Cloudinary image upload via Multer + Streamifier
- Redis-ready setup

---

## 🛠 Tech Stack

| Layer         | Technology                                              |
|---------------|---------------------------------------------------------|
| Frontend      | React 19, React Router DOM v7, CRA                     |
| Admin Panel   | React 19, Vite, Tailwind CSS, Framer Motion, Recharts  |
| Backend       | Node.js, Express.js 5                                  |
| Database      | MongoDB Atlas (Mongoose)                               |
| Auth          | JSON Web Tokens (JWT)                                  |
| Image Storage | Cloudinary                                             |
| File Upload   | Multer (memory storage) + Streamifier                  |
| Deployment    | Render                                                 |

---

## 📁 Project Structure

```
E-Commerce/
├── backend/                    # Express REST API
│   ├── index.js                # Server entry — routes, models, middleware
│   ├── upload/                 # Local upload buffer (Multer)
│   └── package.json
│
├── frontend/                   # Customer storefront (React / CRA)
│   └── src/
│       ├── App.js              # Routes setup
│       ├── config.js           # API base URL config
│       ├── Pages/
│       │   ├── Shop.jsx        # Home / landing page
│       │   ├── ShopCategory.jsx# Category page (Men / Women / Kids)
│       │   ├── Product.jsx     # Single product detail page
│       │   ├── Cart.jsx        # Cart page
│       │   └── LoginSignup.jsx # Auth page
│       ├── Components/
│       │   ├── Navbar/
│       │   ├── Hero/
│       │   ├── Popular/
│       │   ├── NewCollections/
│       │   ├── Offers/
│       │   ├── Item/
│       │   ├── CartItems/
│       │   ├── ProductDisplay/
│       │   ├── RelatedProducts/
│       │   ├── DescriptionBox/
│       │   ├── Breadcrumbs/
│       │   ├── NewsLetter/
│       │   └── Footer/
│       └── Context/            # React Context for cart & auth state
│
└── admin/                      # Admin dashboard (React / Vite)
    └── src/
        ├── App.jsx
        ├── Pages/
        │   └── Admin/          # Admin root layout
        └── Components/
            ├── Navbar/
            ├── Sidebar/
            ├── Dashboard/
            ├── AddProduct/
            └── ListProduct/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

---

### 1. Clone the Repository

```bash
git clone https://github.com/sayan234-py/E-Commerce.git
cd E-Commerce
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend:

```bash
npm start
```

The API runs at `http://localhost:5001`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The storefront runs at `http://localhost:3000`

> By default it points to the deployed backend. To use your local backend, create a `.env` in `frontend/`:
> ```env
> REACT_APP_API_URL=http://localhost:5001
> ```

---

### 4. Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

The admin panel runs at `http://localhost:5173`

---

## 🔌 API Endpoints

| Method | Endpoint           | Auth     | Description                  |
|--------|--------------------|----------|------------------------------|
| GET    | `/`                | ❌        | Health check                 |
| GET    | `/allproducts`     | ❌        | Fetch all products            |
| GET    | `/newcollections`  | ❌        | Latest 8 products             |
| GET    | `/popularwomen`    | ❌        | Popular women's products      |
| POST   | `/addproduct`      | ❌        | Add a new product             |
| POST   | `/signup`          | ✅ JWT    | Register a new user           |
| POST   | `/login`           | ✅ JWT    | Login and receive JWT token   |
| POST   | `/getcart`         | ✅ JWT    | Get user's cart data          |
| POST   | `/addtocart`       | ✅ JWT    | Add item to cart              |
| POST   | `/removefromcart`  | ✅ JWT    | Remove item from cart         |

> Authenticated routes require `auth-token` header with a valid JWT.

---

## ☁️ Deployment

All three apps are deployed on **Render**:

| App      | Type          | URL                                       |
|----------|---------------|-------------------------------------------|
| Backend  | Web Service   | `https://e-commerce-1-6kbc.onrender.com`  |
| Frontend | Static Site   | `https://e-commerce-bd1y.onrender.com`    |
| Admin    | Static Site   | *(separate Render service)*               |

---

## 📬 Contact

**Sayan Nandi**
- 📧 [nsayan520@gmail.com](mailto:nsayan520@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/sayan-nandi-152581359)
- 🐙 [GitHub](https://github.com/sayan234-py)
- 📍 Durgapur, West Bengal, India

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with 💙 by Sayan Nandi — BCA Student & MERN Stack Developer
