import {createRouter, createWebHistory} from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import JokesPage from "@/pages/JokesPage.vue";
import FavouritesPage from "@/pages/FavouritesPage.vue";
const routes = [
    {path: "/", component: HomePage},
    {path: "/home", component: HomePage},
    {path: "/jokes", component: JokesPage},
    {path: "/favourites", component: FavouritesPage}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;