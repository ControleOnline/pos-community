<template>
  <q-form @submit="save" ref="myForm">
    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12">
        <label class="q-input-label">{{ $tt("login", "label", "name") }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.name"
          type="text"
          :placeholder="$tt('login', 'label', 'enterYourName')"
          :rules="[isInvalid('name')]"
        />
      </div>
    </div>

    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12">
        <label class="q-input-label">{{
          $tt("login", "label", "email")
        }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.email"
          type="text"
          :placeholder="$tt('login', 'label', 'enterYourEmail')"
          class="q-mb-md"
          :rules="[isInvalid('email')]"
        />
      </div>
      <div class="col-xs-12">
        <label class="q-input-label">{{
          $tt("login", "label", "confirmEmail")
        }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.confirmEmail"
          type="text"
          :placeholder="$tt('login', 'label', 'enterYourEmail')"
          class="q-mb-md"
          :rules="[isInvalid('confirmEmail')]"
        />
      </div>
    </div>

    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12">
        <label class="q-input-label">{{
          $tt("login", "label", "password")
        }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.password"
          type="password"
          :placeholder="$tt('login', 'label', 'enterYourPass')"
          :rules="[isInvalid('password')]"
          :hint="$tt('login', 'label', 'passMessage')"
        />
      </div>
      <div class="col-xs-12">
        <label class="q-input-label">{{
          $tt("login", "label", "confirm")
        }}</label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.confirmPassword"
          type="password"
          :placeholder="$tt('login', 'label', 'confirmYourPass')"
          :rules="[isInvalid('confirm')]"
        />
      </div>
    </div>

    <div class="row justify-end">
      <q-btn
        type="submit"
        color="primary"
        :label="$tt('login', 'label', 'continue')"
        :loading="isLoading"
        class="q-mt-md signup-submit-button"
      />
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},

  created() {
    if (this.$auth.isLogged() && this.$auth.user.company === null) {
      this.current = "create_company";
    }
  },

  computed: {
    ...mapGetters({
      newUser: "auth/created",
      newCompany: "people/company",
      defaultCompany: "people/defaultCompany",
      isLoading: "auth/isLoading",
      error: "auth/error",
      violations: "auth/violations",
      created: "auth/created",
    }),
  },

  watch: {
    newUser(user) {
      if (user && user.api_key) this.$emit("created", user);
    },
    created(newUser) {
      if (newUser && newUser.api_key) {
        this.$emit("saved", false);
      }
    },
    newCompany(company) {
      if (company && company.id) this.$emit("company", company);
    },
  },

  data() {
    return {
      item: {
        name: null,
        email: null,
        confirmEmail: "",
        password: null,
        confirmPassword: null,
      },
    };
  },

  methods: {
    ...mapActions({
      signup: "auth/signUp",
    }),

    save() {
      this.signup({
        name: this.item.name,
        email: this.item.email,
        password: this.item.password,
        confirmPassword: this.item.confirmPassword,
      })
        .then((response) => {
          let formHasErrors = !(response && response.success === true);

          if (formHasErrors) this.notifyError(response.error);

          if (response.data) this.$emit("logged", response.data);
        })
        .catch((error) => {
          let formHasErrors = true;

          this.$emit("saved", formHasErrors);

          this.notifyError(error.message);
        });
    },

    notifyError(message) {
      if (
        /password: This password has been leaked in a data breach/gi.test(
          message
        )
      )
        message = this.$tt("login", "label", "weakPass");
      else if (/This account already exists/gi.test(message))
        message = this.$tt("login", "label", "duplicateEmail");
      else if (/This user already exists/gi.test(message))
        message = this.$tt("login", "label", "duplicateUser");

      this.$q.notify({
        message: message,
        position: "bottom",
        type: "negative",
      });
    },

    isInvalid(key) {
      return (val) => {
        if (!(val && val.length > 0))
          return this.$tt("login", "label", "fieldRequired");

        if (key == "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$tt("login", "label", "emailInvalid");

        if (key == "phone" && !/^\d{10,11}$/.test(val))
          return this.$tt("login", "label", "phoneInvalid");

        if (key == "password" && val.length < 6)
          return this.$tt("login", "label", "passMessage");

        if (key == "confirmEmail" && this.item.email != this.item.confirmEmail)
          return this.$tt("login", "label", "passNoMatch");

        if (key == "confirm" && this.item.password != this.item.confirmPassword)
          return this.$tt("login", "label", "passNoMatch");

        return true;
      };
    },

    goToNext(formHasErrors) {
      this.steps[this.current].hasErrors = formHasErrors;

      // if has no errors

      if (!formHasErrors) {
        if (this.current == "create_user") {
          if (this.$store.getters["auth/created"] !== null) {
            if (this.$store.getters["auth/created"].company !== null) {
              this.$emit("registered");
              return;
            }
          }

          this.$refs.stepper.next();
        } else {
          if (this.current == "create_company") {
            this.$emit("registered");
          }
        }
      }
    },

    style() {
      if (this.background()) {
        return `
          background-image: url('${this.background()}');
        `;
      }
      return "";
    },

    background() {
      return (
        "//" +
        this.defaultCompany.theme.background.domain +
        this.defaultCompany.theme.background.url
      );
    },
  },
};
</script>

<style lang="stylus" scoped>
.signup-page
  background-position: center
  background-repeat  : no-repeat
  background-size    : cover
  padding-left       : 30px
  padding-right      : 30px

.signup-page-card
  width: 100%;

@media (max-width: $breakpoint-xs-max)
  .signup-page
    padding-left : 20px
    padding-right: 20px
</style>
