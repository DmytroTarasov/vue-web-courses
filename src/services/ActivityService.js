import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function postActivity(parameterObj) {
    const response = await axios.post(`${baseUrl}/api/Activities`, parameterObj);
    return response.data;
}
