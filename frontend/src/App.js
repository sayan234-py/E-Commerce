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

// Men's Category Banners
const men_banners = [
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737681/banner_mens_kw6tph.png",
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1786269044/Screenshot_2026-08-09_at_3.12.54_PM_oufnuw.png",
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1786269044/Screenshot_2026-08-09_at_3.13.12_PM_w4cfgl.png"
];

// Women's Category Banners
const women_banners = [
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737026/banner_women_vtvhc1.png",
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1786269044/Screenshot_2026-08-09_at_3.14.01_PM_fk65ee.png",
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1786269044/Screenshot_2026-08-09_at_3.16.42_PM_fifeoi.png"
];

// Kids Category Banners
const kid_banners = [
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737682/banner_kids_abxmkm.png",
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1786269056/Screenshot_2026-08-09_at_3.17.39_PM_p2sqkw.png",
  "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1786269057/Screenshot_2026-08-09_at_3.19.34_PM_jh5gy4.png"
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
