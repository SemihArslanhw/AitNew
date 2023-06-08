import { API } from "../index";

const getClusters = async () => {
    try {
        const res = await API.get("cluster/get");
        return res;
    } catch (err) {
        return err.message;
    }
}

const addCluster = async (name) => {
    try {
        const res = await API.post("cluster/add", {
            "cluster_name": name
        });
        return res;
    } catch (err) {
        return err.message;
    }
}

export {
    getClusters,
    addCluster
}