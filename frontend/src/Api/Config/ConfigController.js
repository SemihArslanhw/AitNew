import * as ConfigService from './ConfigService';

const getConfig = async () => {
    try {
        const res = await ConfigService.getConfig();
        return res;
    } catch (error) {
       return error.message; 
    }
    
    }

export {
    getConfig
}