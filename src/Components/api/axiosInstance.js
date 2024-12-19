import axios from 'axios';


const axiosInstance =axios.create({

    baseURL:"http://localhost:4020",
    //baseURL:"https://personalwebsitebackend-ntzy.onrender.com"
})

export default axiosInstance;