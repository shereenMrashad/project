import React from 'react';
import './Footer.css'; // Make sure to create Footer.css for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>
                        We provide high-quality furniture to make your home comfortable and stylish. Our mission is to deliver beautiful furniture pieces that meet your style.
                    </p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/about">About</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: support@furniturestore.com</p>
                    <p>Phone: +123-456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 FurnitureStore | Designed by Shereen
            </div>
        </footer>
    );
};

export default Footer;
