import { LocalStorage } from "quasar";

export default class Auth {

  constructor(store, router) {
    this.store = store;
    this.router = router;
    this.user = this.store.getters["auth/user"];
  }

  logout(noReload = false) {
    this.store.dispatch("auth/logOut");
    if (!noReload) location.reload();
  }
  persist(user) {
    LocalStorage.set("session", user);
    this.store.commit("auth/LOGIN_SET_USER", user);
    this.user = user;
  }
  toLogin = () => {
    this.router.push({
      name: "LoginIndex",
      query: { redirect: this.router.currentRoute.value.fullPath },
    });
  }
  isLogged() {
    let isLoggedIn = this.user?.api_key ? true : false;
    this.store.commit("auth/LOGIN_SET_IS_LOGGED_IN", isLoggedIn);
    return isLoggedIn;
  }
}
