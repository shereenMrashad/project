import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import CustomNavbar from './components/CustomNavbar';
import SearchPage from './components/SearchPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ProductList from './components/ProductList'; // Import your ProductList component
import './components/CustomStyles.css';
import productsData from './data/products.json';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log('Product added to cart:', product);
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
    console.log('Product added to wishlist:', product);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  return (
    <div className="App dark">
      <Router>
        <CustomNavbar cartCount={cart.length} wishlistCount={wishlist.length} />
        <Routes>
          <Route path="/search" element={<SearchPage products={productsData.products} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} removeFromCart={handleRemoveFromCart} />} />
          <Route
            path="/wishlist"
            element={
              <WishlistPage
                wishlistItems={wishlist}
                removeFromWishlist={handleRemoveFromWishlist}
                addToCart={handleAddToCart} // Pass addToCart function here
              />
            }
          />
          <Route path="/products" element={<ProductList />} /> {/* Add this line for ProductList */}
        </Routes>
        <Hero />
        <Categories onCategorySelect={handleCategorySelect} />
        <FeaturedProducts selectedCategory={selectedCategory} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />
      </Router>
    </div>
  );
}

export default App;
