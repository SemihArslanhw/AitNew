import axios from "axios";

export const PF = "http://localhost:8080/images/"  

export const API = axios.create({
  baseURL: "http://192.168.2.44/",
});

export const loginCall = async (username , password) => {
    try {
        const res = await API.post("auth/authentication", {
           "username" : username,
           "password" : password,
        });
        document.cookie = `Bearer ${res.data.user.token};`;
        return res;
    } catch (err) {
        return err.message;
    }
}

export const getCluseters = async () => {
    try {
        const res = await API.get("cluster/get");
        return res;
    } catch (err) {
        return err.message;
    }
}