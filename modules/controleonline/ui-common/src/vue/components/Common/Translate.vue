<template></template>
<script>
import { mapActions, mapGetters } from "vuex";
import Config from "@controleonline/ui-common/src/utils/config";
const config = new Config();
export default {
  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
    messages() {
      return this.$i18n.getLocaleMessage(this.getLanguage());
    },
    stores() {
      return this.$translate.stores;
    },

  },
  data() {
    return {
      localMessages: {},
      languages: [],
      loaded: { [this.getLanguage()]: {} },
      persisted: {},
    };
  },
  methods: {
    ...mapActions({
      getLanguages: "language/getItems",
      getItems: "tt/getItems",
      save: "tt/save",
    }),
    getLanguageId(languageCode) {
      const language = this.languages.find(
        (lang) => lang.language === languageCode
      );
      return language?.id;
    },
    getLanguage() {
      let lang = config.getConfig("language");
      return lang == undefined ? this.$i18n.locale : lang;
    },
    persist() {
      if (!this.$auth.isLogged) return;
      let persisted = this.$copyObject(this.persisted);
      for (const lang in this.$translate.persistMessages) {
        let languageId = this.getLanguageId(lang);
        if (languageId)
          for (const store in this.$translate.persistMessages[lang]) {
            for (const type in this.$translate.persistMessages[lang][store]) {
              for (const key in this.$translate.persistMessages[lang][store][
                type
              ]) {
                if (!persisted[lang]) persisted[lang] = {};
                if (!persisted[lang][store]) persisted[lang][store] = {};
                if (!persisted[lang][store][type])
                  persisted[lang][store][type] = {};
                if (!persisted[lang][store][type][key])
                  this.save({
                    key: key,
                    language: "/languages/" + languageId,
                    people: "/people/" + this.defaultCompany.id,
                    store: store,
                    translate:
                      this.$translate.persistMessages[lang][store][type][key],
                    type: type,
                  });

                persisted[lang][store][type][key] = true;
                this.persisted = persisted;
              }
            }
          }
      }
    },
    getTranslate(locale, store) {
      this.loaded[locale][store] = true;
      this.getItems({ "language.language": locale, store })
        .then((data) => {
          if (
            typeof data === "object" &&
            data !== null &&
            Object.keys(data).length > 0
          ) {
            data.forEach((translate, i) => {
              if (!this.localMessages[translate.store])
                this.localMessages[translate.store] = {};
              if (!this.localMessages[translate.store][translate.type])
                this.localMessages[translate.store][translate.type] = {};

              this.localMessages[translate.store][translate.type][
                translate.key
              ] = translate.translate;

              if (!this.$translate.persistMessages[locale])
                this.$translate.persistMessages[locale] = {};
              if (!this.$translate.persistMessages[locale][translate.store])
                this.$translate.persistMessages[locale][translate.store] = {};
              if (
                !this.$translate.persistMessages[locale][translate.store][
                  translate.type
                ]
              )
                this.$translate.persistMessages[locale][translate.store][
                  translate.type
                ] = {};
              if (
                !this.$translate.persistMessages[locale][translate.store][
                  translate.type
                ][translate.key]
              )
                this.$translate.persistMessages[locale][translate.store][
                  translate.type
                ][translate.key] = {};

              if (!this.persisted[locale]) this.persisted[locale] = {};
              if (!this.persisted[locale][translate.store])
                this.persisted[locale][translate.store] = {};
              if (!this.persisted[locale][translate.store][translate.type])
                this.persisted[locale][translate.store][translate.type] = {};

              this.persisted[locale][translate.store][translate.type][
                translate.key
              ] = true;
            });
            this.$i18n.setLocaleMessage(locale, this.localMessages);
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.persist();
          }, 5000);
        });
    },
  },
  created() {
    this.getLanguages().then((data) => {
      this.languages = data;
    });
  },
  watch: {
    stores: {
      handler: function (stores) {
        if (!this.loaded[this.getLanguage()])
          this.loaded[this.getLanguage()] = [];
        Object.values(stores[this.getLanguage()]).forEach((store) => {
          if (!this.loaded[this.getLanguage()][store])
            this.getTranslate(this.getLanguage(), store);
        });
      },
      deep: true,
    },
  },
};
</script>
