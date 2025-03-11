import { LocalStorage } from "quasar";
import * as types from "./mutation_types";

export default {
  [types.LOGIN_SET_USER](state, user) {
    if (!user) {
      LocalStorage.clear();
      state.isLoggedIn = false;
    } else {
      LocalStorage.set("session", user);
      state.isLoggedIn = true;
    }
    state.user = user || {};
  },

  [types.SET_PEOPLE_STATUS](state, peopleStatus) {
    state.peopleStatus = peopleStatus;
    state.isLoading = peopleStatus || false;
  },

  [types.LOGIN_SET_ERROR](state, error) {
    state.error = error || "";
  },

  [types.LOGIN_SET_ISLOADING](state, isLoading = true) {
    state.isLoading = isLoading || false;
  },

  [types.LOGIN_SET_VIOLATIONS](state, violations) {
    state.violations = violations || null;
  },

  [types.LOGIN_SET_INDEX_ROUTE](state, indexRoute) {
    state.indexRoute = indexRoute || "HomeIndex";
  },
  [types.LOGIN_SET_IS_LOGGED_IN](state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn || false;
  },
};
