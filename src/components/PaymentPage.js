import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomStyles.css';

function PaymentPage() {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState(''); // State to hold the confirmation message

    // Handles the selected payment method
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    // Handles form submission and displays a confirmation message on the page
    const handleSubmit = (event) => {
        event.preventDefault();
        setConfirmationMessage(`Payment method selected: ${paymentMethod}`); // Sets the confirmation message
    };

    return (
        <div className="container mt-5 payment-page-container">
            <h2>Choose Your Payment Method</h2>
            <form onSubmit={handleSubmit}>
                {/* Visa payment option */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="visa"
                        value="Visa"
                        onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="visa">
                        Visa
                    </label>
                </div>

                {/* Cash payment option */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="cash"
                        value="Cash"
                        onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="cash">
                        Cash
                    </label>
                </div>

                {/* Other payment option */}
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        id="other"
                        value="Other"
                        onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label" htmlFor="other">
                        Other
                    </label>
                </div>

                {/* Submit button to confirm the selected payment method */}
                <button type="submit" className="btn custom-payment-button mt-3">
                    Confirm Payment
                </button>
            </form>

            {/* Display the confirmation message if it exists */}
            {confirmationMessage && (
                <div className="mt-3 alert alert-success">
                    {confirmationMessage}
                </div>
            )}
        </div>
    );
}

export default PaymentPage;


