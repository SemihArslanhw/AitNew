import { API } from "../index";

 const deleteUser = async (id) => {
    try {
        const res = await API.delete("auth/" + id);
        return res;
    } catch (err) {
        return err.message;
    }
}

 const getUsers = async () => {
    try {
        const res = await API.get("auth/getAll");
        return res;
    } catch (err) {
        return err.message;
    }
}

 const registerCall = async (username, password, role) => {
    try {
        const res = await API.post("auth/registration", {
            "username": username,
            "password": password,
            "role": role,
        });
        console.log(res);
        return res;
    } catch (err) {
        return err.message;
    }
}
  const loginCall = async (username, password) => {
    try {
        const res = await API.post("auth/authentication", {
            "username": username,
            "password": password,
        });
        console.log(res);
        document.cookie = "token=" + res.data.user.token;
        window.location = "/";
        return res;
    } catch (err) {
        return err.message;
    }
}

export {
    deleteUser ,
    getUsers,
    registerCall,
    loginCall
}