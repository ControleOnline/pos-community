import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";


export default {
  namespaced: true,
  state: {
    resourceEndpoint: "statuses",
    isLoading: false,
    error: "",
    violations: null,
    totalItems: 0,
    filters: {},
    columns: [
      {
        editable: false,
        isIdentity: true,
        sortable: true,
        name: "id",
        align: "left",
        label: "id",
        sum: false,
        format: function (value) {
          return "#" + value;
        },
      },
      {
        externalFilter: true,
        sortable: true,
        name: "status",
        align: "left",
        label: "status",
        sum: false,
        format: function (value) {
          return value;
        },
      },
      {
        sortable: true,
        name: "color",
        align: "left",
        label: "color",
        format: function (value) {
          return value;
        },
      },
      {
        sortable: true,
        name: "realStatus",
        align: "left",
        label: "realStatus",
        format: function (value) {
          return value;
        },
      }
    ],
  },
  actions: actions,
  getters,
  mutations,
};
