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

    const year = date.getUTCFullYear().toString();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);

    // md5(pwd_20240301)
    config.headers["X-Auth"] = CryptoJS.MD5(`${process.env.PASSWORD}_${year + month + day}`);  // Auth header

    return config;
})

// Response interceptor
$api.interceptors.response.use(
    (response) => {
        try {
            response.data = JSON.parse(response.data);
        } catch (error) {
            console.log(response.data);
        }

        return response;
    }
)


export default $api;