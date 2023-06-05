import axios from "axios";



export const ImageProxy = "http://192.168.2.44"

export const API = axios.create({
    baseURL: process.env.REACT_HOST_URL,
    withCredentials: true,
});

// export const registerCall = async (username, password, role) => {
//     try {
//         const res = await API.post("auth/registration", {
//             "username": username,
//             "password": password,
//             "role": role,
//         });
//         console.log(res);
//         return res;
//     } catch (err) {
//         return err.message;
//     }
// }

// export const loginCall = async (username, password) => {
//     try {
//         const res = await API.post("auth/authentication", {
//             "username": username,
//             "password": password,
//         });
//         console.log(res);
//         document.cookie = "token=" + res.data.user.token;
//         window.location = "/";
//         return res;
//     } catch (err) {
//         return err.message;
//     }
// }

// export const userDeleteCall = async (id) => {
//     try {
//         const res = await API.delete("auth/" + id);
//         return res;
//     } catch (err) {
//         return err.message;
//     }
// }

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
        const res = await API.post("cluster/delete/", {
            "cluster_id": id
        });
        return res;
    } catch (err) {
        return err.message;
    }
}