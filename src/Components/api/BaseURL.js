//const baseURL = "http://localhost:4020";
 //const baseURL = "http://192.168.1.13:4020";
//const baseURL = 'https://personalwebsitebackend-6388.onrender.com';
 //const baseURL = "https://zahidhashmi.centralindia.cloudapp.azure.com";

var baseURL;
if(process.env.PRODUCTION ===true ){
 baseURL = 'https://personalwebsitebackend-6388.onrender.com';
}else{
     baseURL = "http://localhost:4020";
}
export default baseURL;