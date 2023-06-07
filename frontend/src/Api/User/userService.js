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
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location = "/";
        return res;
    } catch (err) {
        return err.message;
    }
}

   const logoutCall = async () => {
    try {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("user");
        window.location = "/login";
    } catch (err) {
        return err.message;
    }
}


   const updateCall = async (id, username, password, role) => {
    try {
        const res = await API.put("auth/" + id, {
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

export {
    deleteUser ,
    getUsers,
    registerCall,
    loginCall,
    updateCall,
    logoutCall
}