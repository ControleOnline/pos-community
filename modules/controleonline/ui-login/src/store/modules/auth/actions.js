import { api } from "@controleonline/ui-common/src/api";
import * as types from "./mutation_types";
import { LocalStorage } from "quasar";

export const signIn = ({ commit }, values) => {
  commit(types.LOGIN_SET_ERROR, "");
  commit(types.LOGIN_SET_ISLOADING);

  return api
    .fetch("token", { method: "POST", body: values })
    .then((data) => {
      commit(types.LOGIN_SET_USER, data);
      commit(types.LOGIN_SET_IS_LOGGED_IN, true);
      return data;
    })
    .catch((e) => {
      commit(types.LOGIN_SET_ERROR, e.message);
      throw e;
    })
    .finally(() => {
      commit(types.LOGIN_SET_ISLOADING, false);
    });
};

export const getUserStatus = ({ commit }, values) => {
  if (!LocalStorage.has("session")) return;

  let session = LocalStorage.getItem("session");

  api.fetch(`people/${session.people}/status`, {}).then((response) => {
    commit("SET_PEOPLE_STATUS", response.response.data);
  });
};

export const gSignIn = ({ commit }, values) => {
  commit(types.LOGIN_SET_ERROR, "");
  commit(types.LOGIN_SET_ISLOADING, true);

  return api
    .fetch("oauth/google/return", { method: "POST", params: values })
    .then((response) => {
      commit(types.LOGIN_SET_USER, response.response.data);
      commit(types.LOGIN_SET_IS_LOGGED_IN, true);
      return response;
    })
    .catch((e) => {
      commit(types.LOGIN_SET_ERROR, e.message);
      throw e;
    })
    .finally(() => {
      commit(types.LOGIN_SET_ISLOADING, false);
    });
};

export const signUp = ({ commit }, values) => {
  commit(types.LOGIN_SET_ERROR, "");
  commit(types.LOGIN_SET_ISLOADING);

  return api
    .fetch("users/create-account", { method: "POST", body: values })
    .then((response) => {
      commit(types.LOGIN_SET_ISLOADING, false);

      return response;
    })
    .then((data) => {
      if (data.response) {
        if (data.response.success === true)
          commit(types.LOGIN_SET_USER, data.response.data);
        commit(types.LOGIN_SET_IS_LOGGED_IN, true);
        return data.response;
      }

      return null;
    })
    .finally(() => {
      commit(types.LOGIN_SET_ISLOADING, false);
    });
};

/*
 * Do login with just created user
 */
export const logIn = ({ commit, state }, user = null) => {
  commit(types.LOGIN_SET_USER, user);
  commit(types.LOGIN_SET_IS_LOGGED_IN, true);
};

export const logOut = ({ commit }) => {
  commit(types.LOGIN_SET_USER, null);
  commit(types.LOGIN_SET_IS_LOGGED_IN, false);
  LocalStorage.clear();
};

export const setIndexRoute = ({ commit }, indexRoute) => {
  commit(types.LOGIN_SET_INDEX_ROUTE, indexRoute);
};
