import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function getLectureById(id) {
    const response = await axios.get(`${baseUrl}/api/Lectures/${id}`);
    return response.data;
}

// export async function patchLecture(id, name, topicId, token) {
//     console.log(name, topicId);
//     const response = await axios.patch(
//         `${baseUrl}/api/Lectures/${id}`,
//         [
//             {
//                 op: "add",
//                 path: "/name",
//                 value: name,
//             },
//             {
//                 op: "add",
//                 path: "/topicId",
//                 value: topicId,
//             },
//         ]
//         // {
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //         // Accept: "application/json",
//         //         // // "Content-Type": "application/json",
//         //         // Authorization: "Bearer " + token,
//         //     },
//         // }
//     );
//     return response;
// }

export async function patchLecture(id, parameterObj, token) {
    let data = [];
    for (let key in parameterObj) {
        data.push({
            op: "add",
            path: `/${key}`,
            value: parameterObj[key],
        });
    }
    console.log(data);
    const response = await axios.patch(`${baseUrl}/api/Lectures/${id}`, data);
    return response.data;
}

export async function postLecture(parameterObj) {
    console.log(parameterObj);
    const response = await axios.post(`${baseUrl}/api/Lectures`, parameterObj);
    return response.data;
}

export async function getLectureConstructs(id) {
    const response = await axios.get(`${baseUrl}/api/Lectures/${id}/Constructs`);
    return response.data;
}

export function sortByDisplayOrder(a, b) {
    if (a.displayOrder < b.displayOrder) {
        return -1;
    } else if (a.displayOrder > b.displayOrder) {
        return 1;
    } else {
        return 0;
    }
}
