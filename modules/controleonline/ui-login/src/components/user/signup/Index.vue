<template>
  <div :class="'signup-page' + (background() !== null ? '' : ' ')" :style="style()">
    <div class="signup-container">
      <div class="text-right full-width">
        <h5 class="signup-app-name">{{ $t("app.name") }}</h5>
      </div>

      <q-card class="signup-page-card">
        <q-card-section>
          <div class="text-h6">
            <h4 class="signup-label">{{ $t("Crie sua conta") }}</h4>
          </div>
        </q-card-section>

        <q-card-section>
          <q-stepper v-if="userFields.length > 0 && companyFields.length > 0" animated alternative-labels header-nav flat
            v-model="current" ref="stepper" color="primary" :vertical="$q.screen.lt.sm">
            <q-step :header-nav="false" name="create_user" title="Informe seus dados de usuário" icon="face"
              :done="steps.create_user.hasErrors === false" :error="steps.create_user.hasErrors === true">
              <UserForm ref="userForm" :userFields="userFields" :contact="order.contact" @saved="goToNext" />
            </q-step>

            <q-step :header-nav="false" name="create_company" title="Cadastre seus dados comerciais" icon="business"
              :done="steps.create_company.hasErrors === false" :error="steps.create_company.hasErrors === true">
              <CompanyForm ref="companyForm" :companyFields="companyFields" :origin="order.address.origin"
                @saved="goToNext" />
            </q-step>
          </q-stepper>

          <UserForm v-else-if="userFields.length > 0" ref="userForm" :userFields="userFields" :contact="order.contact"
            @saved="goToNext" />

          <CompanyForm v-else-if="companyFields.length > 0" ref="companyForm" :companyFields="companyFields"
            :origin="order.address.origin" @saved="goToNext" />
        </q-card-section>

        <label class="signin-link-label" v-if="$t('login.signinLabel') !== 'login.signinLabel'">
          {{ $t("login.signinLabel") }}
        </label>
        <q-card-actions align="left" class="q-pa-md">
          <a href="#" class="signin-link" @click="onSignIn">
            {{ $t("login.signin") }}
          </a>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CompanyForm from "./Company";
import UserForm from "./User";

export default {
  components: {
    UserForm,
    CompanyForm,
  },

  props: {
    signUpFields: {
      type: Object,
      required: true,
    },

    order: {
      type: Object,
      required: false,
      default: () => {
        return {
          address: {
            origin: {
              country: "",
              state: "",
              city: "",
              district: "",
              address: "",
              postalCode: "",
              street: "",
              number: "",
              complement: "",
            },
          },
          contact: {
            name: "",
            email: "",
            phone: "",
          },
        };
      },
    },
  },

  created() {
    if (this.isLogged() && this.logged.company === null) {
      this.current = "create_company";
    }
  },

  computed: {
    ...mapGetters({
      newUser: "auth/created",
      newCompany: "people/company",
      signUpCustomBg: "auth/signUpCustomBg",
      defaultCompany: "people/defaultCompany",

    }),



    logged() {
      return this.$store.getters["auth/user"];
    },

    userFields() {
      return this.signUpFields?.username || [];
    },

    companyFields() {
      return this.signUpFields?.company || [];
    },
  },

  watch: {
    newUser(user) {
      if (user && user.token) this.$emit("created", user);
    },

    newCompany(company) {
      if (company && company.id) this.$emit("company", company);
    },
  },

  data() {
    return {
      current: "create_user",
      steps: {
        create_user: {
          hasErrors: null,
        },
        create_company: {
          hasErrors: null,
        },
      },
    };
  },

  methods: {
    isLogged() {
      return (
        this.$store.getters["auth/user"] !== null &&
        this.$store.getters["auth/user"].username
      );
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
      if (this.signUpCustomBg === true) {
        return '//' + this.defaultCompany.theme.background.domain + this.defaultCompany.theme.background.url
      } else if (typeof this.signUpCustomBg === "string") {
        return this.signUpCustomBg;
      }
      return null;
    },

    onSignIn() {
      this.$emit("signIn");
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
