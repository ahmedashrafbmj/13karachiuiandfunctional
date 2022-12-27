import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';

import { addToCart } from '../store/cartSlice';

const Products = () => {
    
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {
            const res = await fetch('https://13k.up.railway.app/api/allpostdata');
            const data = await res.json();
            console.log(data);
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleAdd = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <div className="productsWrapper">
            {products.map((product) => (
                <div className="card" key={product._id}>
                    <img src={product.imageURL} alt="" />
                    <h1>{product.hotelname}</h1>
                    <h4>{product.productName}</h4>
                    <h5>{product.productPrice}</h5>
                    <button onClick={() => handleAdd(product)} className="btn">
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Products;
