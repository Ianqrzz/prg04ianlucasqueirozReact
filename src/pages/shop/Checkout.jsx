import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Loading } from '../../components/ui/Loading';
import '../../styles/Pages.css';

/**
 * Checkout - Página de finalização de compra
 */
export default function Checkout() {
  const navigate = useNavigate();
  const { items: cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { post } = useApi();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: user?.nome || '',
    email: user?.email || '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    metodoPagamento: 'cartao'
  });

const [subtotal, setSubtotal] = useState(0);
const [tax, setTax] = useState(0);
const [total, setTotal] = useState(0);
const shipping = 5.99;


  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!cart || cart.length === 0) {
      navigate('/carrinho');
      return;
    }

    calculateTotal();
  }, [cart, isAuthenticated]);

  const calculateTotal = () => {
  const subtotalAmount = (cart || []).reduce((sum, item) => sum + (item.preco * (item.quantidade || item.quantity || 0)), 0);
  const taxAmount = subtotalAmount * 0.23; // 23% IVA
  
  setSubtotal(subtotalAmount);
  setTax(taxAmount);
  setTotal(subtotalAmount + taxAmount + shipping);
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar endereço
      const enderecoResponse = await post('/endereco/save', {
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        usuario_id: user.id
      });

      // Criar pedido
      const pedidoData = {
      usuario_id: user.id,
      endereco_id: enderecoResponse.id || enderecoResponse?.data?.id,
      itensPedidos: cart.map(item => ({
        produtoId: item.id, 
        quantidade: item.quantidade || item.quantity
      }))
      };

      const pedidoResponse = await post('/pedido/save', pedidoData);

      // Sucesso
      alert('Pedido criado com sucesso!');
      clearCart();
      navigate(`/pedidos/${pedidoResponse.id}`);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      console.error('Detalhes do erro do Spring Boot:', error.response?.data);
      alert('Erro ao criar pedido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Carrinho Vazio</h2>
        <Button onClick={() => navigate('/produtos')}>Voltar aos Produtos</Button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 style={{ marginBottom: '32px' }}>Finalizar Compra</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            {/* Dados Pessoais */}
            <Card style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Dados Pessoais</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input
                  label="Nome Completo"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
            </Card>

            {/* Endereço */}
            <Card style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Endereço de Entrega</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input
                  label="Rua"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Número"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Estado/Região"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="CEP"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  required
                />
              </div>
            </Card>

            {/* Método de Pagamento */}
            <Card style={{ marginBottom: '24px' }}>
              <h3 style={{ marginBottom: '20px' }}>Método de Pagamento</h3>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="radio"
                    name="metodoPagamento"
                    value="cartao"
                    checked={formData.metodoPagamento === 'cartao'}
                    onChange={handleChange}
                  />
                  Cartão de Crédito
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="radio"
                    name="metodoPagamento"
                    value="paypal"
                    checked={formData.metodoPagamento === 'paypal'}
                    onChange={handleChange}
                  />
                  PayPal
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="radio"
                    name="metodoPagamento"
                    value="transferencia"
                    checked={formData.metodoPagamento === 'transferencia'}
                    onChange={handleChange}
                  />
                  Transferência Bancária
                </label>
              </div>
            </Card>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button
                variant="outline"
                onClick={() => navigate('/carrinho')}
                disabled={loading}
              >
                Voltar
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Processando...' : 'Confirmar Pedido'}
              </Button>
            </div>
          </form>

          {/* Resumo */}
          <div className="checkout-summary">
            <Card>
              <h3 style={{ marginBottom: '24px' }}>Resumo do Pedido</h3>

              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '24px' }}>
                {(cart || []).map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div>
                      <p style={{ margin: '0', fontWeight: 500 }}>{item.nome}</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#666' }}>x{item.quantidade || item.quantity || 1}</p>
                    </div>
                    <span>€{(item.preco * (item.quantidade || item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ paddingTop: '16px', borderTop: '2px solid #dee2e6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Subtotal:</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>IVA:</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span>Envio:</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 600, color: '#007bff' }}>
                  <span>Total:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
