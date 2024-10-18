import React from 'react';
import './ComparisonTable.css';

const ComparisonTable = ({ comparisonList, onRemoveFromCompare }) => {
    return (
        <div className="comparison-table-container">
            <h2>Comparison Table</h2>
            <table className="comparison-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Dimensions</th>
                        <th>Material</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {comparisonList.length > 0 ? (
                        comparisonList.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.specifications.dimensions}</td>
                                <td>{product.specifications.material}</td>
                                <td>{product.specifications.color}</td>
                                <td>
                                    <button
                                        className="remove-from-compare-btn"
                                        onClick={() => onRemoveFromCompare(product.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No products to compare</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ComparisonTable;
