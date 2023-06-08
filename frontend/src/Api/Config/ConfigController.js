import * as ConfigService from './ConfigService';

const getConfig = async () => {
    try {
        const res = await ConfigService.getConfig();
        return res;
    } catch (error) {
       return error.message; 
    }
    
    }

const updateJobTimes = async (jobStart , workingHours , workingMinutes) => {
    try {
        const res = await ConfigService.updateJobTimes(jobStart , workingHours , workingMinutes);
        return res;
    } catch (error) {
        return error.message;
    }
}

export {
    getConfig,
    updateJobTimes
}