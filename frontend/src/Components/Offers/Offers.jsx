import React from 'react'
import './Offers.css'
// import excluve_image from '../Assets/exclusive_image.png'

const exclusive_image = "https://res.cloudinary.com/dp2h1zqb4/image/upload/v1770738107/exclusive_image_kmgre2.png"

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>only on best sellers product</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers;