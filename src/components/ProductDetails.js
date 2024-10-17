import React, { useState } from 'react';
import './ProductDetails.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const ProductDetails = ({ product, onAddToCompare }) => {
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handleFabricChange = (e) => setSelectedFabric(e.target.value);
  const handleColorChange = (e) => setSelectedColor(e.target.value);
  const handleSizeChange = (e) => setSelectedSize(e.target.value);

  return (
    <div className="product-details-container">
      {/* Left Section: Image Carousel */}
      <div className="product-image-section">
        <Carousel showThumbs>
          {product.images && product.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`${product.name} view ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Right Section: Product Info */}
      <div className="product-info-section">
        <h1 className="product-name">{product.name}</h1>
        <div className="product-rating">
          <span>⭐⭐⭐⭐⭐</span> {/* Replace with dynamic rating logic */}
          <span> (3,345 reviews)</span>
        </div>
        <p className="product-price">${product.price}</p>

        {/* Customization Options */}
        <h3>Colors</h3>
        <div>
          <button className="color-option" style={{ backgroundColor: "#76b39d" }} onClick={() => setSelectedColor('Green')}></button>
          <button className="color-option" style={{ backgroundColor: "#d9d9d9" }} onClick={() => setSelectedColor('Gray')}></button>
        </div>

        <h3>Customization Options</h3>
        <label>
          Select Fabric:
          <select value={selectedFabric} onChange={handleFabricChange}>
            <option value="">Choose...</option>
            <option value="Fabric1">Fabric 1</option>
            <option value="Fabric2">Fabric 2</option>
          </select>
        </label>
        <br />
        <label>
          Select Color:
          <select value={selectedColor} onChange={handleColorChange}>
            <option value="">Choose...</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </select>
        </label>
        <br />
        <label>
          Select Size:
          <select value={selectedSize} onChange={handleSizeChange}>
            <option value="">Choose...</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>

        {/* Action Buttons */}
        <button className="add-to-cart-btn">Add To Cart</button>
        <button className="buy-now-btn">Buy Now</button>

        {/* Add to Compare Button */}
        <button className="add-to-compare-btn" onClick={onAddToCompare}>
          ❤ Add to Compare
        </button>

        {/* Description */}
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        {/* Specifications */}
        <h3>Specifications</h3>
        <ul className="product-specifications">
          <li><strong>Dimensions:</strong> {product.specifications?.dimensions}</li>
          <li><strong>Material:</strong> {product.specifications?.material}</li>
          <li><strong>Color:</strong> {product.specifications?.color}</li>
          <li><strong>Assembly:</strong> {product.specifications?.assembly}</li>
          <li><strong>Warranty:</strong> {product.specifications?.warranty}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
