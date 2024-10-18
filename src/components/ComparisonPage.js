import React from 'react';
import './ComparisonPage.css'; // You can style this page as you like
import ProductCard from './ProductCard'; // Assuming you have ProductCard component

const ComparisonPage = ({ comparisonList, onRemoveFromComparison }) => {
    return (
        <div className="comparison-page">
            <h2>Comparison List</h2>
            {comparisonList.length === 0 ? (
                <p>No products to compare. Please add some products.</p>
            ) : (
                <div className="comparison-grid">
                    {comparisonList.map(product => (
                        <div className="comparison-item" key={product.id}>
                            <ProductCard
                                product={product}
                                onAddToCart={() => { /* Add to cart logic */ }}
                                onAddToWishlist={() => { /* Add to wishlist logic */ }}
                            />
                            <button onClick={() => onRemoveFromComparison(product.id)}>Remove from Comparison</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComparisonPage;
