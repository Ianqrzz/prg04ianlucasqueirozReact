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
          <span className="eyebrow">🎪 074 Diversão</span>
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
          <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
            {/* Luzes da marquise */}
            <circle cx="60" cy="30" r="7" fill="#ffc93c" />
            <circle cx="110" cy="18" r="7" fill="#ff3e7f" />
            <circle cx="160" cy="12" r="7" fill="#ffc93c" />
            <circle cx="210" cy="18" r="7" fill="#ff3e7f" />
            <circle cx="260" cy="30" r="7" fill="#ffc93c" />

            {/* Corpo da máquina */}
            <rect x="30" y="40" width="260" height="240" rx="24" fill="#7c5cff" />
            {/* Janela de vidro */}
            <rect x="55" y="70" width="210" height="150" rx="14" fill="#fff9f0" />

            {/* Pelúcia dentro da máquina */}
            <circle cx="150" cy="175" r="34" fill="#ffc93c" />
            <circle cx="130" cy="150" r="12" fill="#ffc93c" />
            <circle cx="170" cy="150" r="12" fill="#ffc93c" />
            <circle cx="140" cy="170" r="4" fill="#241b36" />
            <circle cx="162" cy="170" r="4" fill="#241b36" />
            <path d="M140 188 Q150 196 160 188" stroke="#241b36" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Garra */}
            <line x1="150" y1="70" x2="150" y2="118" stroke="#241b36" strokeWidth="4" />
            <path d="M130 118 L150 138 L170 118 L162 110 L150 122 L138 110 Z" fill="#ff3e7f" />

            {/* Base / joystick */}
            <rect x="30" y="280" width="260" height="20" rx="6" fill="#1c1233" />
            <circle cx="80" cy="250" r="10" fill="#ff3e7f" />
            <rect x="230" y="240" width="16" height="30" rx="4" fill="#241b36" />
            <circle cx="238" cy="238" r="10" fill="#14b8a6" />
          </svg>
        </div>
      </section>

      {/* Divisor estilo ticket - transição hero -> destaques */}
      <div className="ticket-edge hero-ticket-edge" aria-hidden="true"></div>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Produtos em Destaque</h2>
          <p className="section-subtitle">Escolha sua pelúcia favorita e boa sorte na garra!</p>
          
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
                    {product.imagemUrl || product.imagem_url ? (
                      <img
                        src={product.imagemUrl || product.imagem_url}
                        alt={product.nome}
                      />
                    ) : (
                      <span style={{ fontSize: '48px' }} role="img" aria-label="Produto sem imagem">🧸</span>
                    )}
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