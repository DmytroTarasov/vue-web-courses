import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function getTopicsByUnitId(id) {
    const response = await axios.get(`${baseUrl}/api/Units/${id}/Topics`);
    return response.data;
}

export async function getAllUnits() {
    const response = await axios.get(`${baseUrl}/api/Units`);
    return response.data;
}

export async function getUnitById(id) {
    const response = await axios.get(`${baseUrl}/api/Units/${id}`);
    return response.data;
}

export async function postUnit(parameterObj) {
    await axios.post(`${baseUrl}/api/Units`, parameterObj);
}

export async function patchUnit(id, parameterObj, token) {
    let data = [];
    for (let key in parameterObj) {
        data.push({
            op: "add",
            path: `/${key}`,
            value: parameterObj[key],
        });
    }

    const response = await axios.patch(`${baseUrl}/api/Units/${id}`, data);
    return response.data;
}
