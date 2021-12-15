import axios, {AxiosResponse} from 'axios';
import {env} from '@/utils/util';
export const TOKEN_HEADER_KEY = 'token';
axios.defaults.baseURL = env().VITE_BASE_API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem(TOKEN_HEADER_KEY);
  if (token) {
    config.headers && (config.headers[TOKEN_HEADER_KEY] = token);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

const http = axios;
export default http;
export interface Response extends AxiosResponse{}
