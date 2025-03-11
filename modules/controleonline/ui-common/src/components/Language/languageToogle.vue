<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    :label="$tt('menu', 'configs', 'Language')"
    class="language-toogle"
    dense
    borderless
    emit-value
    map-options
    options-dense
  />
</template>

<script>
import Config from "@controleonline/ui-common/src/utils/config";
import Language from "@controleonline/ui-common/src/utils/language";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Config,
    Language,
  },

  data() {
    return {
      config: new Config(),
      language: new Language(this.$i18n),
      lang: null,
      langOptions: [],
    };
  },
  methods: {
    init() {
      this.getLanguage();
      this.getLanguages();
    },
    getLanguages() {
      setTimeout(() => {
        let languages = [];
        this.languages?.forEach((language) => {
          languages.push({
            value: language.language,
            label: this.$tt("language", "input", language.language),
          });
        });
        this.langOptions = languages;
      }, 1000);
    },
    getLanguage() {
      let lang = this.config.getConfig("language");
      this.lang = lang == undefined ? this.$i18n.locale : lang;
    },
  },

  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      languages: "language/items",
    }),
  },
  watch: {
    lang(lang) {
      this.config.setConfig("language", lang);
      if (lang) {
        this.$i18n.locale = lang;
        this.$i18n.messages[lang] = this.language.getMessages(lang);
        this.getLanguages();
      }
    },
  },
};
</script>
<style>
.language-toogle {
  min-width: 100px;
}
</style>
