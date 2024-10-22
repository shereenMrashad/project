import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json';
import '../index.css';

function Categories({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const uniqueCategories = [...new Set(productsData.products.map(product => product.category))];
        setCategories(uniqueCategories);
    }, []);

    return (
        <section className="categories">
            <h2>Shop by Category</h2>
            <div className="category-grid">
                {categories.map((category, index) => (
                    <div
                        className="category-item"
                        key={index}
                        onClick={() => onCategorySelect(category)} // Call onCategorySelect on click
                    >
                        <img src={`/images/${category.toLowerCase()}.jpg`} alt={category} />
                        <div className="category-overlay">
                            <h3>{category}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Categories;
