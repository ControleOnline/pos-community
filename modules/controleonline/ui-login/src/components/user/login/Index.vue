<template>
  <div class="container text-center q-gutter-y-md">
    <div class="login-logo-conteiner q-pa-lg">
      <q-img v-if="defaultCompany.logo" :src="'//' + defaultCompany.logo.domain + defaultCompany.logo.url" class="" />
    </div>
    <q-card class="q-mb-lg">
      <q-card-section class="q-pt-md">
        <div class="text-h6">
          <h4 class="q-ma-none login-label">{{ $t("login.title") }}</h4>
        </div>
      </q-card-section>

      <q-card-section>
        <LoginForm @authenticated="onAuthenticated" />
      </q-card-section>

      <div class="column q-px-md q-gutter-y-sm q-pb-xS">
        <q-btn unelevated color="grey-7" outline :label="$t('login.register')" v-if="signinDialogStatus === false"
          @click="onSignUp" />
        <q-btn style="color: #19AFBD; text-transform: none; text-decoration: underline;" label="Esqueci a senha" flat
          @click="recovery = !recovery" />
      </div>
      <div class="separator">{{ $t("login.or") }}</div>
      <div class="row q-px-md q-gutter-y-sm q-pa-lg">
        <div class="row col-5">
        </div>
        <Glogin />
        <div class="row col-5">
        </div>
      </div>
    </q-card>

    <q-dialog no-backdrop-dismiss v-model="recovery" transition-show="scale" transition-hide="scale">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t("login.dontRemember") }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <RecoveryForm />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RecoveryForm from "./Recovery";
import LoginForm from "./Signin";
import Glogin from "../../oauth/google/Signin"

export default {
  components: {
    LoginForm,
    RecoveryForm,
    Glogin
  },

  props: {
    signinDialogStatus: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      recovery: false,
    };
  },

  methods: {
    onAuthenticated(user) {
      this.$emit("logged", user);
    },
    onSignUp() {
      this.$emit("signup");
    },
  },

  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
  },

  created() {
    if (this.defaultCompany) {
      this.pageLoading = false;
    }
  },
};
</script>

<style>
.container {
  width: 408px;
  align-self: center;
}


.login-label {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
}

@media (max-width: 500px) {
  .container {
    width: 300px;
    align-self: center;
  }
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #E0E0E0;
}

.separator::before {
  margin-right: .5em;
}

.separator::after {
  margin-left: .5em;
}

.login-logo-conteiner img {
  max-height: 80px;
  width: revert-layer;
}

.login-logo-conteiner>div>div:nth-child(1) {
  display: none;
}

.login-logo-conteiner .q-img__container {
  position: relative;
}
</style>
