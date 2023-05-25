import { API } from "../index";

const getAllImages = async (page) => {
    try {
        const res = await API.get("file-management/files/"+page);
        return res;
    } catch (err) {
        return err.message;
    }
}

export {
    getAllImages
}