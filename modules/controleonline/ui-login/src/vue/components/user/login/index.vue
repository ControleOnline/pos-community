<template>
  <q-form @submit="onSubmit" class="q-gutter-y-lg">
    <q-input
      dense
      outlined
      id="inputUsername"
      ref="username"
      v-model="item.username"
      color="primary"
      :label="$tt('login', 'label', 'yourUser')"
    />

    <q-input
      dense
      outlined
      class="q-pt-md"
      :type="isPwd ? 'password' : 'text'"
      id="inputPassword"
      ref="password"
      v-model="item.password"
      :label="$tt('login', 'label', 'yourPass')"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <div class="column q-pt-md">
      <q-btn
        unelevated
        color="primary"
        :loading="isLoading"
        type="submit"
        :label="$tt('login', 'label', 'send')"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},

  data() {
    return {
      recovery: false,
      isPwd: true,
      item: {
        username: null,
        password: null,
      },
    };
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn",
      getUserStatus: "auth/getUserStatus",
    }),

    onSubmit() {
      this.signIn(this.item)
        .then(() => {})
        .catch((error) => {
          this.$q.notify({
            message: this.$tt("login", "message", "invalidUserMessage"),
            position: "bottom",
            type: "negative",
          });
        });
    },

    isInvalid(key) {
      return (val) => {
        if (!(val && val.length > 0))
          return this.$tt("login", "message", "fieldRequired");

        if (key == "password" && val.length < 6)
          return this.$tt("login", "message", "passMessage");

        return true;
      };
    },
    onAuthenticated(user) {
      this.$auth.persist(user);
      this.$emit("logged", user);
    },
  },

  computed: {
    ...mapGetters({
      user: "auth/user",
      isLoggedIn: "auth/isLoggedIn",
      isLoading: "auth/isLoading",
      error: "auth/error",
      violations: "auth/violations",
      defaultCompany: "people/defaultCompany",
    }),
  },

  created() {
    if (this.defaultCompany) {
      this.pageLoading = false;
    }
  },

  watch: {
    isLoggedIn: function (isLoggedIn) {
      if (isLoggedIn === true) {
        this.onAuthenticated(this.user);
      }
    },

    user(user) {
      if (!user) return;
      this.onAuthenticated(user);
    },
  },
};
</script>

<style>
.container {
  width: 408px;
  align-self: center;
}

.login-label {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 0.15px;
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
  content: "";
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}

.separator::before {
  margin-right: 0.5em;
}

.separator::after {
  margin-left: 0.5em;
}

.login-logo-conteiner img {
  max-height: 80px;
  width: revert-layer;
}

.login-logo-conteiner > div > div:nth-child(1) {
  display: none;
}

.login-logo-conteiner .q-img__container {
  position: relative;
}
</style>
