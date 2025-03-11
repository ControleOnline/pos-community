<template>
  <div class="row col-2" v-if="googleClientId">
    <q-btn
      round
      @click="loginWithGoogle"
      color="white"
      unelevated
      :loading="isLoading"
    >
      <q-avatar size="42px">
        <img v-if="isLoading" src="../../assets/oauth/google/loading.webp" />
        <img v-else src="../../assets/oauth/google/logo.svg" />
      </q-avatar>
      <q-tooltip>
        {{ tt("login", "message", "with_google") }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      googleClientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
    };
  },

  computed: {
    ...mapGetters({
      isLoading: "auth/isLoading",
    }),
  },
  watch: {},
  methods: {
    ...mapActions({
      gSignIn: "auth/gSignIn",
      getUserStatus: "auth/getUserStatus",
    }),
    async loginWithGoogle() {
      try {
        await this.initGoogleAuth(); // Ensure gapi.auth2 is initialized
        const auth2 = gapi.auth2.getAuthInstance();
        const googleUser = await auth2.signIn();
        const response = await googleUser.getAuthResponse();
        const reloadResponse = await googleUser.reloadAuthResponse();

        this.gSignIn({ access_token: reloadResponse.access_token })
          .then((data) => {})
          .catch((e) => {});
      } catch (error) {
        // Error occurred during sign-in
        console.error(error);
      }
    },
    async initGoogleAuth() {
      return new Promise((resolve, reject) => {
        gapi.load("auth2", () => {
          gapi.auth2
            .init({
              client_id: this.googleClientId,
            })
            .then(() => {
              resolve(); // Resolve the promise once gapi.auth2 is initialized
            })
            .catch((error) => {
              reject(error); // Reject the promise if initialization fails
            });
        });
      });
    },
  },
};
</script>
