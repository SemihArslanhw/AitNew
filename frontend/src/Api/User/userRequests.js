import * as API from '../index';

export const getUsers = async () => {
    try {
        const res = await API.API.get("auth/getAll");
        return res;
    } catch (err) {
        return err.message;
    }
}