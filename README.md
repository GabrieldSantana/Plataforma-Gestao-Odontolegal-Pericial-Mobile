# GOP - Gestão Odontolegal Pericial (Mobile)

## Introdução  
A **GOP - Gestão Odontolegal Pericial** é uma aplicação **mobile fullstack** voltada à gestão de casos forenses odontológicos. O sistema contempla funcionalidades como autenticação, gerenciamento de usuários, evidências, vítimas, laudos e relatórios, com foco em usabilidade em dispositivos móveis.

## Tecnologias Utilizadas

### Frontend Mobile

- **React Native (Expo)**
- **TypeScript**
- **Expo Router** – navegação baseada em arquivos
- **Axios** – comunicação com API REST
- **React Native Paper** – componentes UI
- **TailwindCSS para React Native** (opcional com NativeWind)
- **React Native Maps** – visualização de localização
- **UUID** – geração de IDs únicos
- **AsyncStorage** – armazenamento local
- **Geolocation & Geocoding** – geolocalização e endereços

### Backend

- **Node.js + Express**
- **MongoDB**
- **JWT** – autenticação via token

## Estrutura de Pastas
```
gestao-odontolegal-pericial-app/
├── .gitignore/
├── app.json/
├── casos.json/
├── package.json
├── package-lock.json
├── tsconfig.json
├── babel.config.js
├── README.md
│
└── src/
├── app/ # Estrutura de rotas com Expo Router
│ ├── index.tsx # Página inicial
│ ├── auth/ # Fluxo de autenticação
│ │ ├── tabs/
│ │ ├── adm/
│ │ └── casos/
│ │ ├── dashboard/
│ │ │ ├── layout.tsx # Layout do painel de administração
│ │ │ ├── perfil.tsx # Perfil do usuário administrador
│ │ │ └── index.tsx # Dashboard inicial
│ ├── dashboard/
│ │ └── index.tsx # Tela principal do dashboard
│ ├── casos/
│ │ ├── criar/
│ │ │ └── index.tsx # Cadastro de novos casos
│ │ ├── visualizar/
│ │ │ └── index.tsx # Visualização geral dos casos
│ │ └── [id]/
│ │ └── index.tsx # Visualização detalhada do caso (dinâmico)
│ └── usuarios/ # Gerenciamento de usuários
│ ├── index.tsx # Lista de usuários
│ └── adicionar.tsx # Cadastro de novos usuários
├── api/ # Serviços para comunicação com a API
│ ├── index.ts
│ ├── casosService.ts
│ ├── usuariosService.ts
│ └── evidenciasService.ts
├── components/ # Componentes reutilizáveis
│ ├── Botao.tsx
│ ├── CardCaso.tsx
│ ├── ModalEvidencia.tsx
│ └── InputPadrao.tsx
├── hooks/ # Hooks personalizados
│ ├── useAuth.ts
│ ├── useGeoLocation.ts
│ └── useForm.ts
├── interfaces/ # Tipagens TypeScript
│ ├── Caso.ts
│ ├── Usuario.ts
│ └── Evidencia.ts
├── lib/ # Lógicas auxiliares (ex: auth, validações)
│ ├── auth.ts
│ └── validators.ts
├── styles/ # Estilos e temas globais
│ ├── tailwind.css
│ └── theme.ts
└── utils/ # Funções utilitárias gerais
├── formatData.ts
├── fileHelper.ts
└── geoHelper.ts
```

## Bibliotecas Utilizadas (principais)

### Navegação
- `expo-router`
- `expo-linking`

### Utilitários e Comunicação
- `axios`
- `uuid`
- `@react-native-async-storage/async-storage`

### Localização & Mapa
- `expo-location`
- `react-native-maps`
- `react-native-geocoding`

### Upload e Arquivos
- `expo-image-picker`
- `expo-document-picker`

### UI e Estilização
- `react-native-paper`
- `@expo/vector-icons`
- `react-native-svg`
- `react-native-chart-kit`

## Instalação do Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd gestao-odontolegal-pericial-app

##  Documentação da API

Acesse a documentação da API REST via Swagger:

[https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs](https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs)


## Contribuidores

- Gabriel de Santana  
- João Gabriel
- Kethylle Cury  
- Henrique Fernandes  


