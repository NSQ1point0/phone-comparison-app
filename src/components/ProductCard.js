import React from 'react';
import { MdAdd, MdCheck } from 'react-icons/md';

const ProductCard = ({ product, isSelected, onAddToCompare, disabled }) => {
  return (
    <div className={`product-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}>
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-overlay">
          <div className="brand-badge">{product.brand}</div>
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">${product.price.toLocaleString()}</p>
        <div className="specs-grid">
          <div className="spec-item">
            <span className="spec-label">Screen</span>
            <span className="spec-value">{product.screenSize}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Battery</span>
            <span className="spec-value">{product.battery}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Storage</span>
            <span className="spec-value">{product.storage}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Camera</span>
            <span className="spec-value">{product.camera}</span>
          </div>
        </div>
        <button
          onClick={() => onAddToCompare(product)}
          disabled={disabled || isSelected}
          className={`add-to-compare ${isSelected ? 'selected' : ''}`}
        >
          {isSelected ? (
            <>
              <MdCheck /> Added to Compare
            </>
          ) : (
            <>
              <MdAdd /> Add to Compare
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
