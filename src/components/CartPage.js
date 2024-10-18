import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './CartPage.css';
import PaymentPage from './PaymentPage'; // Import the PaymentPage component

function CartPage({ cartItems, removeFromCart }) {
    const [isPaymentVisible, setPaymentVisible] = useState(false); // State to control visibility of PaymentPage

    // Function to calculate the total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
    };

    const handleProceedToPayment = () => {
        setPaymentVisible(true); // Show the payment section
    };

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <Card>
                                <Card.Img variant="top" src={item.image} alt={item.name} />
                                <Card.Body>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.price}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">Remove</button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            )}
            {cartItems.length > 0 && (
                <div className="total-price">
                    <h4>Total Price: ${getTotalPrice()}</h4>
                    <button className="btn btn-primary" onClick={handleProceedToPayment}>
                        Proceed to Payment
                    </button>
                </div>
            )}

            {/* Show Payment Page if the user proceeds to payment */}
            {isPaymentVisible && (
                <div className="payment-section">
                    <PaymentPage />
                </div>
            )}
        </div>
    );
}

export default CartPage;
