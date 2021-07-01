import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function getLecturesByTopicId(id) {
    const response = await axios.get(`${baseUrl}/api/Topics/${id}/Lectures`);
    return response.data;
}

export async function getActivitiesByTopicId(id) {
    const response = await axios.get(`${baseUrl}/api/Topics/${id}/Activities`);
    return response.data;
}

export async function getTopicById(id) {
    const response = await axios.get(`${baseUrl}/api/Topics/${id}`);
    return response.data;
}

export async function getAllTopics() {
    const response = await axios.get(`${baseUrl}/api/Topics`);
    return response.data;
}

export async function getTopicsByUnitId(id) {
    const response = await axios.get(`${baseUrl}/api/Units/${id}/Topics`);
    return response.data;
}

export async function postTopic(parameterObj) {
    await axios.post(`${baseUrl}/api/Topics`, parameterObj);
}

export async function patchTopic(id, parameterObj, token) {
    let data = [];
    for (let key in parameterObj) {
        data.push({
            op: "add",
            path: `/${key}`,
            value: parameterObj[key],
        });
    }

    const response = await axios.patch(`${baseUrl}/api/Topics/${id}`, data);
    return response.data;
}
