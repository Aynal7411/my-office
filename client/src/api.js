import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
const isValidApiUrl = rawApiUrl && rawApiUrl !== 'undefined' && rawApiUrl !== '';

export const API_BASE = (isValidApiUrl ? rawApiUrl : 'https://my-office-7dvr.onrender.com/api').replace(/\/$/, '');

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 12000,
  headers: {
    Accept: 'application/json',
  },
});

export const getApiError = (error, fallback = 'Something went wrong. Please try again.') => {
  return error?.response?.data?.message || error?.message || fallback;
};
