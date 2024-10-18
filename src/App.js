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
import PaymentPage from './components/PaymentPage'; // Ensure you have this component
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
  const [comparisonList, setComparisonList] = useState([]);

  // Custom hooks for local storage management
  const useLocalStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key);
    const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialValue);

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
  };

  // Use custom hook to manage state and local storage
  const [cartItems, setCartItems] = useLocalStorage('cart', []);
  const [wishlistItems, setWishlistItems] = useLocalStorage('wishlist', []);

  // Functionality for adding items to cart
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    toast.success(`${product.name} added to cart!`);
  };

  // Functionality for adding items to wishlist
  const handleAddToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
    toast.success(`${product.name} added to wishlist!`);
  };

  // Functionality for adding items to comparison
  const handleAddToComparison = (product) => {
    if (!comparisonList.some(item => item.id === product.id)) {
      setComparisonList((prev) => [...prev, product]);
      toast.success(`${product.name} added to comparison!`);
    } else {
      toast.warn(`${product.name} is already in the comparison list!`);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter(item => item.id !== productId));
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter(item => item.id !== productId));
  };

  // Remove item from comparison
  const handleRemoveFromComparison = (productId) => {
    setComparisonList((prev) => prev.filter(item => item.id !== productId));
  };

  return (
    <div className="App dark">
      <Router>
        <CustomNavbar
          cartCount={cartItems.length}
          wishlistCount={wishlistItems.length}
          comparisonCount={comparisonList.length}
        />

        <Routes>
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchPage products={productsData.products} />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} removeFromCart={handleRemoveFromCart} />} />
          <Route path="/wishlist" element={<WishlistPage wishlistItems={wishlistItems} removeFromWishlist={handleRemoveFromWishlist} addToCart={handleAddToCart} />} />
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
              <Categories onCategorySelect={setSelectedCategory} />
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
