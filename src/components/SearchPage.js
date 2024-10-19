import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json'; // Your products JSON file
import './SearchPage.css'; // Ensure you have a corresponding CSS file for styles

const SearchPage = () => {
    const [query, setQuery] = useState(''); // State for the search query
    const [results, setResults] = useState([]); // State for search results
    const [loading, setLoading] = useState(false); // State for loading status

    // Function to handle search logic
    const handleSearch = () => {
        if (!query) {
            setResults([]); // Clear results if the query is empty
            return;
        }

        setLoading(true);
        console.log("Searching for:", query); // Log the search query

        // Filter products based on the query
        const filteredResults = productsData.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );

        console.log("Filtered Results:", filteredResults); // Log the filtered results
        setResults(filteredResults);
        setLoading(false);
    };

    return (
        <div className="search-page">
            <h2>Search for Products</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter product name..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query state on input change
                    className="form-control" // Add your CSS class for styling
                />
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>

            {/* Loading message */}
            {loading && <div className="loading-message">Loading results...</div>}

            {/* No results found message */}
            {results.length === 0 && !loading && query && (
                <div className="no-results-message">No results found for "{query}"</div>
            )}

            {/* Display search results */}
            <div className="results-container">
                {results.map(product => (
                    <div className="result-item" key={product.id}>
                        <Link to={`/product/${product.id}`} className="result-link">
                            <img src={product.image} alt={product.name} className="result-image" />
                            <h3 className="result-name">{product.name}</h3>
                            <p className="result-price">{product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
