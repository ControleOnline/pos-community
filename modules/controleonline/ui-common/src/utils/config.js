import { LocalStorage } from "quasar";

export default class Config {
  getConfig(key) {
    let storedUser = this.getAllConfig();
    return storedUser ? storedUser[key] : {};
  }
  getAllConfig() {
    return LocalStorage.getItem("config") || {};
  }
  setConfig(key, data) {
    let storedUser = this.getAllConfig();
    storedUser[key] = data;
    LocalStorage.set("config", storedUser);
  }
}
