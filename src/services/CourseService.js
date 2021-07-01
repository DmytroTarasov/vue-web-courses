import axios from "axios";
const baseUrl = "http://104.41.148.115";

import { getLecturesByTopicId, getActivitiesByTopicId } from "./TopicService";
import { getTopicsByUnitId } from "./UnitService";

export async function getCourses() {
    const response = await axios.get(`${baseUrl}/api/Courses`);
    return response.data;
}

export async function getPopularCourses() {
    const response = await axios.get(`${baseUrl}/api/Courses/filter?popular=true`);
    return response.data;
}

export async function getCourseById(id) {
    const response = await axios.get(`${baseUrl}/api/Courses/${id}`);
    return response.data;
}

export async function getUnitsByCourseId(id) {
    const response = await axios.get(`${baseUrl}/api/Courses/${id}/Units`);
    return response.data;
}

export async function getCourseCategory(id) {
    const response = await axios.get(`${baseUrl}/api/CourseCategories/${id}`);
    return response.data;
}

export async function getCourseProfessors(id) {
    const response = await axios.get(`${baseUrl}/api/Professors/filter?courseId=${id}`);
    return response.data;
}

export async function getCourseLecturesCount(id) {
    let units = [],
        topics = [],
        lecturesCount = 0,
        activitiesCount = 0,
        res = [];
    await getUnitsByCourseId(id).then(res => {
        units = res;
    });

    for (let unit of units) {
        await getTopicsByUnitId(unit.id).then(res => {
            for (let r of res) {
                topics.push(r);
            }
        });
    }

    for (let topic of topics) {
        await getLecturesByTopicId(topic.id).then(res => {
            lecturesCount += res.length;
        });
        await getActivitiesByTopicId(topic.id).then(res => {
            activitiesCount += res.length;
        });
    }
    res.push(lecturesCount);
    res.push(activitiesCount);
    return res;
}

export async function getFilteredCoursesByCategory(id) {
    const response = await axios.get(`${baseUrl}/api/Courses/filter?category=${id}`);
    return response.data;
}

export async function patchCourse(id, parameterObj, token) {
    let data = [];
    for (let key in parameterObj) {
        data.push({
            op: "add",
            path: `/${key}`,
            value: parameterObj[key],
        });
    }

    const response = await axios.patch(`${baseUrl}/api/Courses/${id}`, data);
    return response.data;

    // {
    //     headers: {
    //         "Content-Type": "application/json",
    //         // Accept: "application/json",
    //         // // "Content-Type": "application/json",
    //         // Authorization: "Bearer " + token,
    //     },
    // }
}

// сюда нужно еще токен добавить

export async function deleteCourseById(id) {
    await axios.delete(`${baseUrl}/api/Courses/${id}`);
}

export async function postCourse(parameterObj) {
    const response = await axios.post(`${baseUrl}/api/Courses`, parameterObj);
    return response.data;
}

export async function patchCourseProfessors(id, professorId, token) {
    let data = [];
    data.push({
        id: professorId,
    });
    console.log(data);
    const response = await axios.patch(`${baseUrl}/api/Courses/${id}/Professors`, data);
    return response.data;
}
