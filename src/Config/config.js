import axios from "axios";

const token = localStorage.getItem('token');
const userToken = JSON.parse(token);

const axiosIstance = axios.create({
    baseURL : 'http://stockapi.ghonaim.com/api/stock/',
    headers : {'Authorization' : `Bearer ${userToken}`}
}) 

export default axiosIstance;
