import React from 'react';
import '../index.css';
import heroImage from './hero-image.jpg';

function Hero() {
    return (
        <section
            className="hero"
            style={{
                backgroundImage: `url(${heroImage})`, // Set the background image
                backgroundSize: 'cover', // Cover the entire section
                backgroundPosition: 'center', // Center the image
                height: '100vh', // Full viewport height
                display: 'flex', // Use flexbox for centering
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
                color: 'white', // Text color
                textAlign: 'center', // Center text
                position: 'relative', // Positioning context for any child elements
            }}
        >
            <div className="hero-text">
                <h1>Discover Luxury Furniture</h1>
                <p>Transform your living space with our exclusive collections.</p>
                <a href="#products" className="shop-btn">Shop Now</a>
            </div>
        </section>
    );
}

export default Hero;
