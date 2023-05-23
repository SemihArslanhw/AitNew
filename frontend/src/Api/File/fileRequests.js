import * as API from '../index';

export const getAllFiles = async () => {
    try {
        const res = await API.API.get("file-management/files/all");
        return res;
    } catch (err) {
        return err.message;
    }
}

