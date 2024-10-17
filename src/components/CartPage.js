import React from 'react';
import Card from 'react-bootstrap/Card';
import './CartPage.css';

function CartPage({ cartItems, removeFromCart }) {
    // Function to calculate the total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);
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
                    Total Price: ${getTotalPrice()}
                </div>
            )}
        </div>
    );
}

export default CartPage;
