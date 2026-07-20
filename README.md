# 🛍️ Diversão E-commerce - Frontend

> Frontend React para plataforma de e-commerce de brinquedos (máquinas de pegar ursinho de pelúcia)

## 📋 Sobre o Projeto

**Diversão** é um e-commerce académico desenvolvido como projeto de conclusão de curso. A plataforma permite que utilizadores naveguem por um catálogo de produtos, adicionem itens ao carrinho e realizem compras.

### 🎯 Funcionalidades Principais

- ✅ **Autenticação** - Login e cadastro de utilizadores

- ✅ **Catálogo de Produtos** - Listagem com filtros por categoria

- ✅ **Carrinho de Compras** - Adicionar, remover e atualizar quantidades

- ✅ **Checkout** - Processo de compra simplificado

- ✅ **Pedidos** - Visualizar histórico de compras

- ✅ **Responsivo** - Funciona em desktop, tablet e mobile

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
| --- | --- | --- |
| **React** | 19.2.6 | Biblioteca JavaScript para UI |
| **React Router DOM** | 7.15.1 | Roteamento de páginas |
| **Axios** | 1.18.1 | Cliente HTTP para requisições |
| **Bootstrap** | 5.3.8 | Framework CSS |
| **React Bootstrap** | 2.10.10 | Componentes Bootstrap em React |

## 📁 Estrutura de Pastas

```
src/
├── components/              # Componentes reutilizáveis
│   ├── HeroBanner/         # Banner principal
│   ├── LoginForm/          # Formulário de login
│   ├── UserForm/           # Formulário de cadastro
│   ├── UserTable/          # Tabela de utilizadores
│   ├── navbar/             # Barra de navegação
│   └── ui/                 # Componentes UI (Button, Card, etc)
│
├── pages/                   # Páginas da aplicação
│   ├── about/              # Página sobre
│   ├── admin/              # Painel administrativo
│   ├── dashboard/          # Dashboard
│   ├── home/               # Página principal
│   ├── login/              # Página de login
│   ├── cart/               # Página do carrinho
│   └── userRegister/       # Página de cadastro
│
├── services/               # Serviços de API
│   └── api.js              # Configuração Axios
│
├── styles/                 # Estilos globais
│   └── global.css          # CSS global
│
├── assets/                 # Imagens e recursos estáticos
│
├── App.js                  # Componente principal
├── index.js                # Ponto de entrada
└── index.css               # Estilos da página
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 16+ instalado

- npm ou yarn

- Backend rodando em `https://prg04ianlucasqueiroz-backend-production.up.railway.app`

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/Ianqrzz/prg04ianlucasqueirozReact.git
cd prg04ianlucasqueirozReact

# 2. Instalar dependências
npm install

# 3. Iniciar o servidor de desenvolvimento
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

Gera uma pasta `build/` otimizada para produção.

## 📡 Integração com Backend

O frontend se comunica com o backend através da API REST em:

```
https://prg04ianlucasqueiroz-backend-production.up.railway.app
```

### Principais Endpoints Utilizados

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/usuario/save` | Criar novo utilizador |
| POST | `/usuario/login` | Autenticar utilizador |
| GET | `/usuario/findall` | Listar utilizadores |
| GET | `/produto/findall` | Listar produtos |
| GET | `/categoria/findall` | Listar categorias |

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional ):

```
REACT_APP_API_URL=https://prg04ianlucasqueiroz-backend-production.up.railway.app
```

## 📝 Páginas Disponíveis

### 🏠 Home (`/` )

Página principal com hero banner e produtos em destaque.

### 🛒 Produtos (`/produtos`)

Listagem completa de produtos com:

- Filtro por categoria

- Busca por termo

- Paginação

- Adicionar ao carrinho

### 🛍️ Carrinho (`/carrinho`)

Visualizar itens do carrinho:

- Alterar quantidade

- Remover itens

- Ver total

- Ir para checkout

### 🔐 Login (`/login`)

Autenticar utilizador com email e senha.

### 📝 Cadastro (`/cadastro`)

Criar nova conta com:

- Nome completo

- Email

- Senha

- Validações

### 📦 Pedidos (`/pedidos`)

Visualizar histórico de compras (se autenticado).

## 🎨 Design System

### Cores Principais

- **Primária**: `#007bff` (Azul)

- **Secundária**: `#28a745` (Verde)

- **Fundo**: `#f8f9fa` (Cinza claro)

- **Texto**: `#333333` (Cinza escuro)

### Tipografia

- **Fonte**: Arial, sans-serif

- **Tamanho base**: 16px

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com cobertura
npm test -- --coverage
```

## 🐛 Troubleshooting

### Erro: "Cannot find module 'axios'"

```bash
npm install axios
```

### Erro: "CORS policy"

Certifique-se de que o backend tem CORS habilitado.

### Erro: "Backend não responde"

Verifique se o backend está rodando em:`https://prg04ianlucasqueiroz-backend-production.up.railway.app`

## 📦 Deploy

### Vercel (Recomendado )

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer deploy
vercel
```

### Netlify

```bash
# 1. Instalar Netlify CLI
npm i -g netlify-cli

# 2. Fazer deploy
netlify deploy --prod --dir=build
```

## 👨‍💻 Desenvolvedor

**Ian Queiroz**

- GitHub: [@Ianqrzz](https://github.com/Ianqrzz)

- Email: [ian.queiroz@example.com](mailto:ian.queiroz@example.com)

## 📄 Licença

Este projeto é académico e está disponível sob a licença MIT.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor:

1. Faça um Fork do projeto

1. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)

1. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)

1. Push para a branch (`git push origin feature/AmazingFeature`)

1. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.

---

**Desenvolvido com ❤️ como projeto académico**