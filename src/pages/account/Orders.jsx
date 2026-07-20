import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useApi } from '../../hooks/useApi';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Loading } from '../../components/ui/Loading';
import '../../styles/Pages.css';

/**
 * Orders - Página de histórico de pedidos do utilizador
 */
export default function Orders() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { get, put } = useApi();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated, user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Buscar pedidos do utilizador
      const data = await get(`/pedido/usuario/${user?.id}`);
      setOrders(data.content || data || []);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    const confirmar = window.confirm('Tem certeza que deseja cancelar este pedido? Essa ação não pode ser desfeita.');
    if (!confirmar) return;

    try {
      setCancellingId(orderId);
      const pedidoAtualizado = await put(`/pedido/cancelar/${orderId}`);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: pedidoAtualizado.status } : order
        )
      );
    } catch (error) {
      console.error('Erro ao cancelar pedido:', error);
      const mensagem = error.response?.data?.message || 'Não foi possível cancelar o pedido. Tente novamente.';
      alert(mensagem);
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDENTE':
        return '#ffc107';
      case 'PAGO':
        return '#17a2b8';
      case 'ENVIADO':
        return '#28a745';
      case 'ENTREGUE':
        return '#20c997';
      case 'CONCLUIDO':
        return '#20c997';
      case 'CANCELADO':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDENTE':
        return '⏳ Pendente';
      case 'PAGO':
        return '✓ Pago';
      case 'ENVIADO':
        return '📦 Enviado';
      case 'ENTREGUE':
        return '✓ Entregue';
      case 'CONCLUIDO':
        return '✓ Concluído';
      case 'CANCELADO':
        return '✕ Cancelado';
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Acesso Negado</h2>
        <p>Por favor, faça login para ver seus pedidos</p>
        <Button onClick={() => navigate('/login')}>Ir para Login</Button>
      </div>
    );
  }

  if (loading) {
    return <Loading message="Carregando seus pedidos..." />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Você não tem pedidos ainda</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          Comece a comprar e seus pedidos aparecerão aqui!
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/produtos')}
        >
          Ir para Produtos
        </Button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1 style={{ marginBottom: '32px' }}>Meus Pedidos</h1>

        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map((order) => (
            <Card key={order.id} style={{ cursor: 'pointer' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '20px',
                  alignItems: 'center',
                  padding: '20px',
                }}
              >
                {/* Informações do Pedido */}
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Número do Pedido</p>
                      <p style={{ margin: '0', fontWeight: 600, fontSize: '18px' }}>#{order.id}</p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Data</p>
                      <p style={{ margin: '0', fontWeight: 600 }}>
                        {order.dataHoraCriacao
                          ? new Date(order.dataHoraCriacao).toLocaleDateString('pt-BR')
                          : '—'}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Total</p>
                      <p style={{ margin: '0', fontWeight: 600, fontSize: '18px', color: '#007bff' }}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.valorTotal || 0)}
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Status</p>
                      <p
                        style={{
                          margin: '0',
                          fontWeight: 600,
                          color: getStatusColor(order.status),
                        }}
                      >
                        {getStatusText(order.status)}
                      </p>
                    </div>
                  </div>

                  {/* Endereço */}
                  <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '14px' }}>
                    <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Endereço de Entrega</p>
                    {order.endereco ? (
                      <>
                        <p style={{ margin: '0' }}>
                          {order.endereco.rua}, {order.endereco.numero}
                          {order.endereco.bairro && ` - ${order.endereco.bairro}`}
                        </p>
                        <p style={{ margin: '4px 0 0 0' }}>
                          {order.endereco.cidade}, {order.endereco.estado} {order.endereco.cep}
                        </p>
                      </>
                    ) : (
                      <p style={{ margin: '0', color: '#999' }}>Endereço não informado</p>
                    )}
                  </div>
                </div>

                {/* Botão Expandir */}
                <Button
                  variant="outline"
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                >
                  {expandedOrder === order.id ? '▲ Ocultar' : '▼ Detalhes'}
                </Button>
              </div>

              {/* Itens do Pedido (Expandido) */}
              {expandedOrder === order.id && (
                <div style={{ borderTop: '1px solid #dee2e6', padding: '20px' }}>
                  <h4 style={{ marginBottom: '16px' }}>Itens do Pedido</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Produto</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Preço</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Quantidade</th>
                        <th style={{ padding: '12px', textAlign: 'right' }}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(order.itensPedido || []).map((item, index) => {
                        const formatCurrency = (value) =>
                          new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

                        return (
                          <tr key={item.id ?? index} style={{ borderBottom: '1px solid #dee2e6' }}>
                            <td style={{ padding: '12px' }}>
                              {item.produto?.nome || 'Produto'}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              {formatCurrency(item.valorUnitario)}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              {item.quantidade}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>
                              {formatCurrency((item.valorUnitario || 0) * (item.quantidade || 0))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Ações */}
                  <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                    <Button variant="secondary">
                      📥 Baixar Recibo
                    </Button>
                    <Button variant="outline">
                      🔄 Rastrear Pedido
                    </Button>
                    {order.status !== 'ENTREGUE' && order.status !== 'CANCELADO' && (
                      <Button
                        variant="outline"
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingId === order.id}
                      >
                        {cancellingId === order.id ? 'Cancelando...' : '✕ Cancelar Pedido'}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '40px', textAlign: 'center', padding: '40px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Pronto para mais compras?</h3>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/produtos')}
            style={{ marginTop: '16px' }}
          >
            Continuar Comprando
          </Button>
        </div>
      </div>
    </div>
  );
}