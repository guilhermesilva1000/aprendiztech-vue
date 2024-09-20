<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { isTokenValid } from "@/auth";

const store = useStore();
const router = useRouter();
const loading = ref(false);
const hasMoreVagas = ref(true);
const search = ref(""); // Valor da busca

const checkAuth = () => {
  const token = localStorage.getItem("accessToken");
  if (!isTokenValid(token)) {
    router.push("/auth");
  }
};

// Função de pesquisa
const searchVagas = () => {
  if (search.value.trim()) {
    router.push({ path: `/search`, query: { query: search.value } });
  }
};

const loadMoreVagas = async () => {
  if (!loading.value && hasMoreVagas.value) {
    loading.value = true;

    if (store.state.currentPage < store.state.totalPages) {
      await store.dispatch("getVagas", store.state.currentPage + 1);
      loading.value = false;

      if (store.state.currentPage >= store.state.totalPages) {
        hasMoreVagas.value = false;
      }
    } else {
      hasMoreVagas.value = false;
      loading.value = false;
    }
  }
};

const handleScroll = () => {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const scrollPosition = window.scrollY;

  if (
    scrollPosition >= scrollableHeight - 100 &&
    !loading.value &&
    hasMoreVagas.value
  ) {
    loadMoreVagas();
  }
};

const transformText = (text) => {
  const charactersLimit = 80;

  if (text.length > charactersLimit) {
    return text.substring(0, charactersLimit) + "...";
  }

  return text;
};

onMounted(() => {
  checkAuth();
  if (store.getters.vagas.length === 0) {
    store.dispatch("getVagas");
  }
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="content">
    <div class="wrapper">
      <h2>Jovem Aprendiz Tech</h2>
      <p>
        Encontre a sua primeira vaga como jovem aprendiz na área de Tecnologia e
        dê início à sua carreira em um setor cheio de oportunidades e
        aprendizado.
      </p>
    </div>
    <div class="search-bar">
      <form @submit.prevent="searchVagas">
        <div class="form-group">
          <div class="input-container">
            <input
              type="text"
              id="search"
              v-model="search"
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
      <h2>Vagas</h2>
      <div class="vagas-content">
        <RouterLink
          :to="`/vaga/${vaga._id}`"
          v-for="vaga in store.getters.vagas"
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
      <div v-if="loading" class="loading">Carregando mais vagas...</div>
      <div v-if="!hasMoreVagas" class="end-message">
        Você já viu todas as vagas disponíveis.
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
  font-size: 3.5rem;
  text-align: center;
  color: rgba(17, 24, 39, 1);
}

.content .wrapper p {
  width: 40%;
  text-align: center;
  word-wrap: break-word;
  font-size: 1.1rem;
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
.content .vagas .vagas-content .vaga .vaga-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.content .vagas .pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.content .vagas .pagination button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #6741d9;
  color: #fff;
  cursor: pointer;
}

.content .vagas .pagination button:disabled {
  background-color: #dcdcdc;
  cursor: not-allowed;
}

.end-message {
  text-align: center;
}

@media screen and (max-width: 968px) {
  .content .vagas .vagas-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 768px) {
  .content .wrapper p {
    width: 90%;
  }

  .content .vagas .vagas-content {
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 1rem;
  }
}
</style>
