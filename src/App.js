import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/navbar/Navbar'       // ← ./
import Home       from './pages/home/index'
import Cart       from './pages/cart/index'
import AdminPanel from './pages/admin/index' 
import Login from './pages/login/index'
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/admin"    element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App