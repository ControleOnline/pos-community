<template>
  <DefaultTable :configs="configs" v-if="loaded" />
</template>
<script>

import { mapActions, mapGetters } from "vuex";
export default {
  components: {

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
      loaded: false,
    };
  },
  created() {
    let filters = {
      context: this.context,
    };
    this.$store.commit(this.configs.store + "/SET_FILTERS", filters);
    this.loaded = true;
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>
