import axios from 'axios'


const api = axios.create({
  baseURL: 'https://prg04ianlucasqueiroz-backend-production.up.railway.app'
})


export default api;