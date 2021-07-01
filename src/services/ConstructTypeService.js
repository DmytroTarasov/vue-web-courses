import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function getAllConstructTypes() {
    const response = await axios.get(`${baseUrl}/api/ConstructTypes`);
    return response.data;
}
