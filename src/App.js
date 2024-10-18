import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import CustomNavbar from './components/CustomNavbar';
import SearchPage from './components/SearchPage';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ComparisonTable from './components/ComparisonTable'; // Import ComparisonTable
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/CustomStyles.css';
import productsData from './data/products.json';
import Signup from './components/Signup';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [comparisonList, setComparisonList] = useState([]); // State for comparison

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedWishlist = localStorage.getItem('wishlist');

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
    toast.success(`${product.name} added to wishlist!`);
  };

  const handleAddToComparison = (product) => {
    if (!comparisonList.some(item => item.id === product.id)) {
      setComparisonList(prev => [...prev, product]);
      toast.success(`${product.name} added to comparison!`);
    } else {
      toast.warn(`${product.name} is already in the comparison list!`);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const handleRemoveFromComparison = (productId) => {
    setComparisonList((prevList) => prevList.filter((item) => item.id !== productId));
  };

  return (
    <div className="App dark">
      <Router>
        <CustomNavbar cartCount={cart.length} wishlistCount={wishlist.length} comparisonCount={comparisonList.length} />

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchPage products={productsData.products} />} />
          <Route path="/cart" element={<CartPage cartItems={cart} removeFromCart={handleRemoveFromCart} />} />
          <Route path="/wishlist" element={<WishlistPage wishlistItems={wishlist} removeFromWishlist={handleRemoveFromWishlist} addToCart={handleAddToCart} />} />
          <Route path="/products" element={<ProductList selectedCategory={selectedCategory} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onAddToComparison={handleAddToComparison} />} />
          <Route path="/product/:productId" element={
            <ProductDetails
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onAddToCompare={handleAddToComparison}
              comparisonList={comparisonList}
              onRemoveFromCompare={handleRemoveFromComparison}
            />
          } />
          <Route path="/" element={
            <>
              <Hero />
              <Categories onCategorySelect={handleCategorySelect} />
              <FeaturedProducts selectedCategory={selectedCategory} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} onAddToComparison={handleAddToComparison} />
            </>
          } />
        </Routes>

        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
