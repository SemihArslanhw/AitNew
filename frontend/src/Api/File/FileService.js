import { API } from "../index";

const getAllImages = async (page) => {
    try {
        const res = await API.get("file-management/files/"+page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const getFileById = async (id) => {
    try {
        const res = await API.get("file-management/file/"+id);
        return res;
    } catch (err) {
        return err.message;
    }
}

const addLabelToFile = async (fileId, labelId) => {
    try {
        const res = await API.post("file-management/files/label/add" , {
            "files": [fileId],
            "cluster_id": labelId
            });
        return res;
    } catch (err) {
        return err.message;
    }
}

const deleteLabelFromFile = async (fileId, labelId) => {
    try {
        const res = await API.post("file-management/files/label/remove" , {
            "files": [fileId],
            "cluster_id": labelId
            });
        return res;
    } catch (err) {
        return err.message;
    }
}

const searchByFileName = async (page , fileName) => {
    try {
        const res = await API.post("file-management/files/search/"+page ,
        {
            "filename": fileName
            });
        return res;
    } catch (err) {
        return err.message;
    }
}


export {
    getAllImages,
    addLabelToFile,
    getFileById,
    deleteLabelFromFile,
    searchByFileName
}