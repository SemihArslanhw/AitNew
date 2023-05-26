import * as userService from './userService';


const deleteUser = async (id) => {
    try {
        const res = await userService.deleteUser(id);
        return res;
    } catch (err) {
        return err.message;
    }
    }

const getUsers = async () => {
    try {
        const res = await userService.getUsers();
        return res;
    } catch (err) {
        return err.message;
    }
}

const registerCall = async (username, password, role) => {
    try {
        const res = await userService.registerCall(username, password, role);
        console.log(res);
        return res;
    } catch (err) {
        return err.message;
    }
}

const loginCall = async (username, password) => {
    try {
        const res = await userService.loginCall(username, password);
        console.log(res);
        document.cookie = "token=" + res.data.user.token;
        window.location = "/";
        return res;
    } catch (err) {
        return err.message;
    }
}

const updateCall = async (id, username, password, role) => {
    try {
        const res = await userService.updateCall(id, username, password, role);
        console.log(res);
        return res;
    } catch (err) {
        return err.message;
    }
}


export {
    deleteUser ,
    getUsers ,
    registerCall ,
    loginCall,
    updateCall
}