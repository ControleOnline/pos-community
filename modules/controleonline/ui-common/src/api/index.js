import myFetch from "@controleonline/ui-common/src/api/fetch";
import axios from "axios";
import { APP_ENV } from "../../../../../config/env";

const MIME_TYPE = "application/ld+json";
export const api = {
  fetch: async function (uri, options = {}) {
    if (typeof options.headers === "undefined")
      Object.assign(options, { headers: new Headers() });

    let token = await this.getToken();
    if (token) options.headers.set("API-TOKEN", token);

    options.headers.set("Content-Type", MIME_TYPE);
    options.headers.set("Accept", MIME_TYPE);
    options.headers.set("App-Domain", APP_ENV.DOMAIN || location.host);

    if (options.body && typeof options.body != "string") {
      options.body = JSON.stringify(options.body);
    }

    if (options.params) {
      uri = this.buildQueryString(uri, options);
    }
    return myFetch(uri, options).catch((e) => {
      if (e.message == "Unauthorized" || e.message == "Invalid credentials.") {
        this.$auth.logout();
      }
      throw e;
    });
  },
  async getToken() {
    // Obtém o valor da sessão e converte de volta para um objeto
    const sessionString = await localStorage.getItem("session");
    let session = null;
    if (sessionString) {
      try {
        const cleanString =
          typeof sessionString == "string" &&
          sessionString.startsWith("__q_objt|")
            ? sessionString.substring("__q_objt|".length)
            : sessionString;
        session = JSON.parse(cleanString); // Transforma a string em objeto
      } catch (e) {
        console.error("Failed to parse session from localStorage", e);
      }
    }

    return session?.token || session?.api_key;
  },
  serialize(obj, prefix = "") {
    const pairs = [];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        let fullKey = prefix ? `${prefix}.${key}` : key; // Usa ponto para objetos
  
        if (value === null || value === undefined) {
          pairs.push(`${fullKey}=`);
        } else if (typeof value === "object" && !Array.isArray(value)) {
          // Objeto aninhado: chama serialize recursivamente com ponto
          pairs.push(...this.serialize(value, fullKey));
        } else if (Array.isArray(value)) {
          // Array: adiciona [] e itera sobre os valores
          if (value.length === 0) {
            pairs.push(`${fullKey}[]=`);
          } else {
            value.forEach((val) => {
              if (typeof val === "object" && val !== null) {
                pairs.push(...this.serialize(val, `${fullKey}[]`));
              } else {
                pairs.push(`${fullKey}[]=${encodeURIComponent(val)}`);
              }
            });
          }
        } else {
          // Valor simples
          pairs.push(`${fullKey}=${encodeURIComponent(value)}`);
        }
      }
    }
    return pairs;
  },
  

  buildQueryString(uri, options) {
    if (options.params) {
      const params = this.serialize(options.params);
      uri = `${uri}?${params.join("&")}`;
    }
    return uri;
  },
  post: async function (uri, body = {}) {
    const options = {
      method: "POST",
      body: body,
    };
    return await this.fetch(uri, options);
  },
  execute: function (params) {
    return axios(params);
  },
};
