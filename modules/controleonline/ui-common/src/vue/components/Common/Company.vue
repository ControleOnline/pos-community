<template>
  <q-form @submit="save" ref="myForm">
    <label class="q-input-label">
      {{ personType == "PJ" ? $t("CNPJ") : $t("CPF") }}
    </label>
    <q-input
      dense
      outlined
      stack-label
      lazy-rules
      unmasked-value
      v-model="item.people_document"
      type="text"
      :mask="personType == 'PJ' ? '##.###.###/####-##' : '###.###.###-##'"
      :placeholder="personType == 'PJ' ? 'Digite o CNPJ' : 'Digite o CPF'"
      :rules="[isInvalid('document')]"
      class="q-mb-sm"
    />

    <div class="row q-col-gutter-xs q-pb-xs">
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <label class="q-input-label">
          {{ personType == "PJ" ? $t("Razão social") : $t("Nome") }}
        </label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.name"
          type="text"
          :placeholder="
            personType == 'PJ' ? 'Digite a Razão social' : 'Digite seu nome'
          "
          :rules="[isInvalid('name')]"
        />
      </div>
      <div class="col-xs-12 col-sm-6 q-mb-sm">
        <label class="q-input-label">
          {{ personType == "PJ" ? $t("Nome Fantasia") : $t("Sobrenome") }}
        </label>
        <q-input
          dense
          outlined
          stack-label
          lazy-rules
          v-model="item.alias"
          type="text"
          :placeholder="
            personType == 'PJ'
              ? 'Digite o Nome fantasia'
              : 'Digite seu sobrenome'
          "
          :rules="[isInvalid('alias')]"
        />
      </div>
    </div>

    <div class="row justify-end">
      <q-btn
        type="submit"
        color="primary"
        icon="save"
        label="Finalizar"
        :loading="isLoading"
        class="q-mt-md signup-submit-button"
      />
    </div>
  </q-form>
</template>

<script>
import ListAutocomplete from "@controleonline/ui-common/src/vue/components/Common/ListAutocomplete.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ListAutocomplete,
  },

  props: {
    companyFields: {
      type: Array,
      required: true,
    },
    origin: {
      type: Object,
      required: false,
      default: null,
    },
    person: {
      type: Boolean,
      required: false,
      default: true,
    },
    address: {
      type: String,
      required: false,
      default: "gmaps",
    },
  },

  data() {
    return {
      isSearching: false,
      personType: "PJ",
      loading: false,
      item: {
        name: null,
        alias: null,
        people_document: null,
        link: "/people/" + this.$auth.user.id,
        link_type: "employee",
        peopleType: "J",
      },
    };
  },

  computed: {
    ...mapGetters({
      isLoading: "people/isLoading",
      error: "people/error",
      violations: "people/violations",
      retrieved: "people/retrieved",
    }),
  },

  methods: {
    ...mapActions({
      company: "people/company",
      geoplace: "gmaps/geoplace",
      getAddress: "gmaps/getAddressByCEP",
    }),

    searchByCEP(cep) {
      if (cep.length == 8) {
        this.loading = true;

        this.getAddress(cep)
          .then((address) => {
            if (address["@id"]) {
              this.item.address.country = address.country;
              this.item.address.state = address.state;
              this.item.address.city = address.city;
              this.item.address.district = address.district;
              this.item.address.street = address.street;
              this.item.address.number = address.number;
            }
          })

          .finally(() => {
            this.loading = false;
          });
      }
    },

    save() {
      this.company(this.item)
        .then((response) => {
          this.$emit("saved", response);
        })
        .catch((error) => {
          this.notifyError(error.message);
        });
    },

    notifyError(message) {
      if (/This company already exists/gi.test(message))
        message = this.$t("Esta empresa já esta cadastrada");

      this.$q.notify({
        message: message,
        position: "bottom",
        type: "negative",
      });
    },

    getGeoPlaces(input) {
      this.isSearching = true;

      return this.geoplace({ input })
        .then((result) => {
          if (result.success) {
            let items = [];
            for (let i = 0; i < result.data.length; i++) {
              items.push({
                label: result.data[i].description,
                value: result.data[i],
              });
            }
            return items;
          }
        })
        .finally(() => {
          this.isSearching = false;
        });
    },

    onSelect(item) {
      this.item.address.country = item.country;
      this.item.address.state = item.state;
      this.item.address.city = item.city;
      this.item.address.district = item.district;
      this.item.address.postal_code = item.postal_code;
      this.item.address.street = item.street;
      this.item.address.number = item.number;
    },

    isInvalid(key) {
      return (val) => {
        if (!(val && val.length > 0)) return this.$t("messages.fieldRequired");

        if (key == "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return this.$t("messages.emailInvalid");

        if (key == "phone" && !/^\d{10,11}$/.test(val))
          return this.$t("messages.phoneInvalid");

        if (key == "password" && val.length < 6)
          return this.$t("A senha deve ter no mínimo 6 caracteres");

        if (key == "confirm" && this.item.password != this.item.confirmPassword)
          return this.$t("As senhas não coincidem");

        return true;
      };
    },
  },
};
</script>
