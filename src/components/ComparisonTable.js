import React from 'react';
import { MdClose } from 'react-icons/md';

const ComparisonTable = ({ products, onRemove }) => {
  const attributes = [
    { key: 'name', label: 'Name', icon: '📱' },
    { key: 'brand', label: 'Brand', icon: '🏢' },
    { key: 'price', label: 'Price', icon: '💰' },
    { key: 'screenSize', label: 'Screen Size', icon: '📏' },
    { key: 'battery', label: 'Battery', icon: '🔋' },
    { key: 'storage', label: 'Storage', icon: '💾' },
    { key: 'camera', label: 'Camera', icon: '📸' },
    { key: 'processor', label: 'Processor', icon: '⚡' }
  ];

  const getValueColor = (attr, value, products) => {
    if (attr === 'price') {
      const prices = products.map(p => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      if (value === min) return 'best-value';
      if (value === max) return 'highest-value';
    }
    return '';
  };

  const productColors = ['product-1', 'product-2', 'product-3'];

  return (
    <div className="comparison-container">
      {/* Desktop View */}
      <div className="comparison-table desktop-view">
        <div className="comparison-row header-row">
          <div className="attribute-label">Feature</div>
          {products.map((product, index) => (
            <div key={product.id} className={`product-column ${productColors[index]}`}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <button
                onClick={() => onRemove(product.id)}
                className="remove-button"
                aria-label={`Remove ${product.name}`}
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
        
        {attributes.map(attr => (
          <div key={attr.key} className="comparison-row">
            <div className="attribute-label">
              <span className="attr-icon">{attr.icon}</span>
              {attr.label}
            </div>
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`product-value ${productColors[index]} ${getValueColor(attr.key, product[attr.key], products)}`}
              >
                {attr.key === 'price' ? `$${product[attr.key].toLocaleString()}` : product[attr.key]}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile View */}
      <div className="mobile-comparison">
        <div className="mobile-products-header">
          {products.map((product, index) => (
            <div key={product.id} className={`mobile-product-header ${productColors[index]}`}>
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <span className="brand">{product.brand}</span>
              </div>
              <button
                onClick={() => onRemove(product.id)}
                className="remove-button"
                aria-label={`Remove ${product.name}`}
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>

        {attributes.map(attr => (
          <div key={attr.key} className="mobile-comparison-row">
            <div className="mobile-attribute-header">
              <span className="attr-icon">{attr.icon}</span>
              <span className="attr-label">{attr.label}</span>
            </div>
            <div className="mobile-values">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`mobile-product-value ${productColors[index]} ${getValueColor(attr.key, product[attr.key], products)}`}
                >
                  <div className="value-header">
                    <img src={product.image} alt={product.name} className="mini-image" />
                    <span className="product-name">{product.name}</span>
                  </div>
                  <div className="value-content">
                    {attr.key === 'price' ? `$${product[attr.key].toLocaleString()}` : product[attr.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;
