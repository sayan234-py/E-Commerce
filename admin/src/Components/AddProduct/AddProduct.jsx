import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from "../../assets/Upload_Area.jpg";

const AddProduct = () => {

    const [image, setImage] = useState(null);

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    // Handle image selection
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle input changes
    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        });
    };

    // Add product function
    const Add_Product = async () => {
        try {
            let product = { ...productDetails };

            // ---------- IMAGE UPLOAD ----------
            const formData = new FormData();
            formData.append("image", image);

            const uploadResponse = await fetch("http://localhost:5001/upload", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            });

            const uploadData = await uploadResponse.json();

            if (!uploadData.success) {
                alert("Image upload failed");
                return;
            }

            product.image = uploadData.image_url;

            // ---------- ADD PRODUCT ----------
            const productResponse = await fetch("http://localhost:5001/addproduct", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            const productData = await productResponse.json();

            productData.success
                ? alert("Product Added Successfully")
                : alert("Failed to Add Product");

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="addproduct">

            <div className="addproduct-itemfields">
                <p>Product Title</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Type Name"
                    value={productDetails.name}
                    onChange={changeHandler}
                />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        type="text"
                        name="old_price"
                        placeholder="Type price"
                        value={productDetails.old_price}
                        onChange={changeHandler}
                    />
                </div>

                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        type="text"
                        name="new_price"
                        placeholder="Type price"
                        value={productDetails.new_price}
                        onChange={changeHandler}
                    />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    name="category"
                    className="add-product-selector"
                    value={productDetails.category}
                    onChange={changeHandler}
                >
                    <option value="women">WOMEN</option>
                    <option value="men">MEN</option>
                    <option value="kid">KID</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className="addproduct-img"
                        alt="Upload"
                    />
                </label>
                <input
                    type="file"
                    id="file-input"
                    hidden
                    onChange={imageHandler}
                />
            </div>

            <button className="addproduct-btn" onClick={Add_Product}>
                ADD PRODUCT
            </button>

        </div>
    );
};

export default AddProduct;
