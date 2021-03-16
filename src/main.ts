import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCocktail,
  faEnvelope,
  faUser,
  faLock,
  faCalendarAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VCalendar from 'v-calendar';

library.add(faCocktail, faEnvelope, faUser, faLock, faCalendarAlt, faGoogle, faFacebook, faTwitter, faLinkedin, faCheck);

createApp(App)
  .use(store)
  .use(router)
  .use(VCalendar, {})
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
