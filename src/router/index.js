import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Test from "../views/Test.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import RecipesIndex from "../views/RecipesIndex.vue";
import RecipesNew from "../views/RecipesNew.vue";
import RecipesShow from "../views/RecipesShow.vue";
import RecipesEdit from "../views/RecipesEdit.vue";
import Mapbox from "../views/Mapbox.vue";
import MessagesIndex from "../views/MessagesIndex.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Home},
  { path: "/test", name: "test", component: Test },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/recipes", name: "recipes-index", component: RecipesIndex },
  { path: "/recipes/new", name: "recipes-new", component: RecipesNew },
  { path: "/recipes/:id", name: "recipes-show", component: RecipesShow },
  { path: "/recipes/:id/edit", name: "recipes-edit", component: RecipesEdit },
  { path: "/mapbox", name: "mapbox", component: Mapbox },
  { path: "/messages", name: "messages-index", component: MessagesIndex }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
