import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import PaymentPage from './PaymentPage';

function CartPage({ cartItems, setCartItems, removeFromCart }) {
    const [isPaymentVisible, setPaymentVisible] = useState(false);
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '').replace(',', '')) : item.price;
            const quantity = item.quantity || 0;

            if (isNaN(price) || isNaN(quantity)) {
                console.error(`Invalid price or quantity for item: ${item.name}`);
                return total;
            }

            return total + (price * quantity);
        }, 0).toFixed(2);
    };

    const handleProceedToPayment = () => {
        setPaymentVisible(true);
        window.scrollTo(0, 0);
    };

    const incrementQuantity = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const handleViewDetails = (itemId) => {
        navigate(`/product/${itemId}`); // Navigate to the product details page
    };

    return (
        <div className="cart-page">
            <h2 className="page-title">Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty!</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <Card className="cart-card">
                                <Card.Img variant="top" src={item.image} alt={item.name} className="cart-card-img" />
                                <Card.Body className="cart-card-body">
                                    <h5 className="cart-card-title">{item.name}</h5>
                                    <p className="cart-card-price">{item.price}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => decrementQuantity(item.id)} className="btn btn-secondary">-</button>
                                        <span className="quantity-number">{item.quantity}</span>
                                        <button onClick={() => incrementQuantity(item.id)} className="btn btn-secondary">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="btn btn-danger remove-btn">
                                        <i className="bi bi-trash"></i> Remove
                                    </button>
                                    <button onClick={() => handleViewDetails(item.id)} className="btn btn-info view-details-btn">
                                        View Details
                                    </button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="total-price-section">
                    <h4 className="total-price">Total: ${getTotalPrice()}</h4>
                    <button className="btn btn-primary proceed-btn" onClick={handleProceedToPayment}>
                        Proceed to Payment
                    </button>
                </div>
            )}

            {isPaymentVisible && (
                <div className="payment-section">
                    <PaymentPage />
                </div>
            )}
        </div>
    );
}

export default CartPage;
