import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";

export default {
  namespaced: true,
  state: {
 item:{},
items:[],
    resourceEndpoint: "imports",
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
        externalFilter: false,
        sortable: true,
        name: "field_name",
        align: "left",
        label: "field_name",
        sum: false,
        format: function (value) {
          return value;
        },
      },
      {
        externalFilter: false,
        sortable: true,
        name: "field_type",
        align: "left",
        label: "field_type",
        sum: false,
        list: [
          { value: "text", label: "text" },
          { value: "select", label: "select" },
          { value: "date-range", label: "date-range" },
        ],
        format: function (value) {
          return value;
        },
      },
      {
        externalFilter: false,
        sortable: true,
        name: "required",
        align: "left",
        label: "required",
        sum: false,
        format: function (value) {
          return value;
        },
        saveFormat: function (value) {
          return false;
        },
      },
      {
        externalFilter: false,
        sortable: true,
        name: "field_configs",
        align: "left",
        label: "field_configs",
        sum: false,
        format: function (value) {
          return value;
        },
      },
    ],
  },
  actions: actions,
  getters,
  mutations,
};
