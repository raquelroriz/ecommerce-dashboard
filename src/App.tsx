import {useState} from "react";
import {Route, Routes} from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import type {Category} from "./types/category";

import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CheckoutPage from "./pages/Checkout";
import OrderSuccessPage from "./pages/OrderSuccess";
import FavoritesPage from "./pages/FavoritesPage";
import Favorite from "./context/FavoriteContext";
import {CartProvider} from "./context/CartContext";
import {AuthProvider, RequireAuth} from "./context/AuthContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <AuthProvider>
      <CartProvider>
        <Favorite>
          <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

            <Header
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <main className="flex-1">
              <Routes>

                <Route
                  path="/"
                  element={
                    <Home
                      selectedCategory={selectedCategory}
                      searchQuery={searchQuery}
                    />
                  }
                />

                <Route
                  path="/favorites"
                  element={
                    <FavoritesPage
                      selectedCategory={selectedCategory}
                      searchQuery={searchQuery}
                      onCategoryChange={setSelectedCategory}
                      onSearchChange={setSearchQuery}
                    />
                  }
                />

                <Route path="/cart" element={<ShoppingCart/>}/>

                <Route
                  path="/checkout"
                  element={
                    <RequireAuth>
                      <CheckoutPage/>
                    </RequireAuth>
                  }
                />

                <Route path="/order-success" element={<OrderSuccessPage/>}/>

                <Route path="/product/:id" element={<ProductDetails/>}/>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
              </Routes>
            </main>

            <Footer/>
          </div>
        </Favorite>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
