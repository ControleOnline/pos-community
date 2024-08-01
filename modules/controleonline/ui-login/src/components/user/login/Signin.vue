<template>
  <q-form @submit="onSubmit" class="q-gutter-y-lg">
    <q-input dense outlined id="inputUsername" ref="username" v-model="item.username" color="primary"
      :label="$t('login.yourUser')" />

    <q-input dense outlined class="q-pt-md" :type="isPwd ? 'password' : 'text'" id="inputPassword" ref="password"
      v-model="item.password" :label="$t('login.yourPass')">
      <template v-slot:append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <div class="column q-pt-md">
      <q-btn unelevated color="primary" :loading="isLoading" type="submit" :label="$t('login.send')" />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isPwd: true,
      item: {
        username: null,
        password: null,
      },
    };
  },

  computed: {
    ...mapGetters({
      user: "auth/user",
      isLoggedIn: "auth/isLoggedIn",
      isLoading: "auth/isLoading",
      error: "auth/error",
      violations: "auth/violations",
    }),
  },

  watch: {
    isLoggedIn: function (isLoggedIn) {      
      if (isLoggedIn === true) {
        this.$emit("authenticated", this.user);
      }
    },

    user(user) {      
      if (!user) return;
      if (this.$store.getters["auth/user"] !== null) {
        this.$emit("authenticated", this.$store.getters["auth/user"]);
      }
    },

    error(message) {
      /**
       * Por algum motivo quando dá erro 401 em producao,
       * não retorna junto com o codigo a mensagem 'Unauthorized',
       * por isso nao mostra a mensagem de erro
       * @todo investigar motivo
       */
      /*
      if (message) {
        if (message == 'Unauthorized')
          message = 'Usuário ou senha não é válido';

        this.$q.notify({
          message : message,
          position: 'bottom',
          type    : 'negative',
          closeBtn: this.$t('common.labels.close')
        });
      }
      */
    },
  },

  methods: {
    ...mapActions({
      signIn: "auth/signIn",
      getUserStatus: "auth/getUserStatus",
    }),

    onSubmit() {
      this.signIn(this.item).then(()=>{
        
      }).catch((error) => {
        this.$q.notify({
          message: this.$t("login.invalidUserMessage"),
          position: "bottom",
          type: "negative",
        });
      });
    },

    isInvalid(key) {
      return (val) => {
        if (!(val && val.length > 0)) return this.$t("messages.fieldRequired");

        if (key == "password" && val.length < 6) return this.$t("login.passMessage");

        return true;
      };
    },

  },
};
</script>
