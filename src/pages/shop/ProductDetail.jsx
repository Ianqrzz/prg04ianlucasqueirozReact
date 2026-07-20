import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useCart } from '../../hooks/useCart';
import { Button } from '../../components/ui/Button';
import { Loading } from '../../components/ui/Loading';
import '../../styles/Pages.css';

/**
 * ProductDetail - Página de detalhes de um produto individual
 */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get } = useApi();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      console.log("ID capturado da URL:", id); 
      const data = await get(`/produto/findById/${id}`);
      
      if (data) {
        setProduct(data);
      } else {
        navigate('/produtos');
      }
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      navigate('/produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity}x ${product.nome} adicionado ao carrinho!`);
    setQuantity(1);
  };

  if (loading) {
    return <Loading message="Carregando produto..." />;
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Produto não encontrado</h2>
        <Button onClick={() => navigate('/produtos')}>Voltar aos Produtos</Button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <Button
          variant="outline"
          onClick={() => navigate('/produtos')}
          style={{ marginBottom: '32px' }}
        >
          ← Voltar aos Produtos
        </Button>

        <div className="product-detail-container">
          {/* Imagem */}
          <div className="product-detail-image">
            {product.imagem_url ? (
              <img src={product.imagem_url} alt={product.nome} />
            ) : (
              <span style={{ fontSize: '80px' }} role="img" aria-label="Produto sem imagem">🧸</span>
            )}
          </div>

          {/* Informações */}
          <div className="product-detail-info">
            <h1>{product.nome}</h1>

            <div className="product-detail-price">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco || 0)}
            </div>

            <div className="product-detail-rating">
              <span className="stars">★★★★★</span>
              <span>(4.5 de 5 - 128 avaliações)</span>
            </div>

            <div className="product-detail-stock">
              ✓ Em estoque - Entrega em 24-48 horas
            </div>

            <p className="product-detail-description">
              {product.descricao}
            </p>

            {/* Quantidade */}
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantidade:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            {/* Ações */}
            <div className="product-detail-actions">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
              >
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
              >
                ♥ Adicionar à Lista de Desejos
              </Button>
            </div>

            {/* Informações Adicionais */}
            <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #dee2e6' }}>
              <h3 style={{ marginBottom: '16px' }}>Informações de Envio</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '8px' }}>📦 Frete: R$ 5,99</li>
                <li style={{ marginBottom: '8px' }}>🚚 Entrega em 24-48 horas</li>
                <li style={{ marginBottom: '8px' }}>↩️ Devolução gratuita em 30 dias</li>
                <li>🔒 Compra 100% segura</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="product-tabs" style={{ marginTop: '60px' }}>
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Descrição
            </button>
            <button
              className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Especificações
            </button>
            <button
              className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Avaliações
            </button>
          </div>

          {/* Descrição */}
          {activeTab === 'description' && (
            <div className="tab-content active">
              <h3>Descrição Completa</h3>
              <p>{product.descricao}</p>
              <p>
                Este é um produto de alta qualidade, perfeito para diversão em família.
                Oferecemos garantia de 1 ano e suporte técnico 24/7.
              </p>
            </div>
          )}

          {/* Especificações */}
          {activeTab === 'specifications' && (
            <div className="tab-content active">
              <h3>Especificações Técnicas</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Categoria</td>
                    <td style={{ padding: '12px' }}>{product.categoria?.nome}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Preço</td>
                    <td style={{ padding: '12px' }}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco || 0)}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Disponibilidade</td>
                    <td style={{ padding: '12px' }}>Em estoque</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Garantia</td>
                    <td style={{ padding: '12px' }}>1 ano</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Avaliações */}
          {activeTab === 'reviews' && (
            <div className="tab-content active">
              <h3>Avaliações dos Clientes</h3>
              <div style={{ marginTop: '20px' }}>
                <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>João Silva</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                  <p>Produto excelente! Chegou rápido e bem embalado. Recomendo!</p>
                </div>

                <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong>Maria Santos</strong>
                    <span className="stars">★★★★</span>
                  </div>
                  <p>Muito bom, mas o preço poderia ser um pouco mais baixo.</p>
                </div>

                <Button variant="secondary" style={{ marginTop: '16px' }}>
                  Deixar uma Avaliação
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}