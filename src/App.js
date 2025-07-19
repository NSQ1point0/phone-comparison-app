import React, { useState, useEffect, createContext, useContext } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import ProductGrid from './components/ProductGrid';
import ComparisonPanel from './components/ComparisonPanel';
import { phones } from './data/phones';
import './styles/App.css';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(phones);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('selectedProducts');
    const savedTheme = localStorage.getItem('theme');
    if (saved) {
      setSelectedProducts(JSON.parse(saved));
    }
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  useEffect(() => {
    const filtered = phones.filter(phone =>
      phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm]);

  const addToCompare = (product) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const clearComparison = () => {
    setSelectedProducts([]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
        <header className="header">
          <div className="header-content">
            <h1>Phone Comparison Hub</h1>
            <div className="header-controls">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search phones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
              </button>
            </div>
            {selectedProducts.length > 0 && (
              <div className="comparison-counter">
                <span className="counter-text">Comparing {selectedProducts.length} phone{selectedProducts.length > 1 ? 's' : ''}</span>
                <div className="counter-dots">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`dot ${i <= selectedProducts.length ? 'active' : ''}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="main-content">
          <ProductGrid
            products={filteredProducts}
            selectedProducts={selectedProducts}
            onAddToCompare={addToCompare}
          />
          
          {selectedProducts.length >= 2 && (
            <ComparisonPanel
              products={selectedProducts}
              onRemove={removeFromCompare}
              onClear={clearComparison}
            />
          )}
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
