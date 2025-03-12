export default class Config {
  getConfig(key) {
    let storedUser = this.getAllConfig();
    return storedUser ? storedUser[key] : {};
  }
  getAllConfig() {
    return JSON.parse(localStorage.getItem("config")) || {};
  }
  setConfig(key, data) {
    let storedUser = this.getAllConfig();
    storedUser[key] = data;
    localStorage.setItem("config", JSON.stringify(storedUser));
  }
}