import Vue from "vue";
import Router from "vue-router";
import GuestListCourses from "@/views/GuestListCourses";
import GuestSingleCourse from "@/views/GuestSingleCourse";
import ProfessorEditCourse from "@/views/ProfessorEditCourse";
import ProfessorEditLecture from "@/views/ProfessorEditLecture";
import ProfessorProfile from "@/views/ProfessorProfile";
import ProfessorEditUnit from "@/views/ProfessorEditUnit";
import ProfessorEditTopic from "@/views/ProfessorEditTopic";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "GuestListCourses",
            component: GuestListCourses,
            props: true,
        },
        {
            path: "/courses/:idCourse",
            name: "GuestSingleCourse",
            component: GuestSingleCourse,
            props: true,
        },
        {
            path: "/courses/:idCourse/edit",
            name: "ProfessorEditCourse",
            component: ProfessorEditCourse,
            props: true,
        },
        {
            path: "/courses/:idCourse/edit-units/:idUnit",
            name: "ProfessorEditUnit",
            component: ProfessorEditUnit,
            props: true,
        },
        {
            path: "/courses/:idCourse/edit-units/:idUnit/edit-topics/:idTopic",
            name: "ProfessorEditTopic",
            component: ProfessorEditTopic,
            props: true,
        },
        {
            path: "/courses/:idCourse/edit-units/:idUnit/edit-topics/:idTopic/edit-lectures/:idLecture",
            name: "ProfessorEditLecture",
            component: ProfessorEditLecture,
            props: true,
        },
        // {
        //     path: "/courses/:idCourse/edit-lectures/:idLecture",
        //     name: "ProfessorEditLecture",
        //     component: ProfessorEditLecture,
        //     props: true,
        // },
        {
            path: "/professors/:idProfessor/profile",
            name: "ProfessorProfile",
            component: ProfessorProfile,
            props: true,
        },
        // {
        //     path: "/professors/:idProfessor/profile/edit",
        //     name: "ProfessorProfileEdit",
        //     component: ProfessorProfileEdit,
        //     props: true,
        // },
    ],
});
