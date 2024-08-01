<template>
  <!-- eslint-disable -->
  <div>
    <q-btn-dropdown split outline v-if="isMultipleCompanies() == true && !dialog /*&& !this.$q.screen.gt.sm*/"
      :label="myCompany !== null ? myCompany.name : 'Loading...'"
      class="ellipsis full-width company-swich">
      <q-list>
        <q-item clickable v-close-popup dense v-for="(company, index) in myCompanies" :disable="company.enabled && company.user.employee_enabled ? false : true
          " :key="index" @click="onCompanySelection(company)">
          <q-item-section>
            <q-item-label lines="1">
              {{ company.alias }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-dialog v-else v-model="dialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row items-center">
          <div class="text-h6">Adicionar dados da Empresa</div>
          <q-space />
        </q-card-section>
        <q-card-section>
          <FormCompany @saved="onSaved" :person="false" :companyFields="companyFields" address="bycep" saveBtn="Salvar" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import FormCompany from "@controleonline/ui-legacy/ui-login/src/components/user/signup/Company";
import { mapActions, mapGetters } from "vuex";
import { LocalStorage } from "quasar";

export default {
  components: {
    FormCompany,
  },
  props: {

  },

  data() {
    return {
      dialog: false,
      myCompanies: []
    };
  },

  created() {
    this.setCompanies(this.companies);
  },

  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
      companies: "people/companies",
      signUpCustomBg: "auth/signUpCustomBg",
      signUpFields: "auth/signUpFields",
    }),
    companyFields() {
      return this.signUpFields?.company || [];
    },
  },

  watch: {
    companies(companies) {
      this.dialog = companies.length > 0 ? false : true;
      this.setCompanies(companies);
    },
  },

  methods: {
    ...mapActions({
      setCompany: "people/currentCompany",
      save: "people/company",
    }),

    onSaved(hasErrors) {
      if (hasErrors == false) {
        //this.dialog = false;
        location.reload();
      }
    },
    isMultipleCompanies() {
      return this.companies.length > 1 ? true : false;
    },
    setCompanies(companies) {
      let session = LocalStorage.has("session") ? LocalStorage.getItem("session") : {};
      let selected = session.mycompany;
      let currentCompany;

      this.myCompanies = [];
      for (let index in companies) {
        let item = companies[index];
        this.myCompanies.push(item);
        if (item.enabled && !selected)
          selected = item;
      }

      if (selected != -1) {
        currentCompany = this.companies.find((companies) => companies.id === selected);
      } else currentCompany = selected;

      if (currentCompany) {
        this.setCompany(currentCompany);
      }
    },


    onCompanySelection(company) {
      this.setCompany(company);
      let session = LocalStorage.has("session") ? LocalStorage.getItem("session") : {};
      session.mycompany = company.id;
      LocalStorage.set("session", session);
    },
  },
};
</script>
<style>
.company-swich button:first-of-type {
  display: none !important;
}
</style>