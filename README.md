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

Plataforma-Gestao-Odontolegal-Pericial-Mobile/
├── .gitignore/
├── app.json/
├── casos.json/
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
│
└── src/
    ├── app/
    │   ├── index.tsx
    │   ├── auth/
    │   │   ├── tabs/
    │   │   │   ├── dashboard.tsx
    │   │   │   ├── perfil.tsx
    │   │   │   └── layout.tsx
    │   │   ├── adm/
    │   │   │   ├── adicionarUsuario.tsx
    │   │   │   └── index.tsx
    │   │   └── casos/
    │   │       ├── adicionarCaso.tsx
    │   │       ├── adicionarEvidencia.tsx
    │   │       ├── adicionarVitima.tsx
    │   │       ├── layout.tsx
    │   │       └── index.tsx
    ├── components/
    │   ├── cardevidencia/
    │   ├── commom/
    │   │   └── inputfield.tsx
    │   ├── editalmodal/
    │   │   └── index.tsx
    │   ├── formularios/
    │   │   ├── forminput.tsx
    │   │   ├── imageuploader.tsx
    │   │   ├── locationmap.tsx
    │   │   └── pickerselect.tsx
    │   ├── modaleevidencia/
    │   │   └── index.tsx
    │   ├── odontogramainput/
    │   │   └── odontogramainput.tsx
    │   ├── user/
    │   │   ├── adduserbutton.tsx
    │   │   └── usercard.tsx
    │   ├── CardCaso/
    │   │   └── index.tsx
    │   ├── ModalEvidencia/
    │   │   └── index.tsx
    │   └── InputPadrao/
    │       └── index.tsx
    ├── hooks/
    │   ├── useDatatimepicker.ts
    │   ├── useimagepicker.ts
    │   ├── useAuth.ts
    │   ├── useGeoLocation.ts
    │   └── useForm.ts
    ├── interfaces/
    │   ├── Iuser.ts
    │   ├── Caso.ts
    │   └── Evidencia.ts
    ├── lib/
    │   ├── geocode.ts
    │   └── validate.ts
    ├── styles/
    │   ├── adicionarusuarios.styles.ts
    │   ├── cadastronovocaso.styles.ts
    │   ├── globalstyles.ts
    │   ├── perfil.styles.ts
    │   └── vitima.styles.ts
    └── utils/
        └── fileHelpers.ts

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

bash
git clone <url-do-repositorio>
cd Plataforma-Gestao-Odontolegal-Pericial-Mobile

##  Documentação da API

Acesse a documentação da API REST via Swagger:

[https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs](https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api-docs)


## Contribuidores

- Gabriel de Santana  
- João Gabriel
- Kethylle Cury  
- Henrique Fernandes  


