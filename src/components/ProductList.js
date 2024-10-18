import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import productsData from '../data/products.json'; // Ensure correct path
import './ProductList.css'; // Ensure the updated CSS file is imported
import Spinner from 'react-bootstrap/Spinner'; // Bootstrap spinner for loading

function ProductList({ onAddToCart, onAddToWishlist }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle the filter section

    useEffect(() => {
        const fetchProducts = () => {
            setLoading(true);
            try {
                const data = productsData.products;
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const applyFilters = () => {
        return products.filter(product => {
            const isCategoryMatch = category ? product.category === category : true;

            const price = typeof product.price === 'string'
                ? parseFloat(product.price.replace('$', ''))
                : product.price;

            const isMinPriceMatch = minPrice ? price >= parseFloat(minPrice) : true;
            const isMaxPriceMatch = maxPrice ? price <= parseFloat(maxPrice) : true;

            return isCategoryMatch && isMinPriceMatch && isMaxPriceMatch;
        });
    };

    const filteredProducts = applyFilters();

    if (loading) return (
        <div className="loading-container text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading products...</p>
        </div>
    );
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="product-list">
            <h2>Your Products</h2>
            <Row>
                <Col md={3}>
                    <div className="filter-section">
                        <button
                            className="btn btn-toggle"
                            onClick={() => setIsFilterOpen(!isFilterOpen)} // Toggle filter visibility
                        >
                            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                        </button>

                        {isFilterOpen && (
                            <Accordion defaultActiveKey={['0']} flush>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Categories</Accordion.Header>
                                    <Accordion.Body>
                                        <h5 onClick={() => setCategory('')}>Show All</h5>
                                        <h5 onClick={() => setCategory('Mirrors')}>Mirrors</h5>
                                        <h5 onClick={() => setCategory('Chairs')}>Chairs</h5>
                                        <h5 onClick={() => setCategory('Tables')}>Tables</h5>
                                        <h5 onClick={() => setCategory('Clocks')}>Clocks</h5>
                                        <h5 onClick={() => setCategory('Pillows')}>Pillows</h5>
                                        <h5 onClick={() => setCategory('Bedroom')}>Bedroom</h5>
                                        <h5 onClick={() => setCategory('LivingRoom')}>Living Room</h5>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Price Range</Accordion.Header>
                                    <Accordion.Body>
                                        <input
                                            type="number"
                                            placeholder="Min Price"
                                            value={minPrice}
                                            onChange={e => setMinPrice(e.target.value)}
                                            className="form-control mb-2"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max Price"
                                            value={maxPrice}
                                            onChange={e => setMaxPrice(e.target.value)}
                                            className="form-control mb-2"
                                        />
                                        <button
                                            type="button"
                                            className="apply-filter-btn"
                                            onClick={applyFilters} // Apply filter on button click
                                        >
                                            Apply Filter
                                        </button>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )}
                    </div>
                </Col>

                <Col md={9}>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <Col key={product.id}>
                                    <ProductCard
                                        product={product}
                                        onAddToCart={onAddToCart}
                                        onAddToWishlist={onAddToWishlist}
                                    />
                                </Col>
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ProductList;
