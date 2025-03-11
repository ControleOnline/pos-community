export default class Formatter {
  static formatDocument(value) {
    if (/^([0-9]{11})$/.test(value))
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');

    if (/^([0-9]{14})$/.test(value))
      return value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        '$1.$2.$3/$4-$5',
      );

    return value || '';
  }

  static formatBRDocument(value) {
    return Formatter.formatDocument(value); // Reutiliza formatDocument
  }

  static formatBRPhone(value) {
    if (/^([0-9]{10})$/.test(value))
      return value.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');

    if (/^([0-9]{11})$/.test(value))
      return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');

    return value || '';
  }

  static formatDateToBR(dateISO) {
    if (!dateISO) return '';
    const [year, month, day] = dateISO.split(/[-/]/); // Suporta YYYY-MM-DD ou DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }

  static validateBRDate(value) {
    if (!value) return true;

    const normalizedValue = value.replace(/[-/]/g, '/');
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(normalizedValue))
      return 'Data inválida. Formato esperado: DD/MM/YYYY';

    const [day, month, year] = normalizedValue.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return 'Data inválida';
    }

    return true;
  }

  static formatPhone(value) {
    return Formatter.formatBRPhone(value); // Reutiliza formatBRPhone
  }

  static formatCEP(value) {
    if (!value) return '';
    if (value.length === 7) value = `0${value}`;
    return value.replace(/(\d{5})(\d{3})/g, '$1-$2');
  }

  static formatFloat(value) {
    const formatedValue = String(value || 0)
      .replace(/[^0-9.,]/g, '')
      .replace('.', '')
      .replace(',', '.');
    return parseFloat(formatedValue) || 0;
  }

  static formatMoney(value, currency = 'R$', locale = 'pt-BR') {
    if (!value && value !== 0) return `${currency} 0,00`;

    const numericValue =
      typeof value === 'string'
        ? parseFloat(value.replace('.', '').replace(',', '.')) || 0
        : value;

    const formatter = new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `${currency} ${formatter.format(numericValue)}`;
  }

  static buildAmericanDate(dateString) {
    if (!dateString) return null;

    const normalizedDate = dateString.replaceAll('/', '-');
    const [day, month, year] = normalizedDate.split('-').map(Number);

    // Assume DD-MM-YYYY como entrada e converte para YYYY-MM-DD
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return null;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  static formatDateYmdTodmY(value, withTime = false) {
    if (!value) return '';

    const date = new Date(value);
    if (isNaN(date.getTime())) return value; // Retorna o valor original se inválido

    // Ajuste de fuso horário
    const clientTimeZoneOffset = new Date().getTimezoneOffset();
    const timeZoneDiffMinutes = clientTimeZoneOffset - date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() + timeZoneDiffMinutes);

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: false,
    };

    if (withTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.second = '2-digit';
    }

    return date.toLocaleString('pt-BR', options);
  }
}
