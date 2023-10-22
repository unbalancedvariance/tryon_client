import React from 'react';
import './Home.css'; // Import styles

const Product = ({ products }) => {
  // If products array is empty or not provided, render nothing
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="productDisplay">
      {products.map((product, i) => (
        <div key={i} className="productInfo">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="productImage"
          />
          <p>{product.name}</p>
          {/* Virtual Try On button */}
          <button className="virtualTryOnButton">Virtual Try On</button>
        </div>
      ))}
    </div>
  );
};

export default Product;

