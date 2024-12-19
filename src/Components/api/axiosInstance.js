import axios from 'axios';
import BaseURL from './BaseURL';


const axiosInstance =axios.create({

    
    baseURL:BaseURL
})

export default axiosInstance;