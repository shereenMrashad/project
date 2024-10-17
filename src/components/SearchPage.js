import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomStyles.css';

function SearchPage({ products }) {
    const [query, setQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products, query]);

    return (
        <div className="search-page container mt-5">
            <h2 className="text-white">What are you looking for?</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type your search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-4">
                {filteredProducts.length > 0 ? (
                    <ul className="list-group">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="list-group-item">
                                <h5>{product.name}</h5>
                                <p>{product.description}</p>
                                <span>{product.price}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white mt-3">No products found matching "{query}"</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
