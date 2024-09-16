<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { isTokenValid } from "@/auth";

const store = useStore();
const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const messageError = ref("");
const usernameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const isLoading = ref(false);

const showPassword = ref(false);

const checkAuth = () => {
  const token = localStorage.getItem("accessToken");
  if (isTokenValid(token)) {
    router.push("/");
  }
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const validateUsername = () => {
  usernameError.value = username.value ? "" : "Preencha um valor.";
};

const validateEmail = () => {
  emailError.value = email.value ? "" : "Preencha um valor.";
};

const validatePassword = () => {
  passwordError.value = password.value ? "" : "Preencha um valor.";
};

const signup = async () => {
  messageError.value = "";
  isLoading.value = true;
  validateUsername();
  validateEmail();
  validatePassword();
  if (usernameError.value || emailError.value || passwordError.value) {
    isLoading.value = false;
    return;
  }

  try {
    await axios.post(`/login/criar`, {
      username: username.value,
      email: email.value,
      password: password.value,
    });

    router.push("/auth");
  } catch (error) {
    messageError.value =
      error.response?.data.message ||
      "Erro ao registrar. Tente novamente mais tarde.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  checkAuth();
});
</script>

<template>
  <div class="content mt-3">
    <div class="container">
      <h2 class="title">Crie a sua conta</h2>
      <form @submit.prevent="signup" class="mt-2">
        <div class="form-group">
          <div class="input-container">
            <input
              type="text"
              id="username"
              v-model="username"
              name="username"
              placeholder=" "
            />
            <label for="username">Nome</label>
          </div>
          <p v-if="usernameError" class="error-input">{{ usernameError }}</p>
        </div>
        <div class="form-group">
          <div class="input-container">
            <input
              type="email"
              id="email"
              v-model="email"
              name="email"
              placeholder=" "
            />
            <label for="email">E-mail</label>
          </div>
          <p v-if="emailError" class="error-input">{{ emailError }}</p>
        </div>
        <div class="form-group">
          <div class="input-container">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              name="password"
              placeholder=" "
            />
            <label for="password">Senha</label>
            <button
              type="button"
              @click="togglePassword"
              class="toggle-password"
            >
              <v-icon
                :name="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                scale="1"
              />
            </button>
          </div>
          <p v-if="passwordError" class="error-input">{{ passwordError }}</p>
        </div>
        <div class="form-group form-group-btn">
          <RouterLink class="btn btn-primary-outline" to="/auth">
            Faça login
          </RouterLink>
          <button
            type="submit"
            :disabled="isLoading"
            :class="{ loading: isLoading }"
            class="btn btn-primary"
          >
            <template v-if="isLoading">
              <v-icon name="pr-spinner" scale="0.8" animation="spin" />
            </template>
            <template v-else> Criar </template>
          </button>
        </div>
      </form>
      <div class="wrapper">
        <p v-if="messageError" class="error">{{ messageError }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: #efe9ff;
}
</style>
