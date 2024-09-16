<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const showConfig = ref(false);

const logout = () => {
  showConfig.value = !showConfig.value;
  store.dispatch("logout");
  localStorage.removeItem("accessToken");
  router.push("/auth");
};

const toggleConfig = () => {
  showConfig.value = !showConfig.value;
};

onMounted(() => {
  store.dispatch("checkAuth");
  store.dispatch("getUsername");
});
</script>

<template>
  <header>
    <div class="header-content">
      <RouterLink to="/" class="logo">Aprendiz<br />Tech </RouterLink>
      <nav>
        <li v-if="store.getters.isLogged">
          <span
            @click="toggleConfig"
            class="profile radius"
            style="
              width: 40px;
              height: 40px;
              background-color: rgba(103, 65, 217, 0.1);
              color: #6741d9;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 1rem;
              font-weight: 700;
              cursor: pointer;
              text-transform: uppercase;
            "
          >
            {{ store.getters.username.slice(0, 2) }}
          </span>
        </li>
        <li v-else>
          <RouterLink class="btn btn-primary" to="/auth">Login</RouterLink>
        </li>
      </nav>
    </div>
  </header>

  <div v-if="showConfig" class="modal-overlay-config" @click="toggleConfig">
    <div class="modal-content-config" @click.stop>
      <div class="modal-wrapper-config">
        <div class="modal-about-config">
          <span
            class="modal-profile-config radius"
            style="
              width: 80px;
              height: 80px;
              background-color: rgba(103, 65, 217, 0.1);
              color: #6741d9;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 2rem;
              font-weight: 700;
              text-transform: uppercase;
            "
          >
            {{ store.getters.username.slice(0, 2) }}
          </span>
          <div class="modal-info-config">
            <h3>{{ store.getters.username }}</h3>
            <span>{{ store.getters.email }}</span>
            <!-- <p>
              <v-icon name="la-edit-solid" scale="0.9" />
              Edit Profile
            </p> -->
          </div>
        </div>
        <button @click="toggleConfig" class="modal-close-button">
          <v-icon name="io-close-sharp" scale="0.9" />
        </button>
      </div>
      <ul>
        <li>
          <button>Anunciar Vaga</button>
        </li>
        <li v-if="store.getters.isLogged">
          <button @click="logout">
            <v-icon name="md-exittoapp-sharp" scale="1" />
            Sair
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
header {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 8rem;
}

@media screen and (max-width: 768px) {
  header {
    padding: 1rem;
  }
}

header .header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: #000;
  font-weight: 600;
  line-height: 1rem;
  font-size: 1.2rem;
}

.alert-message {
  background-color: rgba(103, 65, 217, 0.1);
  color: #6741d9;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  /* text-transform: uppercase; */
}

header nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

header nav .flag {
  cursor: pointer;
}

header nav li {
  display: flex;
  align-items: center;
}

.modal-overlay-config {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
}

.modal-content-config {
  background: #fff;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  padding-bottom: 1rem;
}

.modal-content-config ul {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.modal-content-config ul li {
  width: 100%;
}

.modal-content-config ul li button {
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background: none;

  font-size: 1rem;

  display: flex;
  gap: 0.5rem;
  cursor: pointer;
}
.modal-content-config ul li button:hover {
  background: #f1f3f5;
}

.modal-wrapper-config {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-about-config {
  display: flex;
  gap: 1rem;
}

.modal-info-config {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
}

.modal-info-config h3 {
  font-weight: 500;
  font-size: 0.9rem;
  text-align: start;
}

.modal-info-config span {
  font-weight: 400;
  font-size: 0.9rem;
  color: #868e96;
}

.modal-info-config p {
  position: relative;
  left: -0.25rem;
  padding: 0.25rem;

  border-radius: 0.5rem;

  font-size: 0.7rem;
  color: #6741d9;

  font-weight: 600;
  text-transform: uppercase;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  gap: 0.5rem;
  cursor: pointer;
}

.modal-about-config p:hover {
  background: rgba(103, 65, 217, 0.1);
}

.modal-close-button {
  background: none;
  border: none;
  padding: 0.25rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.modal-close-button:hover {
  background: #f8f9fa;
}
</style>
