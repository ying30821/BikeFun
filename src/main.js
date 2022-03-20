import { createApp } from 'vue';
// loading
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// bootstrap icon
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import router from './router';
import { allCity, allRouteCity } from './methods/filters';

const app = createApp(App);
app.config.globalProperties.$filters = {
  allCity, allRouteCity,
};
app.use(VueAxios, axios);
app.use(router);
app.component('Loading', Loading);
app.mount('#app');
