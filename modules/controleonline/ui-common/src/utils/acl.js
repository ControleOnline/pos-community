import { api } from "@controleonline/ui-common/src/api";

import { LocalStorage } from "quasar";

export default class Acl {
  constructor(store, router) {
    this.store = store;
    this.router = router;
    this.permissions = [];
    this.myCompany = store.state.people.myCompany;

    this.initialPermissions();
  }

  getPermissions() {
    let storedUser = LocalStorage.getItem("session") || {};
    return storedUser.actions ? storedUser.actions[this.router.name] : {};
  }

  fetchPermission() {
    let storedUser = LocalStorage.getItem("session");
    let route = storedUser.route;
    if (!storedUser.actions) storedUser.actions = {};

    if (storedUser.mycompany && route)
      return api
        .fetch(`/actions/people`, {
          params: { myCompany: storedUser.mycompany, route: route },
        })
        .then((result) => {
          storedUser.actions[route] = result.response
            ? result.response.data
            : {};
          LocalStorage.set("session", storedUser);
        });
  }

  hasPermission(permission) {
    let permissions = this.getPermissions();
    if (Object.values(permissions).indexOf(permission) > -1) {
      return true;
    }
    return false;
  }

  initialPermissions() {
    if (!this.store.state.auth.isLoggedIn) return;
    this.store.commit("acl/SET_ISLOADING", true);
    this.store
      .dispatch("people/myCompanies")
      .then((companies) => {
        companies?.data.forEach((company) => {
          company?.permission?.forEach((item) => {
            if (this.permissions.indexOf(item) === -1) {
              this.permissions.push(item);
              if (
                item.indexOf("franchisee") !== -1 ||
                item.indexOf("salesman") !== -1 ||
                item.indexOf("super") !== -1 ||
                item.indexOf("admin") !== -1
              ) {
                this.store.commit("acl/SET_ISADMIN", true);
              }
              if (item.indexOf("super") !== -1) {
                this.store.commit("acl/SET_ISSUPERADMIN", true);
              }
            }
          });

          this.discoveryIfEnabled(company);
        });
      })
      .finally(() => {
        this.store.commit("acl/SET_ISLOADING", false);
        this.store.commit("acl/SET_PERMISSIONS", this.permissions);
      });
  }
  discoveryIfEnabled(company) {
    let disabled = true;
    let user_disabled = true;

    user_disabled = !company.user.enabled;
    if (company.enabled && company.user.employee_enabled && !user_disabled) {
      if (!this.myCompany)
        this.store.dispatch("people/currentCompany", company);
      this.store.commit("acl/SET_DISABLED", false);
    }
  }
}
