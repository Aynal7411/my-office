const rawApiUrl = import.meta.env.VITE_API_URL;
const isValidApiUrl = rawApiUrl && rawApiUrl !== 'undefined' && rawApiUrl !== '';
export const API_BASE = (isValidApiUrl ? rawApiUrl : 'https://my-office-7dvr.onrender.com/api').replace(/\/$/, '');
