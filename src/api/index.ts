import { Axios } from "axios";
import CryptoJS from "crypto-js";


const $api = new Axios({
    baseURL: process.env.API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

// Request interceptor
$api.interceptors.request.use((config) => {
    config.data = JSON.stringify(config.data);
    const date = new Date();

    const year = date.getFullYear().toString();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    // md5(pwd_20240301)
    config.headers["X-Auth"] = CryptoJS.MD5(`${process.env.PASSWORD}_${year + month + day}`);  // Auth header

    return config;
})

// Response interceptor
$api.interceptors.response.use(
    (response) => {
        response.data = JSON.parse(response.data);

        return response;
    },
    // (error: any) => {
    //     console.log(error);
    // }
)


export default $api;