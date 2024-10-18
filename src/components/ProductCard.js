import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, onAddToWishlist }) {
    return (
        <Card className='product-card shadow-sm'>
            <Card.Img
                variant="top"
                src={product.image}
                alt={`Image of ${product.name}`}
                className='card-img'
                onError={(e) => { e.target.src = '/path/to/default-image.png'; }}
            />
            <Card.Body className='text-center'>
                <h5 className='product-name'>{product.name}</h5>
                <p className='product-description'>{product.description}</p>
                <h6 className='product-price'>{product.price}</h6>
                <div className='product-actions mt-3'>
                    <Link
                        to={`/product/${product.id}`} // Link to the product details page
                        className="btn btn-outline-secondary me-2"
                        role="button"
                    >
                        <i className="bi bi-eye"></i> View Details
                    </Link>
                    <button
                        className='btn btn-outline-warning me-2'
                        onClick={() => onAddToWishlist(product)}
                        aria-label={`Add ${product.name} to wishlist`}
                    >
                        <i className="bi bi-star"></i> Add to Wishlist
                    </button>
                    <button
                        className='btn btn-primary'
                        onClick={() => onAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <i className="bi bi-cart3"></i> Add to Cart
                    </button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;
