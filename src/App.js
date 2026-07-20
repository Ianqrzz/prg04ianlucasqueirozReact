import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import NavbarComponent from './components/common/Navbar'
import Home from './pages/Home'
import Products from './pages/shop/Products'
import ProductDetail from './pages/shop/ProductDetail'
import Cart from './pages/shop/Cart'
import Checkout from './pages/shop/Checkout'
import Orders from './pages/account/Orders'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Products />} />
            <Route path="/produtos/:id" element={<ProductDetail />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
