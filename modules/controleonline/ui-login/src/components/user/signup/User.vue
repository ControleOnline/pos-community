<template>
  <q-form @submit="save" ref="myForm">
    <div class="row q-col-gutter-xs q-pb-xs">
      <div v-if="hasUserField('name')" class="col-xs-12 col-sm-6 q-mb-md">
        <label class="q-input-label">{{ $t("login.name") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.name"
          type="text"
          :placeholder="$t('login.enterYourName')"
          :rules="[isInvalid('name')]"
        />
      </div>
      <div v-if="hasUserField('phone')" class="col-xs-12 col-sm-6 q-mb-md">
        <label class="q-input-label">{{ $t("login.phone") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          unmasked-value
          v-model="item.phone"
          type="text"
          mask="(##) #####-####"
          :placeholder="$t('login.enterYourPhone')"
          :rules="[isInvalid('phone')]"
        />
      </div>
    </div>

    <div class="row q-col-gutter-xs q-pb-xs">
      <div v-if="hasUserField('email')" class="col-xs-12">
        <label class="q-input-label">{{ $t("login.email") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.email"
          type="text"
          :placeholder="$t('login.enterYourEmail')"
          class="q-mb-md"
          :rules="[isInvalid('email')]"
        />
      </div>
      <div v-if="hasUserField('confirmEmail')" class="col-xs-12">
        <label class="q-input-label">{{ $t("login.confirmEmail") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.confirmEmail"
          type="text"
          :placeholder="$t('login.enterYourEmail')"
          class="q-mb-md"
          :rules="[isInvalid('confirmEmail')]"
        />
      </div>
    </div>

    <label v-if="hasUserField('username')" class="q-input-label">
      {{ $t("login.username") }}
    </label>
    <q-input
      dense
      outlined
      v-if="hasUserField('username')"
      stack-label
      lazy-rules
      reverse-fill-mask
      v-model="item.username"
      type="text"
      :placeholder="$t('login.enterYourUsername')"
      class="q-mb-md"
      mask="x"
      :rules="[isInvalid('username')]"
      :hint="$t('login.usernameMessage')"
    />

    <div class="row q-col-gutter-xs q-pb-xs">
      <div v-if="hasUserField('password')" class="col-xs-12">
        <label class="q-input-label">{{ $t("login.password") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.password"
          type="password"
          :placeholder="$t('login.enterYourPass')"
          :rules="[isInvalid('password')]"
          :hint="$t('login.passMessage')"
        />
      </div>
      <div v-if="hasUserField('confirmPassword')" class="col-xs-12">
        <label class="q-input-label">{{ $t("login.confirm") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.confirmPassword"
          type="password"
          :placeholder="$t('login.confirmYourPass')"
          :rules="[isInvalid('confirm')]"
        />
      </div>
    </div>

    <div class="row justify-end">
      <q-btn
        type="submit"
        color="primary"
        :label="$t('login.continue')"
        :loading="isLoading"
        class="q-mt-md signup-submit-button"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    userFields: {
      type: Array,
      required: true,
    },
    contact: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      item: {
        name: this.contact.name,
        username: null,
        phone: this.contact.phone,
        email: this.contact.email,
        confirmEmail: "",
        password: null,
        confirmPassword: null,
      },
    };
  },

  computed: {
    ...mapGetters({
      isLoading: "auth/isLoading",
      error: "auth/error",
      violations: "auth/violations",
      created: "auth/created",
    }),
  },

  watch: {
    created(newUser) {
      if (newUser && newUser.token) {
        this.$emit("saved", false);
      }
    },
  },

  methods: {
    ...mapActions({
      signup: "auth/signUp",
    }),

    hasUserField(field) {
      var fields = this.userFields || [];
      return fields.indexOf(field) > -1;
    },

    save() {
      this.signup({
        name: this.item.name,
        username: this.item.username,
        ddd: this.item.phone.substr(0, 2),
        phone: this.item.phone.substr(2),
        email: this.item.email,
        password: this.item.password,
        confirmPassword: this.hasUserField("confirmPassword")
          ? this.item.confirmPassword
          : this.item.password,
      })
        .then((response) => {
          let formHasErrors = !(response && response.success === true);

          if (formHasErrors) this.notifyError(response.error);
        })
        .catch((error) => {
          let formHasErrors = true;

          this.$emit("saved", formHasErrors);

          this.notifyError(error.message);
        });
    },

    notifyError(message) {
      if (/password: This password has been leaked in a data breach/gi.test(message))
        message = this.$t("login.weakPass");
      else if (/This account already exists/gi.test(message))
        message = this.$t("login.duplicateEmail");
      else if (/This user already exists/gi.test(message))
        message = this.$t("login.duplicateUser");

      this.$q.notify({
        message: message,
        position: "bottom",
        type: "negative",
      });
    },

    isInvalid(key) {
      return (val) => {
        if (!(val && val.length > 0)) return this.$t("messages.fieldRequired");

        if (key == "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$t("messages.emailInvalid");

        if (key == "phone" && !/^\d{10,11}$/.test(val))
          return this.$t("messages.phoneInvalid");

        if (key == "password" && val.length < 6) return this.$t("login.passMessage");

        if (
          key == "confirmEmail" &&
          this.hasUserField("email") &&
          this.item.email != this.item.confirmEmail
        )
          return this.$t("login.passNoMatch");

        if (
          key == "confirm" &&
          this.hasUserField("password") &&
          this.item.password != this.item.confirmPassword
        )
          return this.$t("login.passNoMatch");

        return true;
      };
    },
  },
};
</script>
