import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Favorite, {useFavorites} from "./context/FavoriteContext.tsx";
import Header, {type Category} from "./components/Header.tsx";
import {CartProvider} from "./context/CartContext.tsx";
import ShoppingCart from "./pages/ShoppingCart.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
import { AuthProvider, RequireAuth } from "./context/AuthContext.tsx";
import CheckoutPage from "./pages/Checkout.tsx";
import OrderSuccessPage from "./pages/OrderSuccess.tsx";

function FavoritesRoute({selectedCategory, searchQuery, onCategoryChange, onSearchChange}: {
  selectedCategory: Category;
  searchQuery: string;
  onCategoryChange: (c: Category) => void;
  onSearchChange: (q: string) => void;
}) {
  const {setOnlyFavorites} = useFavorites();
  useEffect(() => {
    // Ao abrir a rota de favoritos, garanta filtro ativo e filtros resetados
    setOnlyFavorites(true);
    onCategoryChange('all');
    onSearchChange('');
  }, [setOnlyFavorites, onCategoryChange, onSearchChange]);
  return <Home selectedCategory={selectedCategory} searchQuery={searchQuery}/>;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <AuthProvider>
      <CartProvider>
        <Favorite>
          <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">

            {/* Header */}
            <Header
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home selectedCategory={selectedCategory} searchQuery={searchQuery}/>}/>
                <Route path="/favorites" element={
                  <FavoritesRoute
                    selectedCategory={selectedCategory}
                    searchQuery={searchQuery}
                    onCategoryChange={setSelectedCategory}
                    onSearchChange={setSearchQuery}
                  />
                }/>
                <Route path="/cart" element={<ShoppingCart/>}/>
                <Route path="/checkout" element={<RequireAuth><CheckoutPage/></RequireAuth>} />
                <Route path="/order-success" element={<OrderSuccessPage/>} />
                <Route path="/product/:id" element={<ProductDetails/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
              </Routes>
            </main>

            {/* Importando o rodapé simples */}
            <Footer/>

          </div>
        </Favorite>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
