import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";

export default {
  namespaced: true,
  state: {
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
        externalFilter: true,
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
        format: function (value) {
          return value;
        },
      },
      {
        sortable: true,
        name: "icon",
        align: "left",
        label: "icon",
        format: function (value) {
          return value;
        },
      },
      {
        externalFilter: true,
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
        formatList: function (value) {
          return value
            ? {
                label: value?.name,
                value: value?.id,
              }
            : null;
        },
      },
    ],
  },
  actions: actions,
  getters,
  mutations,
};
