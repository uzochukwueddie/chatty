import { APP_ENVIRONMENT } from '@root/App';
import axios from 'axios';

export let BASE_ENDPOINT = '';

if (APP_ENVIRONMENT === 'local') {
  BASE_ENDPOINT = 'http://localhost:5000';
} else if (APP_ENVIRONMENT === 'development') {
  BASE_ENDPOINT = 'https://api.dev.chatappserver.xyz';
} else if (APP_ENVIRONMENT === 'staging') {
  BASE_ENDPOINT = 'https://api.stg.chatappserver.xyz';
} else {
  BASE_ENDPOINT = 'https://api.chatappserver.xyz';
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  withCredentials: true
});
