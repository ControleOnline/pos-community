<template>
  <div v-if="haveOauth">
    <div class="separator">{{ $tt("login", "message", "or") }}</div>
    <div class="row q-px-md q-gutter-y-sm q-pa-lg">
      <div class="row col-5"></div>
      <Google />
      <div class="row col-5"></div>
    </div>
  </div>
</template>
<script>

import Google from "./Google.vue";

export default {
  components: {
    Google,
  },
  data() {
    return {
      googleClientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
    };
  },
  computed: {
    haveOauth() {
      return this.googleClientId;
    },
  },
};
</script>
