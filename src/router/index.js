import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import SaveTheDate from "../views/SaveTheDate.vue";
import RSVPPage from "../views/RSVPPage.vue";

const routes = [
  {
    path: "/",
    // redirect: '/savethedate'
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
