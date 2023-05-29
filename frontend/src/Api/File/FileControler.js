import { addLabelToFile, deleteLabelFromFile, getAllImages, getFileById, searchByFileName } from "./FileService";

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



export {
    getAllImagesFull,
    addLabelToFileService,
    getFileByIdService,
    deleteLabelFromFileService,
    searchByFileNameService
}