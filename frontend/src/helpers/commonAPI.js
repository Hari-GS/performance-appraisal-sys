import { LOGIN_API_URL } from "./api_urls"
import axiosInstance from "./axios_config";
export const loginAuth = (data)=>{
    return axiosInstance.post(LOGIN_API_URL,data);
}