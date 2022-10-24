import { createRouter, createWebHistory } from "vue-router";
import MainBody from "./../components/MainBody.vue";
import LoginApp from "./../components/LoginApp.vue";

const routes = [
  { path: "/", name: "Home", component: MainBody },
  { path: "/login", name: "Login", component: LoginApp },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
