import { LocalStorage } from "quasar";
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

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
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
    // clean storage from not allowed keys

    let keys = LocalStorage.getAllKeys();
    for (let index = 0; index < keys.length; index++) {
      if (keys[index] != "session") LocalStorage.remove(keys[index]);
    }

    if (LocalStorage.has("session")) {
      let session = LocalStorage.getItem("session");

      // in case app version changes clear LocalStorage

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

    //If dont have route, go to home
    if (to.name == undefined) return next({ name: "HomeIndex" });

    //If is login page, and is logged and have a redirect on URL
    if (isLoginPage && isLogged && to.query.redirect) next(to.query.redirect);

    //If is not a public page and is not logged in
    if (!to.meta?.isPublic && !isLogged && !isLoginPage)
      return next({ name: "LoginIndex", query: { redirect: to.fullPath } });

    //If is a login page and is not logged in
    if (!isLogged && isLoginPage) return next(false);

    return next();
  });

  return Router;
});
