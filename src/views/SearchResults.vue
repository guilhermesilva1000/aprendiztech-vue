<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();
const searchResults = ref([]);
const loading = ref(false);
const searchQuery = ref(route.query.query || "");
const searchDisplay = ref(""); // Estado para o título da pesquisa
const errorMessage = ref(""); // Estado para armazenar a mensagem de erro

// Função que transforma texto longo para exibição
const transformText = (text) => {
  const charactersLimit = 80;
  return text.length > charactersLimit
    ? text.substring(0, charactersLimit) + "..."
    : text;
};

// Função para buscar os resultados
const fetchSearchResults = async () => {
  loading.value = true;
  errorMessage.value = ""; // Reseta a mensagem de erro ao iniciar a busca
  try {
    const response = await store.dispatch("searchVagas", searchQuery.value);
    searchResults.value = response.data.vagas;
    searchDisplay.value = searchQuery.value;
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.message ===
        "A consulta de pesquisa deve ter pelo menos 2 caracteres."
    ) {
      errorMessage.value =
        "A consulta de pesquisa deve ter pelo menos 2 caracteres.";
    } else {
      console.error("Erro ao buscar vagas:", error);
    }
  } finally {
    loading.value = false;
  }
};

// Função para executar a pesquisa
const searchVagas = () => {
  if (searchQuery.value.trim()) {
    // Atualiza a URL com a query da pesquisa
    router.push({ path: `/search`, query: { query: searchQuery.value } });
    fetchSearchResults(); // Chama a busca ao submeter o formulário
  }
};

// Executa ao carregar o componente
onMounted(() => {
  if (searchQuery.value.trim()) {
    fetchSearchResults(); // Busca automática ao carregar se houver query na rota
  }
});
</script>

<template>
  <div class="content">
    <div class="wrapper">
      <!-- Atualiza o título apenas após a requisição -->
      <h2 v-if="!errorMessage">
        Resultados da Pesquisa para "{{ searchDisplay }}"
      </h2>
    </div>
    <div class="search-bar">
      <form @submit.prevent="searchVagas">
        <div class="form-group">
          <div class="input-container">
            <input
              type="text"
              id="search"
              v-model="searchQuery"
              name="search"
              placeholder=" "
            />
            <label for="search">Palavras-chave, empresa</label>
          </div>
        </div>
        <button type="submit">
          <v-icon name="hi-solid-search" scale="1" />
        </button>
      </form>
    </div>
    <div class="vagas">
      <!-- Exibe carregando enquanto busca -->
      <div v-if="loading" class="loading">Carregando resultados...</div>

      <!-- Exibe a mensagem de erro personalizada -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Exibe mensagem se não houver resultados e nenhum erro ocorreu -->
      <div
        v-else-if="searchResults.length === 0 && !errorMessage"
        class="no-results"
      >
        Nenhuma vaga encontrada para "{{ searchDisplay }}".
      </div>

      <!-- Exibe as vagas quando houver resultados -->
      <div v-else class="vagas-content">
        <RouterLink
          :to="`/vaga/${vaga.id}`"
          v-for="vaga in searchResults"
          :key="vaga._id"
          class="vaga"
        >
          <h3>{{ vaga.title }}</h3>
          <p class="company">{{ vaga.company }}</p>
          <span>{{ vaga.location }}</span>
          <p>{{ transformText(vaga.description) }}</p>
          <span>Há 2 dias</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.content .wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
  gap: 1rem;
  color: #000;
}

.content .wrapper h2 {
  font-size: 2.5rem;
  text-align: start;
  color: rgba(17, 24, 39, 1);
}

.content .search-bar {
  width: 100%;
  padding: 1rem 8rem;
}

.content .search-bar form {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.content .search-bar form .form-group {
  width: 100%;
  display: flex;
}

.content .search-bar form .form-group .input-container {
  width: 100%;
}

.content .search-bar form .form-group .input-container input {
  width: 100%;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.content .search-bar form button {
  padding: 0.975rem 0.9rem;
  border: 1px solid #000;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  cursor: pointer;
}

.content .vagas {
  width: 100%;
  padding: 3rem 8rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .content .vagas {
    padding: 3rem 1rem;
  }

  .content .search-bar {
    padding: 1rem;
  }
}

.content .vagas h2 {
  font-size: 1.8rem;
}

.content .vagas .vagas-content {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.content .vagas .vagas-content .vaga {
  width: 100%;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: #000;
}

.content .vagas .vagas-content .vaga:hover h3 {
  text-decoration: underline;
}

.content .vagas .vagas-content .vaga h3 {
  font-size: 1.25rem;
  font-weight: 700;
}

.content .vagas .vagas-content .vaga p {
  width: 80%;
  font-size: 0.9rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.2rem;
  max-height: 2.4rem;
}

.content .vagas .vagas-content .vaga .company {
  color: #6741d9;
}

.content .vagas .vagas-content .vaga span {
  font-size: 0.8rem;
  color: #868e96;
}

.loading {
  text-align: center;
}

.no-results {
  text-align: center;
}

@media screen and (max-width: 968px) {
  .content .vagas .vagas-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .content .vagas .vagas-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
