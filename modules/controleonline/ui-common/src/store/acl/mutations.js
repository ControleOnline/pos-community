import * as types from "./mutation_types";
import Filters from "@controleonline/ui-default/src/utils/filters";

export default {
  [types.SET_ISLOADING](state, isLoading = true) {
    state.isLoading = isLoading;
  },
  [types.SET_PERMISSIONS](state, permissions) {
    state.permissions = permissions;
  },
  [types.SET_DISABLED](state, disabled = true) {
    state.disabled = disabled;
  },
  [types.SET_ISADMIN](state, isAdmin = false) {
    state.isAdmin = isAdmin;
  }
};
