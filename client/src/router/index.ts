import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/authenticate",
    name: "authenticate",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
