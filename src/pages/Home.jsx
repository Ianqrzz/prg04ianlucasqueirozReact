import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Loading } from '../components/ui/Loading';
import '../styles/Pages.css';

/**
 * Home - Página principal com hero section e produtos em destaque
 */
export default function Home() {
  const navigate = useNavigate();
  const { get } = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const data = await get('/produto/findall?page=0&size=6');
      setProducts(data.content || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Máquinas de Pegar Ursinho</h1>
          <p>Diversão garantida para toda a família</p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/produtos')}
          >
            Ver Todos os Produtos
          </Button>
        </div>
        <div className="hero-image">
          <img
            src="https://via.placeholder.com/400x300?text=Máquinas+de+Pegar"
            alt="Máquinas de pegar ursinho"
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Produtos em Destaque</h2>
          
          {loading ? (
            <Loading message="Carregando produtos..." />
          ) : products.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum produto disponível no momento</p>
              <Button onClick={() => navigate('/produtos')}>
                Voltar à Loja
              </Button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <Card key={product.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={product.imagemUrl || product.imagem_url || 'https://via.placeholder.com/200x200?text=Produto'}
                      alt={product.nome}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.nome}</h3>
                    <p className="product-description">
                      {product.descricao && product.descricao.length > 60 
                     ? `${product.descricao.substring(0, 60)}...` 
                      : product.descricao || 'Sem descrição disponível.'}
                    </p>
                    <div className="product-footer">
                      <span className="price">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.preco || 0)}
                      </span>                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/produtos/${product.id}`)}
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Entrega Rápida</h3>
              <p>Entrega em 24-48 horas</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Compra Segura</h3>
              <p>Pagamento 100% seguro</p>
            </div>
            <div className="feature">
              <div className="feature-icon">💬</div>
              <h3>Suporte 24/7</h3>
              <p>Atendimento ao cliente sempre disponível</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <h3>Devolução Fácil</h3>
              <p>Devolva em até 30 dias</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Pronto para se Divertir?</h2>
          <p>Explore nossa coleção completa de máquinas de pegar ursinho</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/produtos')}
          >
            Começar a Comprar
          </Button>
        </div>
      </section>
    </div>
  );
}
