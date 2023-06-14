import axios from "axios";



export const ImageProxy = "http://192.168.2.44:3000/"

export const API = axios.create({
    baseURL: "http://192.168.2.44:3000/",
    withCredentials: true,
});
