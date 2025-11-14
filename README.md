# Global Solution FIAP 2025.2 - Mobile Development & IoT

## Integrantes da Equipe

| Nome | RM |
|------|-----|
| Guilherme Barreto | 97674  |
| Mateus Iago Sousa | 550270 |
| Nicolas Oliveira  | 98939  |

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI instalado globalmente

### Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/NicolasOliveira01/SkillUpPlus2030
```

2. Instale as dependências

```bash
npm install
```

3. Rodar o projeto

```bash
npx expo start -c
```

## 📁 Estrutura do Projeto

```
SKILLUPPLUS2030/
├── config/
│   ├── colors.ts
│   ├── firebaseConfig.ts
│   └── utils.ts
├── navigation/
│   └── AppNavigation.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── RegisterScreen.tsx
├── App.tsx
├── google-service.json
└── index.ts
```

## Telas do projeto:

#### 🎨 Design System Aplicado
- **Cores:** Azul (#2563EB) transmite confiança e tecnologia (ODS 9)
- **Layout:** Formulário centralizado para melhor experiência mobile
- **Tipografia:** Título em destaque para clareza visual
- **Botões:** Contraste entre primário (azul) e secundário (verde) para hierarquia clara

### LoginScreen:

<img src="./assets/prints/LoginScreen.jpg" height="350" alt="Tela de Login">

#### 🔐 Autenticação:
- Utiliza **Firebase Authentication** (auth().signInWithEmailAndPassword) para login de usuários
- Validação de email e senha antes da autenticação

<img src="./assets/prints/auth.jpg" alt="Authentication_firebase">

#### 🎯 Fluxo de Login:
- Validação dos campos de entrada
- Autenticação com **Firebase Auth**
- Redirecionamento para Home em caso de sucesso
- Feedback visual com mensagens de erro/sucesso
- Redirecionamento para RegisterScreen quando o usuário clicar no botão **Criar conta**

### RegisterScreen:

<img src="./assets/prints/dados_cadastrais_register.jpg" alt="dados cadastrais">

<img src="./assets/prints/picker_register.jpg" alt="pickers">

 - Usuário preenche os campos **Nome Completo**, **Email**, **Senha**, **Confirmar senha**, **Área de Interesse** e **Nível**

#### Área de Interesse: 

 - **IA**, **Sustentabilidade**, **Soft Skills**, **Gestão**, **Análise de Dados** e **Tecnologia da Informação**

<img src="./assets/prints/area_interesse.jpg" alt="pickers">

#### Nível

 - **Iniciante**, **Intermediário**, **Avançado**

<img src="./assets/prints/nivel.jpg" alt="pickers">

### HomeScreen:

## Alerts do projeto:

## Dependências instaladas 

### Firebase: 

```bash
npx create-expo-app SkillUpPlus --template blank-typescript
npx expo install expo-dev-client
npx expo install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/database  
npx expo install expo-build-properties
npx expo prebuild
```

### React Navigation

```bash
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
```

### Integração com IA

```bash
npm install axios
```

### Toast

``` bash
npx expo install react-native-toast-message
```

### Picker

```bash
npx expo install @react-native-picker/picker
```