import * as ClusterService from './ClusterService';

const getClusters = async () => {
    try {
        const res = await ClusterService.getClusters();
        return res;
    } catch (err) {
        return err.message;
    }
}

const addCluster = async (name) => {
    try {
        const res = await ClusterService.addCluster(name);
        return res;
    } catch (err) {
        return err.message;
    }
}

export {
    getClusters,
    addCluster
}