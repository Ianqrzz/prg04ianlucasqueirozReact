import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useCart } from '../../hooks/useCart';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Loading } from '../../components/ui/Loading';
import '../../styles/Pages.css';

export default function Products() {
  const navigate = useNavigate();
  const { get } = useApi();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory]); // Removi o searchTerm daqui para não fazer requisição a cada letra digitada

  const fetchCategories = async () => {
    try {
      const data = await get('/categoria/findall?page=0&size=100');
      setCategories(data.content || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let endpoint = `/produto/findall?page=${0}&size=${1000}`;

      if (selectedCategory) {
        endpoint += `&categoriaId=${selectedCategory}`;
      }

      const data = await get(endpoint);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
  // Verifica se bate com a categoria selecionada 
  const bateCategoria = selectedCategory === null || product.categoria?.id === selectedCategory;

  //Verifica se bate com o termo de busca
  const bateTexto = product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (product.descricao && product.descricao.toLowerCase().includes(searchTerm.toLowerCase()));

  return bateCategoria && bateTexto;
});

  const handleAddToCart = (product) => {
    addToCart(product);
    // Trocamos o alert feio do navegador por algo que poderemos transformar em um Toast bonito no futuro
    console.log(`${product.nome} adicionado ao carrinho!`);
  };

  // Formatador de Moeda para Real Brasileiro
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor || 0);
  };

  return (
    <div className="products-page">
      <div className="container">
        <h1 style={{ marginBottom: '32px' }}>Catálogo de Produtos</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Sidebar de Filtros */}
          <aside className="filters-sidebar">
            <h3 style={{ marginBottom: '16px' }}>Filtros</h3>

            {/* Busca */}
            <div className="filter-group" style={{ marginBottom: '24px' }}>
              <Input
                label="Buscar nesta página"
                placeholder="Nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categorias */}
            <div className="filter-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: 600, marginBottom: '12px', display: 'block' }}>
                Categorias
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === null}
                    onChange={() => {
                      setSelectedCategory(null);
                      setCurrentPage(0);
                    }}
                  />
                  Todas
                </label>
                {categories.map((category) => (
                  <label key={category.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => {
                        setSelectedCategory(category.id);
                        setCurrentPage(0);
                      }}
                    />
                    {category.nome}
                  </label>
                ))}
              </div>
            </div>

            {/* Limpar Filtros */}
            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
                setCurrentPage(0);
              }}
            >
              Limpar Filtros
            </Button>
          </aside>

          {/* Produtos */}
          <div className="products-container">
            {loading ? (
              <Loading message="Buscando as melhores máquinas..." />
            ) : filteredProducts.length === 0 ? (
              <div className="empty-state" style={{ textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-light)' }}>Nenhum produto encontrado.</p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                  setCurrentPage(0);
                }}>
                  Ver Todos os Produtos
                </Button>
              </div>
            ) : (
              <>
                <div className="products-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="product-image" style={{ height: '200px', borderRadius: '16px 16px 0 0' }}>
                        {product.imagem_url ? (
                          <img
                            src={product.imagem_url}
                            alt={product.nome}
                          />
                        ) : (
                          <span style={{ fontSize: '48px' }} role="img" aria-label="Produto sem imagem">🧸</span>
                        )}
                      </div>
                      <div className="product-info" style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{product.nome}</h3>
                        <p className="product-description" style={{ marginBottom: '16px', flexGrow: 1 }}>
                          {product.descricao?.length > 60 ? `${product.descricao.substring(0, 60)}...` : product.descricao}
                        </p>
                        <div className="product-footer" style={{ display: 'block', marginTop: 'auto' }}>
                          <span className="price" style={{ display: 'inline-block', marginBottom: '12px' }}>
                            {formatarMoeda(product.preco)}
                          </span>
                          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                            <Button
                              variant="secondary"
                              size="sm"
                              style={{ flex: 1 }}
                              onClick={() => navigate(`/produtos/${product.id}`)}
                            >
                              Detalhes
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              style={{ flex: 1 }}
                              onClick={() => handleAddToCart(product)}
                            >
                              Comprar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
                    <Button
                      variant="outline"
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Anterior
                    </Button>
                    <span style={{ padding: '10px 16px', alignSelf: 'center', fontWeight: 'bold' }}>
                      Página {currentPage + 1} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={currentPage >= totalPages - 1}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Próxima
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}