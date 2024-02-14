require('dotenv').config();
const axios = require('axios');

const API = process.env.NEXT_PUBLIC_API_CRM;


//console.log(process.env.NEXT_PUBLIC_API_CRM, 'API')
module.exports = axios.create({
  baseURL: `${API}/api`
});