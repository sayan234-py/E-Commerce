import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom' 
import dashboard_icon from "../../assets/dash_icon.png"
import add_product_icon from "../../assets/Product_cart.png"
import list_product_icon from "../../assets/List_product.png"
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/dashboard'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={dashboard_icon} alt="" className='add_crt'/>
                <p>Dashboard</p>
            </div>
        </Link>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" className='add_crt'/>
                <p>Add product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" className='add_ctr'/>
                <p>Product List </p>
            </div>
        </Link>
        
        </div>
  )
}

export default Sidebar