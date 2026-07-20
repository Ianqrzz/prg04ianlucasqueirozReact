import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import '../../styles/Pages.css';

/**
 * Cart - Página de carrinho de compras
 */
export default function Cart() {
  const navigate = useNavigate();
  const { items: cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(5.99);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotals();
  }, [cart]);

  // Garantir que cart é um array
  const cartItems = cart || [];

  const calculateTotals = () => {
    const subtotalAmount = (cart || []).reduce((sum, item) => sum + (item.preco * (item.quantidade || item.quantity || 0)), 0);
    const taxAmount = subtotalAmount * 0.23; // 23% IVA
    const totalAmount = subtotalAmount + taxAmount + shipping;

    setSubtotal(subtotalAmount);
    setTax(taxAmount);
    setTotal(totalAmount);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Por favor, faça login para continuar com a compra');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Seu Carrinho está Vazio</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          Adicione alguns produtos para começar a comprar!
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/produtos')}
        >
          Continuar Comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 style={{ marginBottom: '32px' }}>Carrinho de Compras</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          {/* Itens do Carrinho */}
          <div className="cart-items">
            <Card>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Produto</th>
                    <th style={{ padding: '16px', textAlign: 'center' }}>Preço</th>
                    <th style={{ padding: '16px', textAlign: 'center' }}>Quantidade</th>
                    <th style={{ padding: '16px', textAlign: 'right' }}>Subtotal</th>
                    <th style={{ padding: '16px', textAlign: 'center' }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <img
                            src={item.imagemUrl || 'https://via.placeholder.com/60x60?text=Produto'}
                            alt={item.nome}
                            style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <div>
                            <strong>{item.nome}</strong>
                            <p style={{ fontSize: '12px', color: '#666', margin: '4px 0 0 0' }}>
                              {item.categoria?.nome}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        R$ {item.preco?.toFixed(2)}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantidade || item.quantity || 1}
                          onChange={(e) =>
                            updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                          }
                          style={{
                            width: '60px',
                            padding: '6px',
                            textAlign: 'center',
                            border: '1px solid #dee2e6',
                            borderRadius: '4px'
                          }}
                        />
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: 600 }}>
                        R$ {(item.preco * (item.quantidade || item.quantity || 1)).toFixed(2)}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outline"
                  onClick={() => navigate('/produtos')}
                >
                  Continuar Comprando
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCart}
                >
                  Limpar Carrinho
                </Button>
              </div>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="cart-summary">
            <Card>
              <h3 style={{ marginBottom: '24px' }}>Resumo do Pedido</h3>

              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #dee2e6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>IVA (23%):</span>
                  <span>R$ {tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Envio:</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '18px', fontWeight: 600 }}>
                <span>Total:</span>
                <span style={{ color: '#007bff' }}>R$ {total.toFixed(2)}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleCheckout}
              >
                Ir para Checkout
              </Button>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                style={{ marginTop: '12px' }}
                onClick={() => navigate('/produtos')}
              >
                Continuar Comprando
              </Button>

              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '14px' }}>
                <p style={{ margin: '0 0 8px 0' }}>✓ Compra 100% segura</p>
                <p style={{ margin: '0 0 8px 0' }}>✓ Devolução em 30 dias</p>
                <p style={{ margin: '0' }}>✓ Suporte 24/7</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}