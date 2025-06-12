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
projeto <br>
├── 📁 assets/                        **Imagens e ícones usados no app (favicon, logo, splash, etc)** <br>
│   ├── adaptive-icon.png <br>
│   ├── favicon.png <br>
│   ├── icon.png <br>
│   ├── logo-gop.png <br>
│   └── splash-icon.png <br>
│ <br>
├── 📁 src/                           **Código-fonte principal da aplicação** <br>
│   ├── 📁 app/                       **Arquivos relacionados às rotas e páginas** <br>
│   │   ├── 📁 (auth)/               **Páginas de autenticação (login, cadastro)** <br>
│   │   └── 📁 (tabs)/               **Navegação com abas principais do app** <br>
│   │       ├── 📁 (adm)/           **Páginas exclusivas para usuários administradores** <br>
│   │       │   ├── AdicionarUsuarios.tsx     **Tela para adicionar usuários** <br>
│   │       │   ├── _layout.tsx               **Layout da área admin** <br>
│   │       │   └── index.tsx                 **Página principal da aba admin** <br>
│   │       ├── 📁 (casos)/         **Telas relacionadas à gestão de casos** <br>
│   │       │   ├── 📁 caso/                   **Páginas de um caso específico** <br>
│   │       │   │   ├── [id].tsx                     **Visualização de detalhes de um caso** <br>
│   │       │   │   ├── AdicionarCaso.tsx           **Cadastro de novo caso** <br>
│   │       │   │   ├── AdicionarEvidencia.tsx      **Adição de evidências ao caso** <br>
│   │       │   │   ├── AdicionarVitima.tsx         **Adição de vítima ao caso** <br>
│   │       │   │   ├── _layout.tsx                 **Layout padrão da página de caso** <br>
│   │       │   │   └── index.tsx                   **Página principal da seção de caso** <br>
│   │       │   ├── Dashboard.tsx           **Painel geral com estatísticas ou atalhos** <br>
│   │       │   ├── Perfil.tsx              **Página de perfil do usuário** <br>
│   │       │   ├── _layout.tsx             **Layout padrão da aba "casos"** <br>
│   │       │   └── index.tsx               **Página inicial da aba "casos"** <br>
│   │ <br>
│   ├── 📁 components/                  **Componentes reutilizáveis da interface** <br>
│   │   ├── 📁 CardCaso/              **Card com dados de um caso** <br>
│   │   │   └── index.tsx <br>
│   │   ├── 📁 CardEvidencia/         **Card com dados de uma evidência** <br>
│   │   │   └── index.tsx <br>
│   │   ├── 📁 EditarModal/           **Modal para edição de dados** <br>
│   │   │   └── index.tsx <br>
│   │   ├── 📁 ModalEvidencia/        **Modal para exibir ou adicionar evidências** <br>
│   │   │   └── index.tsx <br>
│   │   ├── 📁 OdontogramaInput/      **Entrada gráfica para informações odontológicas** <br>
│   │   │   └── OdontogramaInput.tsx <br>
│   │   ├── 📁 User/                  **Componentes relacionados ao usuário** <br>
│   │   │   ├── AddUserButton.tsx <br>
│   │   │   └── UserCard.tsx <br>
│   │   ├── 📁 common/                **Componentes genéricos e utilitários (ex: input)** <br>
│   │   │   └── InputField.tsx <br>
│   │   ├── 📁 formularios-components/  **Componentes usados em formulários diversos** <br>
│   │   │   ├── FormInput.tsx <br>
│   │   │   ├── ImageUploader.tsx <br>
│   │   │   ├── LocationMap.tsx <br>
│   │   │   └── PickerSelect.tsx <br>
│   │ <br>
│   ├── 📁 hook/                      **Hooks personalizados para lógica reutilizável** <br>
│   │   ├── useDateTimePicker.ts <br>
│   │   └── useImagePicker.ts <br>
│   │ <br>
│   ├── 📁 interfaces/                **Definições de tipos e interfaces TypeScript** <br>
│   │   └── IUser.ts <br>
│   │ <br>
│   ├── 📁 lib/                       **Bibliotecas e funções auxiliares** <br>
│   │   ├── geocode.ts                       **# Função para geocodificação de endereços** <br>
│   │   └── validate.ts                      **# Funções de validação** <br>
│   │ <br>
│   ├── 📁 styles/                    **Estilos globais e específicos das páginas** <br>
│   │   ├── AdicionarUsuarios.styles.ts <br>
│   │   ├── CadastroNovoCaso.styles.ts <br>
│   │   ├── globalStyles.ts <br>
│   │   ├── perfil.styles.ts <br>
│   │   └── vitima.styles.ts <br>
│   │ <br>
│   └── 📁 utils/                     **Funções utilitárias diversas** <br>
│       └── fileHelpers.ts                   **Funções auxiliares para manipulação de arquivos** <br>
│ <br>
├── .gitignore                       **Arquivos e pastas ignorados pelo Git** <br>
├── README.md                        **Documentação geral do projeto** <br>
├── app.json                         **Configurações do aplicativo (Expo)** <br>
├── casos.json                       **Arquivo de dados mock (casos)** <br>
├── package-lock.json                **Lockfile do gerenciador de pacotes npm** <br>
├── package.json                     **Dependências, scripts e metadados do projeto** <br>
└── tsconfig.json                    **Configurações do compilador TypeScript** <br>


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

#bash
1. git clone [Plataforma-Gestao-Odontolegal-Pericial-Mobile](https://github.com/GabrieldSantana/Plataforma-Gestao-Odontolegal-Pericial-Mobile.git)
2. npm install
3. npx expo start (em caso de uso com o app expo go)


##  Documentação da API

Acesse a documentação da API REST via Swagger:

[https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs](https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs)


## Contribuidores

- João Gabriel
- Kethylle Cury  
- Henrique Fernandes  


