import axios from 'axios';

import { API_URL } from '@/config/constants';

const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default client;
