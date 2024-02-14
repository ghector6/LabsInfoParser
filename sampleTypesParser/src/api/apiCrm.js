
const axios = require('axios');
const API = process.env.NEXT_PUBLIC_API_CRM;

module.exports = axios.create({
  baseURL: `${API}/api`
});