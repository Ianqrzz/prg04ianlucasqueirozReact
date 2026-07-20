# 📋 Implementação da Primeira Fase - Frontend Refatorado

## ✅ O que foi Implementado

### 1. **Contextos (Context API)**
- `src/context/AuthContext.jsx` - Gerencia autenticação, login, cadastro e logout
- `src/context/CartContext.jsx` - Gerencia carrinho com persistência em localStorage

### 2. **Hooks Customizados**
- `src/hooks/useAuth.js` - Hook para acessar contexto de autenticação
- `src/hooks/useCart.js` - Hook para acessar contexto de carrinho
- `src/hooks/useApi.js` - Hook para fazer requisições à API

### 3. **Componentes UI Reutilizáveis**
- `src/components/ui/Button.jsx` - Botão profissional com variantes
- `src/components/ui/Card.jsx` - Card reutilizável
- `src/components/ui/Input.jsx` - Input com validação
- `src/components/ui/Loading.jsx` - Componente de carregamento
- `src/components/ui/UIComponents.css` - Estilos dos componentes

### 4. **Páginas**
- `src/pages/Home.jsx` - Página principal com hero e produtos em destaque

### 5. **Estilos**
- `src/styles/Pages.css` - Estilos de todas as páginas

### 6. **App.js Actualizado**
- Adicionados providers de AuthContext e CartContext
- Actualizado import da página Home

---

## 🚀 Como Usar

### 1. **Instalar Dependências**
```bash
npm install
```

### 2. **Iniciar o Servidor**
```bash
npm start
```

### 3. **Acessar a Aplicação**
- Abra http://localhost:3000 no navegador

---

## 📁 Estrutura de Pastas

```
src/
├── context/
│   ├── AuthContext.jsx      ← Autenticação
│   └── CartContext.jsx      ← Carrinho
├── hooks/
│   ├── useAuth.js           ← Hook de autenticação
│   ├── useCart.js           ← Hook de carrinho
│   └── useApi.js            ← Hook de API
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Loading.jsx
│   │   └── UIComponents.css
│   ├── navbar/              ← Navbar existente
│   └── ...
├── pages/
│   ├── Home.jsx             ← Nova página Home
│   ├── cart/
│   ├── login/
│   ├── admin/
│   └── userRegister/
├── styles/
│   └── Pages.css            ← Estilos das páginas
├── App.js                   ← Actualizado com providers
└── ...
```

---

## 💡 Como Usar os Contextos

### **Usar Autenticação**
```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login('email@example.com', 'senha')}>Login</button>
      )}
    </div>
  );
}
```

### **Usar Carrinho**
```jsx
import { useCart } from './hooks/useCart';

function MyComponent() {
  const { items, total, addToCart, removeFromCart } = useCart();
  
  return (
    <div>
      <p>Total: €{total.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Adicionar</button>
    </div>
  );
}
```

### **Usar API**
```jsx
import { useApi } from './hooks/useApi';

function MyComponent() {
  const { get, post } = useApi();
  
  const fetchProducts = async () => {
    const data = await get('/produto/findall?page=0&size=12');
    console.log(data);
  };
}
```

---

## 🎨 Componentes UI Disponíveis

### **Button**
```jsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Clique Aqui
</Button>
```
Variantes: `primary`, `secondary`, `danger`, `outline`
Tamanhos: `sm`, `md`, `lg`

### **Card**
```jsx
<Card className="custom-class">
  Conteúdo do card
</Card>
```

### **Input**
```jsx
<Input
  label="Email"
  type="email"
  placeholder="seu@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={error}
  required
/>
```

### **Loading**
```jsx
<Loading message="Carregando..." />
```

---

## 🔗 API Base URL

A aplicação usa a seguinte URL base:
```
https://prg04ianlucasqueiroz-backend-production.up.railway.app
```

Você pode sobrescrever criando um arquivo `.env`:
```
REACT_APP_API_URL=http://localhost:8080
```

---

## 📝 Próximas Fases

**Fase 2** - Criar páginas:
- [ ] Produtos (com filtros por categoria)
- [ ] Detalhes do Produto
- [ ] Carrinho (completo)
- [ ] Checkout
- [ ] Pedidos
- [ ] Login/Cadastro (refatorado)

**Fase 3** - Integração e Deploy

---

## ⚠️ Notas Importantes

1. **localStorage** - O carrinho e autenticação são armazenados em localStorage
2. **CORS** - Se tiver problemas de CORS, verifique se o backend permite requisições do seu domínio
3. **Responsividade** - Todos os componentes são responsivos (mobile, tablet, desktop)
4. **Escalabilidade** - Fácil adicionar novos contextos, hooks e componentes

---

## 🆘 Troubleshooting

### Erro: "useAuth deve ser usado dentro de AuthProvider"
- Certifique-se de que o componente está dentro de `<AuthProvider>`
- Verifique se o `App.js` está correcto

### Carrinho não persiste
- Verifique se o localStorage está habilitado no navegador
- Abra DevTools → Application → Local Storage

### Produtos não carregam
- Verifique se o backend está online
- Abra DevTools → Network para ver os erros de requisição
- Verifique a URL da API

---

**Pronto para a próxima fase!** 🚀
