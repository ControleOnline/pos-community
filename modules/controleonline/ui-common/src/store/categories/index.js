import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";

export default {
  namespaced: true,
  state: {
    item: {},
    items: [],
    filters: {},
    resourceEndpoint: "categories",
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
        name: "name",
        align: "left",
        label: "name",
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
        inputType: "color",
        format: function (value) {
          return value;
        },
      },
      {
        sortable: true,
        name: "icon",
        align: "left",
        label: "icon",
        inputType: "icon",
        format: function (value) {
          return value;
        },
      },
      {
        sortable: true,
        name: "categoryFiles",
        align: "left",
        label: "categoryFiles",
        format: function (value) {
          return value;
        },
      },
      {
        externalFilter: false,
        sortable: true,
        name: "parent",
        align: "left",
        label: "parent",
        list: "categories/getItems",
        searchParam: "name",
        format: function (value) {
          return value?.name;
        },
        saveFormat: function (value) {
          return value ? "/categories/" + (value.value || value) : null;
        },

      },
    ],
  },
  actions: actions,
  getters,
  mutations,
};
