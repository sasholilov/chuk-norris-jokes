import './assets/sass/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js";
//import store from "@/store/store.js";
import {createPinia} from "pinia";

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
