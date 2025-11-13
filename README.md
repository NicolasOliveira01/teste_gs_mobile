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

### LoginScreen:
### LoginScreen:
<img src="./assets/prints/LoginScreen.jpg" height="200" alt="Tela de Login">

#### 🔐 Autenticação
- Utiliza **Firebase Authentication** para login de usuários
- Validação de email e senha antes da autenticação

#### 🎯 Fluxo de Login
- Validação dos campos de entrada
- Autenticação com **Firebase Auth**
- Redirecionamento para Home em caso de sucesso
- Feedback visual com mensagens de erro/sucesso
- Redirecionamento para RegisterScreen quando o usuário clicar no botão **Criar conta**

### RegisterScreen:

### HomeScreen:

## Alerts do projeto:

###