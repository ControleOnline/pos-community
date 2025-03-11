import { i18n } from "@controleonline/ui-common/src/boot/i18n";
import { computed, reactive } from "vue";
import Config from "@controleonline/ui-common/src/utils/config";

const locale = computed(() => i18n.global.locale).value;

export default class Translate {
  persistMessages = {};
  stores = reactive({});
  config = new Config();

  translate(store, type, key) {
    if (!this.stores[this.getLanguage()]) this.stores[this.getLanguage()] = [];

    if (!this.stores[this.getLanguage()].includes(store))
      this.stores[this.getLanguage()].push(store);

    return this.getMessage(store, type, key);
  }
  getLanguage() {
    let lang = this.config.getConfig("language");
    return lang == undefined ? locale : lang;
  }
  setMessage(store, type, key, message) {
    let messages = i18n.global.getLocaleMessage(this.getLanguage());

    if (!messages[store]) messages[store] = {};
    if (!messages[store][type]) messages[store][type] = {};
    if (messages[store][type][key]) return;

    messages[store][type][key] = message;
    //i18n.global.setLocaleMessage(this.getLanguage(), messages);

    return this.setPersistMessage(store, type, key, message);
  }

  setPersistMessage(store, type, key, message) {
    if (!this.persistMessages[this.getLanguage()])
      this.persistMessages[this.getLanguage()] = {};
    if (!this.persistMessages[this.getLanguage()][store])
      this.persistMessages[this.getLanguage()][store] = {};
    if (!this.persistMessages[this.getLanguage()][store][type])
      this.persistMessages[this.getLanguage()][store][type] = {};
    this.persistMessages[this.getLanguage()][store][type][key] = message;

    return message;
  }

  getMessage(store, type, key) {
    if (i18n.global.te(store + "." + type + "." + key, this.getLanguage()))
      return i18n.global.t(store + "." + type + "." + key);
    else if (i18n.global.te("default." + type + "." + key, this.getLanguage()))
      return i18n.global.t("default." + type + "." + key);

    this.setMessage(store, type, key, this.formatMessage(key));
    return this.getEmptyMessage(store, type, key);
  }

  formatMessage(key) {
    if (key === undefined) return "";
    return key
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  }

  getEmptyMessage(store, type, key) {
    return i18n.global.t(store + "." + type + "." + key);
  }
}
