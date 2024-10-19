import React from 'react';
import './WishlistPage.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WishlistPage({ wishlistItems, removeFromWishlist, addToCart }) {
    return (
        <Container className="wishlist-page mt-5">
            <h2 className="text-white">Your Wishlist</h2>
            {wishlistItems.length === 0 ? (
                <p className="text-white">Your wishlist is empty!</p>
            ) : (
                <Row>
                    {wishlistItems.map(item => (
                        <Col md={4} key={item.id} className="wishlist-item">
                            <Card className="product-card">
                                <Card.Img variant="top" src={item.image} alt={item.category} className="card-img" />
                                <Card.Body className="text-center">
                                    <h6 className="text-muted">{item.category}</h6>
                                    <h5>{item.name}</h5>
                                    <h6 className="text-white">{item.price}</h6>
                                    <div className="product-actions">
                                        <Link
                                            to={`/product/${item.id}`} // Link to the product details page
                                            className="btn btn-outline-secondary me-2"
                                        >
                                            <i className="bi bi-eye"></i> View Details
                                        </Link>
                                        <Button variant="primary" onClick={() => addToCart(item)}>
                                            <i className="bi bi-cart3"></i> Add to Cart
                                        </Button>
                                        <Button variant="danger" onClick={() => removeFromWishlist(item.id)}>
                                            <i className="bi bi-trash"></i> Remove
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}

export default WishlistPage;
