import { createRouter, createWebHistory } from "vue-router";
// import LandingPage from "../views/LandingPage.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import VagaView from "../views/VagaView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "landingpage",
    //   component: LandingPage,
    // },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/vaga/:id",
      name: "vaga",
      component: VagaView,
      props: true,
    },
  ],
});

export default router;
