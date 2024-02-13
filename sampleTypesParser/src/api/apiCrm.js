import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_CRM;:w

export default axios.create({
  baseURL: `${API}/api`
});
