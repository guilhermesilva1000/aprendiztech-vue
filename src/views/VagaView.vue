<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      vaga: null,
    };
  },
  async created() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(`/vagas/${this.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.vaga = response.data;
    } catch (error) {
      console.error("Erro ao obter detalhes da vaga", error);
    }
  },
};
</script>

<template>
  <div v-if="vaga" class="vaga">
    <img src="/aprendiztech-bg-full.svg" alt="Aprendiz Tech Bg" />
    <div class="vaga-wrapper">
      <div class="vaga-wrapper-content">
        <h2>{{ vaga.title }}</h2>
        <button>
          <v-icon name="fa-copy" scale=".9" />
        </button>
      </div>
      <p>{{ vaga.company }}</p>
      <p>Publicada em 15 de setembro de 2024</p>
    </div>
    <div class="vaga-about">
      <div class="vaga-about-field">
        <v-icon name="io-location-sharp" scale="1" />
        <p>{{ vaga.location }}</p>
      </div>
      <div class="vaga-about-field">
        <v-icon name="px-buildings" scale="1" />
        <p>Presencial</p>
      </div>
    </div>
    <div class="vaga-description">
      <h3>Descrição da vaga</h3>
      <pre>{{ vaga.description }}</pre>
    </div>
    <div class="vaga-about-us">
      <h3>Conheça mais sobre nós</h3>
      <div class="vaga-about-us-content">
        <a href="#" class="vaga-about-us-field">
          <v-icon name="gi-world" scale="1" />
          <p>Website</p>
        </a>
        <a href="#" class="vaga-about-us-field">
          <v-icon name="fa-linkedin-in" scale="1" />
          <p>LinkedIn</p>
        </a>
      </div>
    </div>
    <div class="vaga-buttons">
      <button class="btn btn-primary">Candidatar-se</button>
      <button class="btn btn-primary-outline">Copiar Link</button>
    </div>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>

<style scoped>
.vaga {
  width: 100%;
  padding: 1rem 8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

@media screen and (max-width: 768px) {
  .vaga {
    padding: 1rem;
  }
}

.vaga img {
  max-width: 100%;
  object-fit: contain;
  border-radius: 1rem;
  cursor: pointer;
}

.vaga-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.vaga-wrapper-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.vaga-wrapper-content button {
  border: none;
  background: #6741d9;
  color: #fff;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
}

.vaga-wrapper-content h2 {
  font-size: 2rem;
  word-break: break-all;
}

.vaga-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.vaga-description h3 {
  font-size: 1.25rem;
  text-transform: uppercase;
}

.vaga-description pre {
  max-width: 100%;
  font-family: "Inter", sans-serif;
  word-break: break-all;
  font-size: 0.9rem;
  line-height: 1.5rem;
  overflow: auto;
  white-space: pre-wrap;
}

.vaga-about {
  width: 100%;
  display: flex;
  gap: 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.vaga-about-us h3 {
  font-size: 1.25rem;
  text-transform: uppercase;
}

.vaga-about-us {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.vaga-about-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vaga-about-us-content {
  width: 100%;
  display: flex;
  gap: 3rem;
}

.vaga-about-us-content .vaga-about-us-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.vaga-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
