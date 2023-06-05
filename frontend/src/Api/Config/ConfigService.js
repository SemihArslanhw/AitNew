import { API } from "../index";

const getConfig = async () => {
    try {
        const res = await API.get("config-management/config");
        return res;
    } catch (error) {
        return error.message;
    }

    }

export {
    getConfig
}