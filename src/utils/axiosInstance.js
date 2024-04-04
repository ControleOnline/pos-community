import axios from 'axios';
import { API_TOKEN, APP_DOMAIN } from "@env";

// Criação da instância do Axios
const api = axios.create({
  baseURL: 'https://api.controleonline.com',
  headers: {
    'api-token': API_TOKEN,
    'Content-Type': 'application/json',
    'app-domain': APP_DOMAIN,
  },
});

export default api;
