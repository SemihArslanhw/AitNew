import { getAllImages } from "./FileService";

const getAllImagesFull = async (page) => {
    try {
        const res = await getAllImages(page);
        return res;
    } catch (err) {
        return err.message;
    }
}

export {
    getAllImagesFull
}