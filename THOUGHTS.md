# Documentação Técnica - Art Explorer

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Decisões Técnicas](#decisões-técnicas)
- [Decisões de Design](#decisões-de-design)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Testes](#testes)
- [Futuras Melhorias](#futuras-melhorias)

---

## 🏗️ Arquitetura

### Domain-Driven Design (DDD)

O projeto foi estruturado seguindo os princípios de **Domain-Driven Design**, organizando o código em camadas bem definidas:

#### Camadas da Arquitetura

```
src/
├── domain/                    # Camada de Domínio
│   ├── entities/              # Entidades do domínio
│   │   ├── Artwork.ts        # Entidade de obra de arte
│   │   └── Favorite.ts       # Entidade de favorito
│   └── repositories/          # Contratos de repositório
│       ├── ArtworkRepository.ts
│       └── FavoriteRepository.ts
│
├── application/               # Camada de Aplicação
│   └── services/              # Serviços de aplicação
│       ├── ArtworkService.ts  # Lógica de negócio para obras
│       └── FavoriteService.ts # Lógica de negócio para favoritos
│
├── infrastructure/            # Camada de Infraestrutura
│   ├── http/                  # Implementações de API
│   │   └── MetMuseumApi.ts   # Cliente da API do Met Museum
│   └── storage/               # Implementações de armazenamento
│       └── LocalStorageFavoriteRepository.ts
│
├── store/                     # Gerenciamento de estado (Redux)
│   ├── slices/                # Slices do Redux Toolkit
│   │   ├── artworkSlice.ts
│   │   └── favoriteSlice.ts
│   └── index.ts              # Configuração da store
│
├── components/                # Componentes React
│   ├── ui/                    # Componentes de UI básicos
│   └── [Feature Components]   # Componentes específicos de funcionalidades
│
└── hooks/                     # React Hooks customizados
```

---

## 🤔 Decisões Técnicas

### 1. Persistência Local: `localStorage`

**Decisão:** Utilizar `localStorage`

**Justificativa:**
- **Simplicidade**: A implementação com `localStorage` é mais direta e requer menos código
- **Volume de dados**: Os favoritos do usuário tendem a ser em pequena quantidade (centenas, não milhares)
- **Performance**: Para o escopo atual, o `localStorage` oferece performance suficiente
- **Compatibilidade**: Melhor suporte cross-browser sem necessidade de polyfills
- **Integração com Redux**: O `redux-persist` oferece integração nativa com `localStorage`

### 2. Redux com Redux Toolkit

**Decisão:** Usar Redux Toolkit

**Justificativa:**
- **Boilerplate reduzido**: Redux Toolkit elimina muito código boilerplate
- **Async handling**: `createAsyncThunk` simplifica chamadas assíncronas
- **Persistência**: Integração fácil com `redux-persist`
- **DevTools**: Excelente suporte para debugging
- **Escalabilidade**: Facilita crescimento futuro do estado da aplicação

### 3. Scroll Infinito vs Paginação

**Decisão:** Scroll infinito

**Justificativa:**
- **UX moderna**: Usuários esperam scroll infinito em apps de descoberta
- **Engagement**: Mantém usuário engajado sem precisar clicar em "carregar mais"
- **Performance**: Carregamento sob demanda melhora tempo inicial de carregamento
- **API limitations**: A API do Met Museum não oferece paginação oficial

**Implementação:**
- Usando `IntersectionObserver` para detectar quando usuário chega ao fim da lista
- Carregando 15 obras por vez para balancear performance e experiência

### 4. Axios vs Fetch nativo

**Decisão:** Axios

**Justificativa:**
- **Interceptors**: Facilitam adição de headers/erros globais
- **Transform requests/responses**: Útil para padronização de dados
- **Timeout**: Suporte nativo para timeouts
- **Melhor TypeScript**: Tipagem mais robusta

### 5. Shadcn UI

**Decisão:** Usar Shadcn UI

**Justificativa:**
- **Acesso ao código**: Todos os componentes são copiados para o projeto, não são dependências
- **Customização**: Fácil ajustar estilos e comportamento
- **Tailwind CSS**: Baseado em Tailwind, mantém consistência
- **DX**: Boa experiência de desenvolvimento

### 6. Framer Motion

**Decisão:** Usar Framer Motion para animações

**Justificativa:**
- **API declarativa**: Animações mais fáceis de escrever e manter
- **Performance**: Muitas otimizações automáticas (will-change, GPU acceleration)
- **Variants**: Reutilização de animações através de variants
- **Layout animations**: Animações automáticas quando layout muda
- **Gestos**: Suporte nativo para gestos (drag, pan, etc.)

---

## 🎨 Decisões de Design

### 1. Tema Dark/Light

**Implementação:**
- Using CSS variables for theming
- Persistence no `localStorage`
- Transição suave entre temas
- Ícone intuitivo (Sol/Lua)

### 2. Sistema de Cores

**Cores:**
- Baseado em HSL para facilitar variações
- Tokens semânticos (primary, secondary, destructive, etc.)
- Suporte automático para dark mode através de variáveis CSS

### 3. Layout Responsivo

**Breakpoints:**
- Mobile: 1 coluna
- Tablet (sm): 2 colunas
- Desktop (lg): 3 colunas
- Large Desktop (xl): 4 colunas

**Navegação:**
- Header sticky para acesso rápido
- Menu mobile com animação suave
- Breadcrumbs para contexto de navegação

### 4. Feedback Visual

**Estados:**
- Loading: Spinner animado
- Empty states: Mensagens claras com ícones
- Errors: Mensagens de erro amigáveis
- Success: Feedback imediato ao favoritar

---

## 📚 Stack Tecnológica

### Core
- **React 19**: Framework UI
- **TypeScript**: Type safety
- **Vite**: Build tool e dev server

### State Management
- **Redux Toolkit**: Gerenciamento de estado
- **redux-persist**: Persistência de estado
- **react-redux**: Bindings React para Redux

### UI/UX
- **Tailwind CSS**: Estilização utility-first
- **Shadcn UI**: Componentes de UI
- **Framer Motion**: Animações
- **lucide-react**: Ícones

### HTTP
- **Axios**: Cliente HTTP

### Testing
- **Vitest**: Test runner
- **React Testing Library**: Testes de componentes
- **@testing-library/jest-dom**: Matchers customizados
- **@testing-library/user-event**: Simulação de eventos

### Linting/Formatting
- **ESLint**: Linting de código
- **TypeScript**: Type checking em tempo real

---

## 📂 Estrutura do Projeto

### Entidades (Domain Layer)

#### `Artwork`
Representa uma obra de arte do Met Museum. Inclui:
- Informações básicas (título, artista, data)
- Mídia (imagens)
- Metadados (departamento, técnica, cultura)
- Links externos

#### `Favorite`
Representa uma obra favoritada pelo usuário. Inclui:
- Referência à obra
- Timestamp de quando foi adicionado

### Serviços (Application Layer)

#### `ArtworkService`
- Busca de obras com imagens
- Obtenção de detalhes de obra
- Busca por departamento
- Busca batch de obras

#### `FavoriteService`
- Adição/remoção de favoritos
- Listagem de favoritos
- Verificação se obra é favorita
- Toggle de favorito

### Repositórios (Infrastructure Layer)

#### `MetMuseumApi` (ArtworkRepository)
Implementa comunicação com a API do Met Museum:
- `GET /search`: Busca obras
- `GET /objects/{id}`: Detalhes de obra
- `GET /departments`: Lista departamentos

#### `LocalStorageFavoriteRepository` (FavoriteRepository)
Implementa persistência de favoritos:
- Armazenamento em `localStorage`
- JSON serialization
- Recovery de erros

---

## ✨ Funcionalidades Implementadas

### ✅ Funcionalidades Obrigatórias

1. **Listagem de Obras com Imagem**
   - ✅ Busca usando API do Met Museum
   - ✅ Paginação (15 por vez)
   - ✅ Filtro `hasImages=true`

2. **Detalhes de Obra**
   - ✅ Todos os campos solicitados
   - ✅ Link para site oficial
   - ✅ Modal ou página de detalhes

3. **Favoritar Obras**
   - ✅ Botão heart
   - ✅ Persistência em `localStorage`
   - ✅ Estado visual (filled/unfilled)

4. **Listar Favoritas**
   - ✅ Seção dedicada
   - ✅ Persistência de favoritos
   - ✅ Contador de favoritos

5. **Interface Responsiva**
   - ✅ Mobile-first
   - ✅ Tailwind CSS
   - ✅ Breakpoints bem definidos

### ✅ Funcionalidades Desejáveis

1. **Barra de busca com autocomplete**
   - ✅ Input de busca
   - ✅ Histórico de busca
   - ✅ Sugestões de busca

2. **Filtro por departamento e artista**
   - ✅ Filtro por departamento
   - ✅ Busca por artista/cultura
   - ✅ Filtros visuais claros

3. **Animações com Framer Motion**
   - ✅ Animações de entrada
   - ✅ Transições entre views
   - ✅ Hover effects
   - ✅ Loading states

4. **Dark mode**
   - ✅ Toggle de tema
   - ✅ Persistência de preferência
   - ✅ Transições suaves

5. **Scroll infinito**
   - ✅ IntersectionObserver
   - ✅ Carregamento automático
   - ✅ Loading indicator

---

## 🧪 Testes

### Cobertura de Testes

#### Testes Unitários
- ✅ `MetMuseumApi` (infrastructure)
- ✅ `LocalStorageFavoriteRepository` (infrastructure)
- ✅ Redux slices (unit tests)

#### Testes de Componentes
- ✅ `ArtworkCard` component
- ✅ `SearchBar` component
- Testes com React Testing Library

#### Testes de Integração
- ✅ Fluxo completo de busca
- ✅ Fluxo completo de favoritar

### Estratégia de Testes

**Princípio:** Test-driven development onde aplicável, especialmente para lógica de negócio.

**Tooling:**
- **Vitest**: Test runner rápido
- **React Testing Library**: Foco em testes de comportamento
- **Mocking**: Axios mockado para testes de API

---

## 🚀 Futuras Melhorias

### Curto Prazo
1. **Cache de obras**: Reduzir chamadas à API
2. **Offline support**: Service workers para acesso offline
3. **Detalhes expandidos**: Modal/drawer com mais informações
4. **Busca avançada**: Múltiplos filtros simultâneos
5. **Testes E2E**: Playwright ou Cypress

### Médio Prazo
1. **Comparação de obras**: Side-by-side comparison
2. **Coleções customizadas**: Criar coleções próprias
3. **Compartilhamento**: Compartilhar obras em redes sociais
4. **Export**: Exportar lista de favoritos
5. **Busca por cor**: Buscar obras por paleta de cores

### Longo Prazo
1. **IA recommendations**: Recomendar obras baseado em favoritos
2. **Timeline**: Linha do tempo de estilos artísticos
3. **Mapa**: Visualização geográfica de obras
4. **Estatísticas**: Dashboard com estatísticas pessoais
5. **Social features**: Seguir outros colecionadores

---

## 🎓 Lições Aprendidas

### O que funcionou bem

1. **DDD estrutura**: Facilita manutenção e extensão
2. **Redux Toolkit**: Elimina muito boilerplate
3. **TypeScript**: Catch de bugs em tempo de desenvolvimento
4. **Tailwind CSS**: Desenvolvimento rápido de UI
5. **Framer Motion**: Animações fluidas com pouco código

### Desafios enfrentados

1. **API limits**: Algumas obras não têm imagens
2. **Type safety**: Alguns campos da API não são consistentes
3. **Performance**: Carregamento inicial pode ser lento
4. **Autocomplete**: Limitado sem API dedicada de autocomplete

### Soluções implementadas

1. **Filtros**: Usar `hasImages=true` para garantir imagens
2. **Type guards**: Validar dados da API antes de usar
3. **Lazy loading**: Carregar imagens sob demanda
4. **Histórico local**: Sugestões baseadas em buscas anteriores

---

## 📝 Conclusão

Este projeto demonstra:

- ✅ Arquitetura limpa e escalável (DDD)
- ✅ Boas práticas de React/TypeScript
- ✅ UX moderna e responsiva
- ✅ Persistência de dados local
- ✅ Sistema de testes estruturado
- ✅ Documentação completa

**Tempo de desenvolvimento:** ~2-3 dias (estimativa para desenvolvimento completo incluindo design, testes e documentação)

**Pronto para produção?** Sim, com pequenos ajustes baseados em feedback.

---

## 📧 Contato

Qualquer dúvida sobre a implementação, decisões técnicas ou sugestões de melhoria, sinta-se à vontade para entrar em contato.

**Desenvolvido com ❤️ usando React, TypeScript e muitas xícaras de ☕**


