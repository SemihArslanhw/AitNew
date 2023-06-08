import { API } from "../index";

const getConfig = async () => {
    try {
        const res = await API.get("config-management/config");
        return res;
    } catch (error) {
        return error.message;
    }

    }

const updateJobTimes = async (jobStart , workingHours , workingMinutes) => {
    try {
        const res = await API.post("config-management/time", {
            "jobStart": jobStart,
            "workingHours": workingHours,
            "workingMinutes": workingMinutes
        });
        return res;
    } catch (error) {
        return error.message;
    }
}



export {
    getConfig,
    updateJobTimes
}