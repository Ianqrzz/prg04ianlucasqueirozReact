import axios from 'axios'


const api = axios.create({
  baseURL: 'https://prg04ianlucasqueirozbackend-production.up.railway.app'
})


export default api;