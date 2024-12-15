import axios from 'axios';


const axiosInstance =axios.create({

    // baseURL:"http://localhost:4020"
    baseURL:"https://personalwebsitebe.vercel.app"
})

export default axiosInstance;