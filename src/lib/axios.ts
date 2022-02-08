import axios, { AxiosInstance } from 'axios';
import { API_URL } from './config';

/**
 * Create Axios Instance
 *
 * @param accessToken
 * @returns
 */
const createAxiosInstance = (accessToken): AxiosInstance => {
  /**
   * Create Axios Instance
   */
  const axiosInstance = axios.create({
    baseURL: `${API_URL}`,
    headers: {
      authorization: `Bearer ${accessToken}`
    }
  });

  delete axiosInstance.defaults.headers.common['Content-Type'];

  axiosInstance.interceptors.request.use((config) => {
    config.headers;
    /* ----------------------------- API Call Start ----------------------------- */
    /* eslint-disable no-console */
    return config;
  });

  axiosInstance.interceptors.response.use((response) => {
    /* ------------------------------ API Call End ------------------------------ */
    return response;
  });

  return axiosInstance;
};

export default createAxiosInstance;
