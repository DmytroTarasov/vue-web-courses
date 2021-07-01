import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function postLectureConstruct(parameterObj) {
    console.log(parameterObj);
    await axios.post(`${baseUrl}/api/LectureConstructs`, parameterObj);
}

// export async function postLectureConstruct(parameterObj) {
//     console.log(parameterObj);
//     await axios.post(`${baseUrl}/api/LectureConstructs`, parameterObj);
// }
