import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";
import * as customActions from "./actions";

export default {
  namespaced: true,
  state: {
 item:{},
items:[],
    resourceEndpoint: "files",
    isLoading: false,
    error: "",
    violations: null,
    totalItems: 0,
    filters: {},
    columns: [],
  },
  actions: { ...actions, ...customActions },
  getters,
  mutations,
};
