import { API } from "../index";

const getAllImages = async (page) => {
    try {
        const res = await API.get("file-management/files/" + page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const getFileById = async (id) => {
    try {
        const res = await API.get("file-management/file/" + id);
        return res;
    } catch (err) {
        return err.message;
    }
}

const addLabelToFile = async (fileId, labelId) => {
    try {
        const res = await API.post("file-management/files/label/add", {
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
        const res = await API.post("file-management/files/label/remove", {
            "files": [fileId],
            "cluster_id": labelId
        });
        return res;
    } catch (err) {
        return err.message;
    }
}

const getHiddenFiles = async (page) => {
    try {
        const res = await API.get("file-management/files/hidden/" + page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const uploadFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await API.post("file-management/file/upload", formData);
        return res;
    } catch (err) {
        return err.message;
    }
}

const searchByFileName = async (page, fileName) => {
    try {
        const res = await API.post("file-management/files/search/" + page,
            {
                "filename": fileName
            });
        return res;
    } catch (err) {
        return err.message;
    }
}

const hideFile = async (fileId) => {
    try {
        const res = await API.post("file-management/file/hide", {
            "id": fileId
        });
        return res;
    } catch (err) {
        return err.message;
    }
}

const unhideFile = async (fileId) => {
    try {
        const res = await API.post("file-management/file/unhide", {
            "id": fileId
        });
        return res;
    } catch (err) {
        return err.message;
    }
}

const filterByLabel = async (page, labels) => {
    try {
        const res = await API.post("file-management/files/filter/" + page,
            labels
        );
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
    searchByFileName,
    uploadFile,
    getHiddenFiles,
    hideFile,
    unhideFile,
    filterByLabel
}