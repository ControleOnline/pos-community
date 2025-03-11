export default class Language {
  constructor($i18n) {
    this.$i18n = $i18n;
  }

  getMessages(lang) {
    return this.$i18n.messages[lang];
  }
}
