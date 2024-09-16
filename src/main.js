import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  IoCloseSharp,
  PrSpinner,
  HiShare,
  LaEditSolid,
  MdExittoappSharp,
  IoLanguage,
  FaEyeSlash,
  FaEye,
  MdNavigatebefore,
  MdNavigatenext,
  CoOptions,
} from "oh-vue-icons/icons";
import axios from "axios";

addIcons(
  IoCloseSharp,
  PrSpinner,
  HiShare,
  LaEditSolid,
  MdExittoappSharp,
  IoLanguage,
  FaEyeSlash,
  FaEye,
  MdNavigatebefore,
  MdNavigatenext,
  CoOptions
);

// axios.defaults.baseURL = "http://127.0.0.1:8080/api/v1";
axios.defaults.baseURL = "https://aprendiztech-api.onrender.com/api/v1";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("v-icon", OhVueIcon);
app.config.globalProperties.$axios = axios;
app.mount("#app");
