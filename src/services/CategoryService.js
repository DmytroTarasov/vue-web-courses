import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function getAllCourseCategories() {
    const response = await axios.get(`${baseUrl}/api/CourseCategories`);
    // console.log(response.data);
    return response.data;
}
