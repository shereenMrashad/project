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
            />
            <Card.Body className='text-center'>
                <h6 className='text-muted'>{product.category}</h6>
                <h5 className='product-name'>{product.name}</h5>
                <h6 className='text-muted'>${product.price}</h6>
                <div className='product-actions mt-3'>
                    <Link
                        to={`/product/${product.id}`}
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
