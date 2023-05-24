import * as API from '../index';

export const getClusters = async () => {
    try {
        const res = await API.API.get("cluster/get");
        return res;
    } catch (err) {
        return err.message;
    }
}

export const addCluster = async (name) => {
    try {
        const res = await API.API.post("cluster/add", {
            "cluster_name": name
        });
    //   const res = await fetch("http://192.168.2.44/cluster/add", {
    //   method: "POST", // or 'PUT'
    //   mode: "no-cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Cooki":document.cookie
    //   },
    //   credentials: "include",
    //   body: JSON.stringify({cluster_name: name}),
    // });
        return res;
    } catch (err) {
        return err.message;
    }
}