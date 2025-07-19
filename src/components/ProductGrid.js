import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, selectedProducts, onAddToCompare }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProducts.some(p => p.id === product.id)}
          onAddToCompare={onAddToCompare}
          disabled={selectedProducts.length >= 3 && !selectedProducts.some(p => p.id === product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
