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
  <div>
    <h1>Detalhes da Vaga</h1>
    <div v-if="vaga">
      <h2>{{ vaga.title }}</h2>
      <p>{{ vaga.description }}</p>
    </div>
    <div v-else>
      <p>Carregando...</p>
    </div>
  </div>
</template>
