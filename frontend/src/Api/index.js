import axios from "axios";



export const PF = "http://localhost:8080/images/"  

export const API = axios.create({
    baseURL: "http://192.168.2.44/",
    withCredentials: true,
});

export const loginCall = async (username , password) => {
    try {
        const res = await API.post("auth/authentication",{
           "username" : username,
           "password" : password,
        });
        console.log(res);
        document.cookie = "token=" + res.data.user.token;
        window.location = "/";
        return res;
    } catch (err) {
        return err.message;
    }
}

export const addCluster = async (name) => {
    try {
        const res = await API.post("cluster/add", {
            "cluster_name": name
        });
        return res;
    } catch (err) {
        return err.message;
    }
}

export const deleteCluster = async (id) => {
    try {
        const res = await API.post("cluster/delete/" ,{
            "cluster_id": id
        });
        return res;
    } catch (err) {
        return err.message;
    }
}