import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import './Navbar.css';

export default function NavbarComponent() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { items = [] } = useCart(); // Pegando direto os itens do carrinho
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Soma a quantidade de todos os itens no carrinho
  const cartCount = items.reduce((sum, item) => sum + (item.quantidade || 1), 0);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-logo">🧸 074 Diversão</span>
        </Link>

        {/* Menu Toggle (Mobile) */}
        <button
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Menu */}
        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <Link to="/" onClick={closeMenu} className="navbar-link">Home</Link>
            <Link to="/produtos" onClick={closeMenu} className="navbar-link">Produtos</Link>
            <Link to="/carrinho" onClick={closeMenu} className="navbar-link">
              Carrinho
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>

          {/* Auth Links */}
          <div className="navbar-auth">
            {isAuthenticated ? (
              <>
                <span className="navbar-user">Olá, {user?.nome || 'Usuário'}</span>
                <Link to="/pedidos" onClick={closeMenu} className="navbar-link">Meus Pedidos</Link>
                <button onClick={handleLogout} className="navbar-btn logout">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="navbar-link">Login</Link>
                <button onClick={() => { navigate('/cadastro'); closeMenu(); }} className="navbar-btn">
                  Cadastro
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}