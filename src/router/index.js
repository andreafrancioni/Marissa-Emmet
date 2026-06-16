import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SaveTheDate from "../views/SaveTheDate.vue";
import RSVPPage from "../views/RSVPPage.vue";
import Accommodation from "../views/Accommodation.vue";
import Florence from "../views/Florence.vue";

const routes = [
  {
    path: "/",
    // redirect: '/savethedate'
    component: Home
  },
  {
    path: "/savethedate",
    name: "SaveTheDate",
    component: SaveTheDate,
  },
  {
    path: "/rsvp",
    name: "RSVP",
    component: RSVPPage,
  },
  {
    path: "/accommodation",
    name: "Accommodation",
    component: Accommodation,
  },
  {
    path: "/florence",
    name: "Florence",
    component: Florence,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
