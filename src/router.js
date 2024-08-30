import {createRouter, createWebHistory} from "vue-router";

//import HomePage from "@/pages/HomePage.vue";
//import JokesPage from "@/pages/JokesPage.vue";
//import FavouritesPage from "@/pages/FavouritesPage.vue";
const routes = [
    {path: "/", component: ()=>import('./pages/HomePage.vue')},
    {path: "/home", component: ()=>import('./pages/HomePage.vue')},
    {path: "/jokes", component: ()=>import('./pages/JokesPage.vue')},
    {path: "/favourites", component: ()=>import('./pages/FavouritesPage.vue')},
    {path: "/:pathMatch(.*)*", component: () => import('./pages/PageNotFound.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;