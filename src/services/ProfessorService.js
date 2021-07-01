import axios from "axios";
const baseUrl = "http://104.41.148.115";

export async function loginProfessor(email, password) {
    return new Promise(resolve => {
        axios
            .post(`${baseUrl}/api/Professors/authenticate`, {
                email: email,
                password: password,
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => resolve(err.response));
    });

    // console.log(response);
    // if (response.request.status == "200") {
    //     return response.data;
    // }

    // return new Promise((resolve, reject) => {
    //     let result;
    //     axios
    //         .post(`${baseUrl}/api/Professors/authenticate`, {
    //             email: email,
    //             password: password,
    //         })
    //         .then(function(response) {
    //             if (response.request.status == "200") {
    //                 result = response.data;
    //             }
    //         })
    //         .catch(err => console.log(err));
    //     // if (response.request.status == "200") {
    //     //     resolve(response.data);
    //     // } else {
    //     //     reject();
    //     // }
    // });
}

// export async function patchProfessor(id, token) {
//     console.log(token);
//     const response = await axios.patch(
//         `${baseUrl}/api/Courses/${id}`,
//         {
//             categoryId,
//             name,
//             description,
//         },
//         {
//             headers: {
//                 // "Content-Type": "application/json",
//                 Authorization: "Bearer " + token,
//             },
//         }
//     );
//     return response;
// }

export async function getProfessorById(id) {
    const response = await axios.get(`${baseUrl}/api/Professors/${id}`);
    return response.data;
}

export async function patchProfessor(id, parameterObj, token) {
    let data = [];
    for (let key in parameterObj) {
        data.push({
            op: "add",
            path: `/${key}`,
            value: parameterObj[key],
        });
    }

    const response = await axios.patch(`${baseUrl}/api/Professors/${id}`, data);
    return response.data;
}

export async function getProfessorCourses(id) {
    const response = await axios.get(`${baseUrl}/api/Professors/${id}/Courses`);
    return response.data;
}
