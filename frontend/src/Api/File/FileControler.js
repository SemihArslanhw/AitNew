import * as FileService from "./FileService";

const getAllImagesFull = async (page) => {
    try {
        const res = await FileService.getAllImages(page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const addLabelToFileService = async (fileId, labelId) => {
   try {
        const res = await FileService.addLabelToFile(fileId, labelId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const getFileByIdService = async (id) => {
    try {
        const res = FileService.getFileById(id);
        return res;
    } catch (err) {
        return err.message;
    }
}

const deleteLabelFromFileService = async (fileId, labelId) => {
    try {
        const res = await FileService.deleteLabelFromFile(fileId, labelId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const searchByFileNameService = async (page , fileName) => {
    try {
        const res = FileService.searchByFileName(page , fileName);
        return res;
    } catch (err) {
        return err.message;
    }
}

const uploadFileService = async (file) => {
    try {
        const res = await FileService.uploadFile(file);
        return res;
    } catch (err) {
        return err.message;
    }
}

const getHiddenFilesService = async (page) => {
    try {
        const res = await FileService.getHiddenFiles(page);
        return res;
    } catch (err) {
        return err.message;
    }
}

const hideFileService = async (fileId) => {
    try {
        const res = await FileService.hideFile(fileId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const unhideFileService = async (fileId) => {
    try {
        const res = await FileService.unhideFile(fileId);
        return res;
    } catch (err) {
        return err.message;
    }
}

const filterByLabel = async (page, labels) => {
    try {
        const res = await FileService.filterByLabel(page, labels);
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
    unhideFileService,
    filterByLabel
}