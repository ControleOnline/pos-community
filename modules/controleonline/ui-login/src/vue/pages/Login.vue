<template>
  <q-page class="row justify-center">
    <div class="container text-center q-gutter-y-md">
      <div class="login-logo-conteiner q-pa-lg">
        <q-img
          v-if="defaultCompany.logo"
          :src="'//' + defaultCompany.logo.domain + defaultCompany.logo.url"
          class=""
        />
      </div>
      <q-card class="q-mb-lg q-pa-md">
        <q-card-section class="q-pt-md">
          <div class="text-h6">
            <h4 class="q-ma-none login-label">
              {{ $tt("login", "label", "title") }}
            </h4>
          </div>
        </q-card-section>

        <q-card-section>
          <LoginPage v-if="$route.name == 'LoginIndex'" @logged="onLogged" />
          <SignUpPage
            v-if="$route.name == 'CreateUserIndex'"
            @created="onCreated"
            @company="onCompany"
            @logged="onLogged"
            :defaultCompany="defaultCompany"
          />
          <RecoveryPassword v-if="$route.name == 'ForgotPassword'" />
        </q-card-section>

        <div class="column q-px-md q-gutter-y-sm">
          <q-btn
            v-if="$route.name != 'CreateUserIndex'"
            unelevated
            color="grey-7"
            outline
            :label="$tt('login', 'label', 'register')"
            :to="{ name: 'CreateUserIndex' }"
          />

          <q-btn
            v-if="$route.name != 'LoginIndex'"
            unelevated
            color="grey-7"
            outline
            :label="$tt('login', 'label', 'login')"
            :to="{ name: 'LoginIndex' }"
          />

          <q-btn
            v-if="$route.name != 'ForgotPassword'"
            style="
              color: #19afbd;
              text-transform: none;
              text-decoration: underline;
            "
            :label="$tt('login', 'label', 'forgotPassword')"
            flat
            :to="{ name: 'ForgotPassword' }"
          />
        </div>
        <Oauth />
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LoginPage from "../components/user/login";
import SignUpPage from "../components/user/signup";
import RecoveryPassword from "../components/user/recovery";
import Oauth from "../components/oauth/Oauth";

export default {
  name: "PageIndex",

  components: {
    LoginPage,
    SignUpPage,
    RecoveryPassword,
    Oauth,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters({
      indexRoute: "auth/indexRoute",
      defaultCompany: "people/defaultCompany",
    }),
  },

  mounted() {
    if (this.$auth.isLogged) {
      if (this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);
      } else {
        this.goToIndexRoute();
      }
    }
  },

  methods: {
    goToIndexRoute() {
      this.$router.push({ name: "HomeIndex" });
    },

    onLogged(user) {
      if (this.$auth.isLogged) {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          this.goToIndexRoute();
        }
      }
    },

    onCompany(company) {
      if (localStorage.getItem("session")) {
        let storedUser = JSON.parse(localStorage.getItem("session"));

        if (!storedUser.company) {
          storedUser.company = company.id;

          localStorage.setItem("session", JSON.stringify(storedUser));
        }
      }
    },
  },
};
</script>