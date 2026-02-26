
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';

const men_banner = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737681/banner_mens_kw6tph.png"
const women_banner = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737026/banner_women_vtvhc1.png"
const kid_banner = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770737682/banner_kids_abxmkm.png"

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/mens' element={<ShopCategory category="men" banner={men_banner} />} />
        <Route path='/womens' element={<ShopCategory category="women" banner={women_banner} />} />
        <Route path='/kids' element={<ShopCategory category="kid" banner={kid_banner} />} />
        <Route path='/product' element={<Product/>}>
        <Route path=':productId' element={<Product/>} />
        </Route>
        
        <Route path='/login' element={<LoginSignup />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
