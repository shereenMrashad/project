import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import productsData from '../data/products.json'; // Your products JSON file
import ComparisonTable from './ComparisonTable'; // Import the ComparisonTable
import './ProductDetails.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetails = ({ onAddToCart, onAddToWishlist, onAddToCompare, comparisonList, onRemoveFromCompare }) => {
  const { productId } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Find the product by its ID
    const foundProduct = productsData.products.find(p => p.id === parseInt(productId));
    setProduct(foundProduct);
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <Carousel showThumbs>
          {/* Ensure to use product.image for displaying images */}
          <div>
            <img src={product.image} alt={`${product.name}`} />
          </div>
        </Carousel>
      </div>

      <div className="product-info-section">
        <h1 className="product-name">{product.name}</h1>
        <div className="product-rating">
          <span>⭐⭐⭐⭐⭐</span> {/* Replace with dynamic rating logic */}
          <span> (3,345 reviews)</span>
        </div>
        <p className="product-price">{product.price}</p>

        {/* Action Buttons */}
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>Add To Cart</button>

        {/* Link the Buy Now button to the payment page */}
        <Link to="/payment" className="buy-now-btn">Buy Now</Link>

        <button className="add-to-compare-btn" onClick={() => onAddToCompare(product)}>
          Add To Compare
        </button>

        {/* Product Description */}
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        {/* Product Specifications */}
        <div className="product-specifications">
          <h3>Specifications</h3>
          <ul>
            <li><strong>Dimensions:</strong> {product.specifications.dimensions}</li>
            <li><strong>Material:</strong> {product.specifications.material}</li>
            <li><strong>Color:</strong> {product.specifications.color}</li>
            <li><strong>Assembly:</strong> {product.specifications.assembly}</li>
            <li><strong>Warranty:</strong> {product.specifications.warranty}</li>
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <ComparisonTable comparisonList={comparisonList} onRemoveFromCompare={onRemoveFromCompare} />
    </div>
  );
};

export default ProductDetails;
