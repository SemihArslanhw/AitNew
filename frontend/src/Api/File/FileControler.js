import { addLabelToFile, deleteLabelFromFile, getAllImages, getFileById, getHiddenFiles, hideFile, searchByFileName, unhideFile, uploadFile } from "./FileService";

const getAllImagesFull = async (page) => {
    try {
        const res = await getAllImages(page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const addLabelToFileService = async (fileId, labelId) => {
   try {
        const res = await addLabelToFile(fileId, labelId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const getFileByIdService = async (id) => {
    try {
        const res = getFileById(id);
        return res;
    } catch (err) {
        return err.message;
    }
}

const deleteLabelFromFileService = async (fileId, labelId) => {
    try {
        const res = await deleteLabelFromFile(fileId, labelId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const searchByFileNameService = async (page , fileName) => {
    try {
        const res = searchByFileName(page , fileName);
        return res;
    } catch (err) {
        return err.message;
    }
}

const uploadFileService = async (file) => {
    try {
        const res = await uploadFile(file);
        return res;
    } catch (err) {
        return err.message;
    }
}

const getHiddenFilesService = async (page) => {
    try {
        const res = await getHiddenFiles(page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const hideFileService = async (fileId) => {
    try {
        const res = await hideFile(fileId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const unhideFileService = async (fileId) => {
    try {
        const res = await unhideFile(fileId);
        return res;
    } catch (err) {
        return err.message;
    }
}


export {
    getAllImagesFull,
    addLabelToFileService,
    getFileByIdService,
    deleteLabelFromFileService,
    searchByFileNameService,
    uploadFileService,
    getHiddenFilesService,
    hideFileService,
    unhideFileService
}