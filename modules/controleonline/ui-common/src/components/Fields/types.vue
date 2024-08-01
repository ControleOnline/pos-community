<template v-if="loaded">
  <DefaultTable :configs="configs" v-if="configs" />
</template>
<script>
import DefaultTable from "@controleonline/ui-default/src/components/Default/DefaultTable";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    DefaultTable,
  },
  props: {
    context: {
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
    }),
    configs() {
      return {
        filters: false,
        store: "extra_fields",
        add: true,
        delete: true,
        selection: false,
        search: false,
      };
    },
  },
  data() {
    return {
      loaded: null,
    };
  },
  created() {
    let filters = {
      context: this.context,
    };
    this.$store.commit(this.configs.store + "/SET_FILTERS", filters);
    this.loaded = true;
  },
  methods: {},
};
</script>
