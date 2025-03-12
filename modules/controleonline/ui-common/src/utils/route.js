import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "src/router/routes";

export default route(function ({ store, ssrContext }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  const autoLogin = () => {
    if (
      store.getters["auth/user"] !== null &&
      store.getters["auth/user"].api_key
    ) {
      store.commit("auth/LOGIN_SET_IS_LOGGED_IN", true);
      return true;
    }

    let keys = Object.keys(localStorage);
    for (let index = 0; index < keys.length; index++) {
      if (keys[index] != "session") localStorage.removeItem(keys[index]);
    }

    if (localStorage.getItem("session")) {
      let session = JSON.parse(localStorage.getItem("session"));

      if (session.user != undefined) {
        store.dispatch("auth/logIn", session);
        return true;
      }
    }

    return false;
  };

  Router.beforeEach((to, from, next) => {
    const isLoginPage = from.name == "LoginIndex";
    const isLogged = autoLogin();

    if (to.name == undefined) return next({ name: "HomeIndex" });

    if (isLoginPage && isLogged && to.query.redirect) next(to.query.redirect);

    if (!to.meta?.isPublic && !isLogged && !isLoginPage)
      return next({ name: "LoginIndex", query: { redirect: to.fullPath } });

    if (!isLogged && isLoginPage) return next(false);

    return next();
  });

  return Router;
});