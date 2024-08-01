<template>
  <q-page class="row justify-center">
    <!-- LOGIN FORM -->
    <LoginPage :signinDialogStatus="dialogs.signup.visible" @logged="onLogged" @signup="onSignUp" />

    <!-- SIGNUP STEP TO STEP -->
    <q-dialog maximized no-backdrop-dismiss v-model="dialogs.signup.visible" transition-show="slide-left"
      transition-hide="slide-right">
      <SignUpPage @created="onCreated" @company="onCompany" @registered="onRegistered"
        @signIn="dialogs.signup.visible = false" :signUpFields="signUpFields" :defaultCompany="defaultCompany" />
    </q-dialog>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapActions, mapGetters } from "vuex";
import LoginPage from "../components/user/login/Index.vue";
import SignUpPage from "../components/user/signup/Index.vue";


export default {
  name: "PageIndex",

  components: {
    LoginPage,
    SignUpPage,
  },

  data() {
    return {
      dialogs: {
        signup: {
          visible: false,
        },
      },
    };
  },

  computed: {
    ...mapGetters({
      indexRoute: "auth/indexRoute",
      signUpFields: "auth/signUpFields",
      defaultCompany: "people/defaultCompany",
    }),



    logged() {
      return this.$store.getters["auth/user"];
    },
  },

  mounted() {
    if (this.isLogged()) {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);
      } else {
        this.goToIndexRoute();
      }
    }
  },

  methods: {

    isLogged() {
      return this.$store.getters["auth/user"] !== null && this.$store.getters["auth/user"].username;
    },
    goToIndexRoute() {
      this.$router.push({ name: 'HomeIndex' });
    },

    // when user logged is succeeded

    onLogged(user) {
      if (this.isLogged()) {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.goToIndexRoute();
        }
      }
    },

    // when request signup

    onSignUp() {
      this.showDialog("signup");
    },

    // when user created signup step 1

    onCreated(user) {
      this.$store.dispatch("auth/logIn");

      if (this.isLogged()) {
        this.$q.notify({
          message: `Agora você esta logado como "${user.username}"`,
          position: "top",
          type: "positive",
        });
      }
    },

    // when company created signup step 2

    onCompany(company) {
      // refresh company id if not defined

      if (LocalStorage.has("session")) {
        let storedUser = LocalStorage.getItem("session");

        if (!storedUser.company) {
          storedUser.company = company.id;

          LocalStorage.set("session", storedUser);
        }
      }
    },

    // when signup process is finished

    onRegistered(user) {
      this.$q.notify({
        message: "Seu cadastro foi realizado com sucesso",
        position: "bottom",
        type: "positive",
      });

      if (this.isLogged()) {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.goToIndexRoute();
        }
      } else {
        this.goToIndexRoute();
      }
    },

    showDialog(name) {
      if (name !== false) {
        this.dialogs[name].visible = true;
      }

      // hide all opened dialogs

      let time = name === false ? 0 : 600;

      setTimeout(() => {
        for (let dialogName in this.dialogs) {
          if (dialogName !== name && this.dialogs[dialogName].visible)
            this.dialogs[dialogName].visible = false;
        }
      }, time);
    },


  },
};
</script>
