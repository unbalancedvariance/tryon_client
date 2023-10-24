import React from 'react';
import './Home.css'; // Import styles




const Product = ({ products, onAddToLoadout }) => {
  
  
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
          <button 
            className="virtualTryOnButton" 
            onClick={() => onAddToLoadout(product.imageUrl)}>
            Add to loadout
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;