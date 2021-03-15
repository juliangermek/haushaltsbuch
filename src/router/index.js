import { createRouter, createWebHistory } from "@ionic/vue-router";
// import {
//   RouteRecordRaw,
//   RouteLocationNormalized,
//   NavigationGuardNext,
// } from "vue-router";
import Tabs from "../views/Tabs.vue";
import { auth } from "../store/db.js";

// const guard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   try {
//     if (auth.currentUser?.uid) {
//       next();
//     }
//     else {
//       next("/")
//     }
//   } catch (error) {
//     next("/")
//   }
// }

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

  // var isAuthenticated = false;
  // console.log("auth: " + auth);
  // console.log("auth.currentUser: " + auth.currentUser);
  // if (auth.currentUser) {
  //   isAuthenticated = true;
  // }
  // // else isAuthenticated = false;
  // if (isAuthenticated) {
  //   next(); // allow to enter route
  // } else {
  //   next("/login"); // go to '/login';
  // }
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
