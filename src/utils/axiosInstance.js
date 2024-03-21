import axios from 'axios';
import { API_TOKEN } from "@env";

// Criação da instância do Axios
const api = axios.create({
  baseURL: 'https://api.controleonline.com',
  headers: {
    'api-token': API_TOKEN,
    'Content-Type': 'application/json',
  },
});

export default api;
