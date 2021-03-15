import { createRouter, createWebHistory } from "@ionic/vue-router";
import Tabs from "../views/Tabs.vue";
import { auth } from "../store/db.js";

function guardMyroute(to, from, next) {
  console.log("auth: " + auth);
  console.log("auth.currentUser: " + auth.currentUser);
  try {
    if (auth.currentUser?.uid) {
      next(); // allow to enter route
    } else {
      next("/");
    }
  } catch (error) {
    next("/");
  }
}

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tabs/entries",
      },
      {
        path: "entries",
        component: () => import("@/views/Entries.vue"),
        beforeEnter: guardMyroute,
      },
      {
        path: "stats",
        component: () => import("@/views/Stats.vue"),
        beforeEnter: guardMyroute,
      },
      {
        path: "profile",
        component: () => import("@/views/Profile.vue"),
        beforeEnter: guardMyroute,
      },
    ],
  },
  {
    path: "/tabs/entries/add",
    component: () => import("@/views/AddEntry.vue"),
    beforeEnter: guardMyroute,
  },
  {
    path: "/test",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
