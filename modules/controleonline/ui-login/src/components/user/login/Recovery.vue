<template>
  <div class="text-center">
    <div class="text-body2">{{ $t('login.rememberDesc' ) }}</div>

    <q-form @submit="onSubmit" class="q-mt-md">

      <q-input
      dense
      outlined  stack-label
        ref    ="email"
        v-model="item.username"
        type   ="text"
        :label ="$t('login.yourUsername')"
        class  ="q-mt-md"
        :rules ="[isInvalid('username')]"
      />

      <q-input
      dense
      outlined  stack-label
        ref    ="email"
        v-model="item.email"
        type   ="email"
        :label ="$t('login.yourEmail')"
        class  ="q-mt-md"
        :rules ="[isInvalid('email')]"
      />

      <q-btn
        type    ="submit"
        :label  ="$t('login.send')"
        size    ="lg"
        color   ="primary"
        class   ="full-width q-mt-md"
        :loading="isLoading"
      />
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      item: {
        username: '',
        email   : '',
      }
    };
  },

  computed: {
    ...mapGetters({
      isLoading: 'user/isLoading',
    }),
  },

  methods: {
    ...mapActions({
      recovery: 'user/passwordRecovery',
    }),

    onSubmit () {
      this.$refs.email.validate();

      if (this.$refs.email.hasError) {
        return;
      }

      this.recovery(this.item)
        .then(data => {
          if (data.success === true) {
            this.$q.notify({
              message : 'Sua solicitação foi enviada com sucesso',
              position: 'bottom',
              type    : 'positive',
            });
          }
          else {
            if (data.success === false && data.error)
              this.$q.notify({
                message : data.error,
                position: 'bottom',
                type    : 'negative',
              });
          }
        })
        .catch(error => {
          this.$q.notify({
            message : 'Ocorreu um erro no envio da solicitação',
            position: 'bottom',
            type    : 'negative',
          });
        });
    },

    isInvalid(key) {
      return val => {

        if (!(val && val.length > 0))
          return this.$t('messages.fieldRequired');
        if (key == 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$t('messages.emailInvalid');

        return true;
      };
    },
  },
};
</script>
