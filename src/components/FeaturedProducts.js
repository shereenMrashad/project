import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import ProductCard from './ProductCard';
import '../index.css';
import './FeaturedProducts.css'; // Ensure you have this CSS file for styles

function FeaturedProducts({ selectedCategory, onAddToCart, onAddToWishlist }) {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const filteredProducts = selectedCategory
            ? productsData.products.filter(product => product.category === selectedCategory)
            : productsData.products.slice(0, 6); // Default to the first 6 products

        setFeaturedProducts(filteredProducts);
        setLoading(false);
    }, [selectedCategory]);

    return (
        <section id="products" className="featured-products">
            <h2>Featured Products</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <div className="product-grid">
                    {featuredProducts.map((product) => (
                        <div className="product-item" key={product.id}>
                            <ProductCard
                                product={product}
                                onAddToCart={onAddToCart}
                                onAddToWishlist={onAddToWishlist}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default FeaturedProducts;
