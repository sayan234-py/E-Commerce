import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import PopupChatbot from './Components/PopupChatbot/PopupChatbot';

// Men's Category Banners - Product images on right
const men_banners = [
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737681/banner_mens_kw6tph.png", // Male model 1
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737681/banner_mens_secondary.png", // Male model 2 (add your URL)
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737681/banner_mens_tertiary.png" // Male model 3 (add your URL)
];

// Women's Category Banners - Product images on right
const women_banners = [
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737026/banner_women_vtvhc1.png", // Female model 1
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737026/banner_women_secondary.png", // Female model 2 (add your URL)
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737026/banner_women_tertiary.png" // Female model 3 (add your URL)
];

// Kids Category Banners - Product images on right
const kid_banners = [
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737682/banner_kids_abxmkm.png", // Kids model 1
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737682/banner_kids_secondary.png", // Kids model 2 (add your URL)
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737682/banner_kids_tertiary.png" // Kids model 3 (add your URL)
];

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route 
            path='/mens' 
            element={<ShopCategory banners={men_banners} category="men" />} 
          />
          <Route 
            path='/womens' 
            element={<ShopCategory banners={women_banners} category="women" />} 
          />
          <Route 
            path='/kids' 
            element={<ShopCategory banners={kid_banners} category="kid" />} 
          />
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>} />
          </Route>
          
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        <Footer />
        <PopupChatbot />
      </BrowserRouter>
    </div>
  );
}

export default App;
