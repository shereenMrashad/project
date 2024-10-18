import React, { useState, useEffect } from 'react';
import productsData from '../data/products.json'; // Import your JSON data
import '../index.css';

function Categories() {
    const [categories, setCategories] = useState([]);

    // Extract unique categories from products JSON
    useEffect(() => {
        const uniqueCategories = [...new Set(productsData.products.map(product => product.category))];
        setCategories(uniqueCategories);
    }, []);

    const formatCategoryName = (category) => {
        return category.toLowerCase().replace(/\s+/g, '');
    };

    return (
        <section className="categories">
            <h2>Shop by Category</h2>
            <div className="category-grid">
                {categories.map((category, index) => (
                    <div className="category-item" key={index}>
                        <img
                            src={`/images/${formatCategoryName(category)}.jpg`}
                            alt={category}
                        />
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
