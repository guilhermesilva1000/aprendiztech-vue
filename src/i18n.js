import { createI18n } from "vue-i18n";

const messages = {
  pt: {
    language: "Português",
    flagIcon: "pt",
    welcome: "Bem-vindo",
    greeting: "Olá, mundo",
    login: "Entre na sua conta",
    signup: "Crie sua conta",
    labelUser: "Nome",
    labelEmail: "E-mail",
    labelPassword: "Senha",
    loginBtn: "Entrar",
    signupBtn: "Criar",
    logoutBtn: "Sair",
    loading: "Carregando...",
    inputError: "Preencha um valor.",
    loginLink: "Faça login",
    signupLink: "Criar conta",
    close: "Fechar",
  },
  en: {
    language: "English",
    flagIcon: "en",
    welcome: "Welcome",
    greeting: "Hello, world",
    login: "Sign in to your account",
    signup: "Sign up your account",
    labelUser: "Username",
    labelEmail: "E-mail",
    labelPassword: "Password",
    loginBtn: "Sign in",
    signupBtn: "Create",
    logoutBtn: "Logout",
    loading: "Loading...",
    inputError: "Fill in a value.",
    loginLink: "Sign in to your account",
    signupLink: "Create a account",
    close: "Close",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "pt",
  fallbackLocale: "pt",
  messages,
});

export default i18n;
