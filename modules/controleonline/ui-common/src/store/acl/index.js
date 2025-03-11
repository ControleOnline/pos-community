import * as getters from "./getters";
import mutations from "./mutations";

export default {
  namespaced: true,
  state: {
    item: {},
    items: [],
    isLoading: true,
    permissions: [],
    disabled: true,
    isAdmin: false,
  },
  getters,
  mutations,
};
