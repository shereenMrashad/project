import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem';
import productsData from '../data/products.json'; // Ensure correct path
import './ProductList.css'; // Ensure the updated CSS file is imported

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchProducts = () => {
            setLoading(true);
            try {
                const data = productsData.products; // Access products directly
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on selected criteria
    const filteredProducts = products.filter(product => {
        const isCategoryMatch = category ? product.category === category : true;

        const price = typeof product.price === 'string'
            ? parseFloat(product.price.replace('$', ''))
            : parseFloat(product.price);

        const isMinPriceMatch = minPrice ? price >= parseFloat(minPrice) : true;
        const isMaxPriceMatch = maxPrice ? price <= parseFloat(maxPrice) : true;

        return isCategoryMatch && isMinPriceMatch && isMaxPriceMatch;
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="product-list"> {/* Ensuring dark mode */}
            <h2>Your Products</h2>
            <Row>
                <Col md={3}>
                    <div className="filter-section">
                        <h3>Filter Products</h3>
                        <Accordion defaultActiveKey={['0']} flush>
                            {/* Category Filter */}
                            <AccordionItem eventKey='0'>
                                <h5>Categories</h5>
                                <h5 onClick={() => setCategory('')}>Show All</h5> {/* Button to reset category */}
                                <h5 onClick={() => setCategory('Mirrors')}>Mirrors</h5>
                                <h5 onClick={() => setCategory('Chairs')}>Chairs</h5>
                                <h5 onClick={() => setCategory('Tables')}>Tables</h5>
                                <h5 onClick={() => setCategory('Clocks')}>Clocks</h5>
                                <h5 onClick={() => setCategory('Pillows')}>Pillows</h5>
                                <h5 onClick={() => setCategory('Bedroom')}>Bedroom</h5>
                                <h5 onClick={() => setCategory('Living Room')}>Living Room</h5>
                            </AccordionItem>

                            {/* Price Filter */}
                            <AccordionItem eventKey='1'>
                                <h5>Price Range</h5>
                                <div className="price-range">
                                    <input
                                        type='number'
                                        placeholder='Min Price'
                                        value={minPrice}
                                        onChange={e => setMinPrice(e.target.value)}
                                        className="form-control"
                                    />
                                    <input
                                        type='number'
                                        placeholder='Max Price'
                                        value={maxPrice}
                                        onChange={e => setMaxPrice(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                                <button type="button" onClick={() => {/* apply filter logic */ }}>
                                    Apply Filter
                                </button>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </Col>

                <Col md={9}>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {filteredProducts.map(product => (
                            <Col key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default ProductList;
