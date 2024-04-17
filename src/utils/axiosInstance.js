import axios from 'axios';
import { APP_DOMAIN } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAppToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userData');
    const userData = jsonValue ? JSON.parse(jsonValue) : null;
    return userData ? userData.api_key : null;
  } catch (error) {
    console.error('Erro ao obter token do AsyncStorage:', error);
    return null;
  }
};

const api = axios.create({
  baseURL: 'https://api.controleonline.com',
  headers: {
    'Content-Type': 'application/json',
    'app-domain': APP_DOMAIN,
  },
});

api.interceptors.request.use(async function (config) {
  const appToken = await getAppToken();

  if (appToken && config.url !== '/token') {
    config.headers['api-token'] = appToken;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

export default api;
