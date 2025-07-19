import React from 'react';
import ComparisonTable from './ComparisonTable';

const ComparisonPanel = ({ products, onRemove, onClear }) => {
  return (
    <div className="comparison-panel">
      <div className="comparison-header">
        <h2>Product Comparison</h2>
        <button onClick={onClear} className="clear-all">
          Clear All
        </button>
      </div>
      <ComparisonTable products={products} onRemove={onRemove} />
    </div>
  );
};

export default ComparisonPanel;
