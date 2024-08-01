import { date } from "quasar";

export default class Formatter {
  static formatDocument(value) {
    if (/^([0-9]{11})$/.test(value))
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");

    if (/^([0-9]{14})$/.test(value))
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        "$1.$2.$3/$4-$5"
      );

    return value;
  }

  static formatBRDocument(value) {
    if (/^([0-9]{11})$/.test(value)) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    }

    if (/^([0-9]{14})$/.test(value)) {
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        "$1.$2.$3/$4-$5"
      );
    }

    return value;
  }

  static formatBRPhone(value) {
    if (/^([0-9]{10})$/.test(value)) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, "($1) $2-$3");
    }

    if (/^([0-9]{11})$/.test(value)) {
      return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, "($1) $2 $3-$4");
    }

    return value;
  }

  static formatPhone(value) {
    if (/^([0-9]{10})$/.test(value))
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, "($1) $2-$3");

    if (/^([0-9]{11})$/.test(value))
      return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, "($1) $2 $3-$4");

    return value;
  }

  static formatCEP(value) {
    if (value.length == 7) value = `0${value}`;

    return value.replace(/(\d{5})(\d{3})/g, "$1-$2");
  }

  static formatFloat(value) {
    let formatedValue = [value || 0]
      .toString()
      .replace(/[^0-9.,]/g, "")
      .replace(".", "")
      .replace(",", ".");
    return parseFloat(formatedValue);
  }

  static  formatMoney(value, currency, locale) {
    let formatter = new Intl.NumberFormat(locale || "pt-br", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    if (typeof value == "string")
      value = value.replace(".", "").replace(",", ".");

    if (!value) return "0,00";

    let formattedValue = formatter.format(value);
    if (!formattedValue.includes(",")) {
      formattedValue += ",00";
    }

    return formattedValue || 0;
  }

  static buildAmericanDate(dateString) {
    let formatedDate;

    if (!dateString) {
      return dateString;
    }
    dateString = dateString.replaceAll("/", "-");
    if (dateString) {
      formatedDate = date.formatDate(
        date.extractDate(dateString, "DD-MM-YYYY"),
        "YYYY-MM-DD"
      );
    } else {
      return null;
    }
    return formatedDate;
  }

  static formatDateYmdTodmY(value, withTime = false) {
    if (!value) return;

    let result = value.match(/^(\d{4})\-(\d{2})\-(\d{2})\s*([\w:]*)/);

    if (result === null) return value;

    // Criar um objeto Date a partir da string fornecida
    let alterDate = new Date(value);

    // Obter o fuso horário atual do cliente
    let clientTimeZoneOffset = new Date().getTimezoneOffset();

    // Calcular a diferença entre o fuso horário do cliente e o fuso horário da data alterDate
    let timeZoneDiffMinutes =
      clientTimeZoneOffset + alterDate.getTimezoneOffset() * -1;

    // Aplicar a diferença de fuso horário à data alterDate
    alterDate.setMinutes(alterDate.getMinutes() + timeZoneDiffMinutes);

    // Formatando a data para exibir
    let options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour12: false,
    };

    // Se withTime for verdadeiro, adicione as informações de hora, minuto e segundo
    if (withTime) {
      options.hour = "numeric";
      options.minute = "numeric";
      options.second = "numeric";
    }

    let formattedDate = alterDate.toLocaleString("pt-BR", options);

    return formattedDate;
  }
}
