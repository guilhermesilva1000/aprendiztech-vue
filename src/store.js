import { createStore } from "vuex";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const store = createStore({
  state: {
    logged: false,
    language: localStorage.getItem("language") || "pt",
    username: "",
    email: "",
    vagas: [],
    currentPage: 1,
    totalPages: 1,
    perPage: 2,
    totalVagas: 0,
  },
  mutations: {
    setLogged(state, value) {
      state.logged = value;
    },
    setLanguage(state, lang) {
      state.language = lang;
      localStorage.setItem("language", lang);
    },
    setUsername(state, username) {
      state.username = username;
    },
    setEmail(state, email) {
      state.email = email;
    },
    addVagas(state, { vagas, totalVagas, totalPages, currentPage }) {
      state.vagas = [...state.vagas, ...vagas]; // Adiciona novas vagas à lista existente
      state.totalVagas = totalVagas;
      state.totalPages = totalPages;
      state.currentPage = currentPage;
    },
  },
  actions: {
    checkAuth({ commit }) {
      const token = localStorage.getItem("accessToken");
      if (token && isTokenValid(token)) {
        commit("setLogged", true);
      } else {
        commit("setLogged", false);
      }
    },
    async getUsername({ commit }) {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(`/username`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit("setUsername", response.data.username);
        commit("setEmail", response.data.email);
      } catch (error) {
        console.error("Erro ao obter o nome de usuário", error);
      }
    },
    async getVagas({ commit, state }, page = 1) {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(`/vagas/${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit("addVagas", {
          vagas: response.data.vagas,
          totalVagas: response.data.total,
          totalPages: response.data.total_pages,
          currentPage: page,
        });
      } catch (error) {
        console.log("Erro ao obter vagas", error);
      }
    },
    async logout({ commit }) {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        await axios.post(
          `/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem("accessToken");
        commit("setLogged", false);
        commit("setUsername", "");
      } catch (error) {
        console.error("Erro ao realizar logout", error);
      }
    },
  },
  getters: {
    isLogged: (state) => state.logged,
    currentLanguage: (state) => state.language,
    username: (state) => state.username,
    email: (state) => state.email,
    vagas: (state) => state.vagas,
    currentPage: (state) => state.currentPage,
    totalPages: (state) => state.totalPages,
  },
});

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};
