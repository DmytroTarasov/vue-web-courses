<template>
    <div id="main">
        <nav class="navbar navbar-expand-lg" style="background-color: #212121">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1 font-weight-bold" style="color: #A34255;">
                    <img src="http://placehold.it/30x20" alt="" />
                    Knyaz Academy
                </span>
                <div class="collapse navbar-collapse justify-content-end">
                    <router-link :to="{ name: 'GuestListCourses' }" class="courses__link">Courses</router-link>
                    <!-- <a v-if="token!=null" class="nav-link fs-6 courses__link" aria-current="page" 
                        href="#" style="color: #fff; margin-right: 20px;">
                            Profile</a> -->
                    <!-- <router-link :to="{ name: 'ProfessorProfile', params: {idProfessor:
                        registeredPersonId }}"
                        class="courses__link">Profile</router-link> -->
                    <form class="d-flex">
                        <input
                            class="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style="background-color: #121212; border: none; height: 20px; 
                        color: #fff; padding: 0 10px"
                            id="search-input"
                        />
                        <button class="btn" type="submit" id="search-btn">
                            <i class="fas fa-search" id="search-icon"></i>
                        </button>
                    </form>
                    <button v-if="token == null" class="btn btn-dark fs-6" id="menu-btn" v-b-modal.modal-center>Log in</button>
                    <button v-if="token != null" class="btn btn-dark fs-6 last__btn" id="menu-btn" v-on:click="logOut">Log out</button>
                    <button v-if="token == null" class="btn btn-dark fs-6 last__btn" id="menu-btn">Register</button>
                </div>
            </div>
        </nav>
        <div id="content">
            <div class="row">
                <div class="col-lg-2">
                    <img src="../icons/lector_photo.png" class="w-100" />
                    <div class="fw-normal text-center" id="professor__descr">
                        <h4>{{ professor.name }} {{ professor.surname }}</h4>
                        <h5 class="text-decoration-underline" id="edit-profile" v-b-modal.modal-center>
                            Edit profile
                        </h5>
                        <b-modal class="bg-secondary text-white" ref="edit_profile_modal" id="modal-center" centered title="BootstrapVue" hide-footer>
                            <template #modal-title>
                                Profile
                            </template>
                            <img src="../icons/lector_photo.png" class="w-25" />
                            <!-- <div class="d-block text-center"> -->
                            <h6 class="modal__heading">Name</h6>
                            <b-form-input
                                class="modal__input"
                                v-model="professorName"
                                v-on:change="profDataChange('name', professorName)"
                            ></b-form-input>
                            <h6 class="modal__heading">Surname</h6>
                            <b-form-input
                                class="modal__input"
                                v-model="professorSurname"
                                v-on:change="profDataChange('surname', professorSurname)"
                            ></b-form-input>
                            <h6 class="modal__heading">Email</h6>
                            <b-form-input
                                class="modal__input"
                                v-model="professorEmail"
                                v-on:change="profDataChange('email', professorEmail)"
                            ></b-form-input>
                            <h6 class="modal__heading">Old password</h6>
                            <b-form-input class="modal__input" v-model="oldPassword" type="password"></b-form-input>
                            <h6 class="modal__heading" v-on:change="profDataChange('password', newPassword)">New password</h6>
                            <b-form-input class="modal__input" v-model="newPassword" type="password"></b-form-input>

                            <div class="d-flex justify-content-between" style="margin-top: 20px">
                                <b-button id="prof-profile-edit-btn" v-on:click="hideProfEditProfileModal">Cancel</b-button>
                                <b-button id="prof-profile-edit-btn" v-on:click="saveChanges">Save changes</b-button>
                            </div>
                            <h6 v-if="disableChangeProfData" class="text-center">
                                Wrong password (data wasn`t changed)
                            </h6>
                        </b-modal>
                    </div>
                </div>
                <div class="col-lg-7" style="margin-left: 40px">
                    <h5 style="color: #606060">My courses</h5>
                    <div v-for="course of professorCourses" :key="course.id">
                        <div class="course__descr">
                            <img src="http://placehold.it/70x70" />
                            <!-- <span class="course__name">{{course.name}}</span> -->
                            <router-link :to="{ name: 'GuestSingleCourse', params: { idCourse: course.id } }" class="course__name">{{
                                course.name
                            }}</router-link>
                            <!-- <span style="margin-left: 100px; margin-right: 0">Hidden</span> -->
                            <button class="btn__edit_course">
                                <router-link :to="{ name: 'ProfessorEditCourse', params: { idCourse: course.id } }" class="course__edit"
                                    >Edit</router-link
                                >
                            </button>
                        </div>
                    </div>
                    <div class="add-box">
                        <button class="btn btn-dark fs-6" id="add-btn" v-b-modal.modal-create-course></button>
                        <span style="margin-left: 10px"> New Course</span>
                        <b-modal
                            class="bg-secondary text-white"
                            ref="create_course_modal"
                            id="modal-create-course"
                            centered
                            title="BootstrapVue"
                            hide-footer
                        >
                            <template #modal-title>
                                Create Course
                            </template>
                            <img src="http://placehold.it/70x70" />
                            <h6 class="modal__heading">Name</h6>
                            <b-form-input class="modal__input" v-model="newCourse.name"></b-form-input>
                            <h6 class="modal__heading">Description</h6>
                            <b-form-input class="modal__input" v-model="newCourse.description"></b-form-input>

                            <h6 class="modal__heading">Category</h6>
                            <select v-model="newCourse.categoryId" style="margin-top: 10px">
                                <option v-for="courseCategory of courseCategories" :key="courseCategory.id">{{ courseCategory.id }}</option>
                            </select>
                            <!-- <h6 class="modal__heading">Password</h6>
                            <b-form-input class="modal__input" v-model="oldPassword" type="password"></b-form-input> -->

                            <div class="d-flex justify-content-between" style="margin-top: 20px">
                                <b-button id="prof-profile-edit-btn" v-on:click="hideProfEditProfileModal">Cancel</b-button>
                                <b-button id="prof-profile-edit-btn" v-on:click="createNewCourse">Save changes</b-button>
                            </div>
                            <h6 v-if="disableCourseAdd" class="text-center">
                                Wrong password (new course wasn`t created)
                            </h6>
                        </b-modal>
                        <!-- <router-link :to="{ name: 'ProfessorCreateCourse', params: {idProfessor:
                            professor.id }}" class="course__name">New Course
                        </router-link> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { getLectureById, patchLecture  } from '../services/LectureService';
// import { getAllUnits, getUnitById } from '../services/UnitService';
// import { getTopicById, getAllTopics, getTopicsByUnitId } from '../services/TopicService';
import { getProfessorById, patchProfessor, getProfessorCourses } from "../services/ProfessorService";
import { getAllCourseCategories } from "../services/CategoryService";
import { postCourse, patchCourseProfessors } from "../services/CourseService";

export default {
    data() {
        return {
            token: "",
            registeredPersonId: "",
            role: "",
            professor: {},
            professorName: "",
            professorSurname: "",
            professorEmail: "",
            oldPassword: "",
            newPassword: "",
            parameterObj: {},
            professorCourses: [],
            newCourse: {},
            courseCategories: [],
            disableCourseAdd: false,
            disableChangeProfData: false,
        };
    },
    props: ["idProfessor"],
    async created() {
        this.token = this.$cookies.get("token");
        this.registeredPersonId = this.$cookies.get("registeredPersonId");
        this.role = this.$cookies.get("role");

        await getProfessorById(this.registeredPersonId).then(res => {
            this.professor = res;
            this.professorName = res.name;
            this.professorSurname = res.surname;
            this.professorEmail = res.email;
        });

        await getProfessorCourses(this.professor.id).then(res => {
            this.professorCourses = res;
        });

        await getAllCourseCategories().then(res => {
            this.courseCategories = res;
        });
    },
    methods: {
        logOut() {
            this.$cookies.remove("token");
            // this.login = false;
            // this.token = this.$cookies.get("token")
        },
        hideProfEditProfileModal() {
            this.$refs["edit_profile_modal"].hide();
        },
        hideCreateCourseModal() {
            this.$refs["create_course_modal"].hide();
        },
        async saveChanges() {
            // console.log(this.parameterObj);
            if (this.oldPassword == this.professor.password) {
                await patchProfessor(this.professor.id, this.parameterObj, this.token).then(res => (this.professor = res));
                this.$refs["edit_profile_modal"].hide();
                this.disableChangeProfData = false;
            } else {
                this.disableChangeProfData = true;
            }
        },
        profDataChange(property, value) {
            let prop = property;
            prop = prop.charAt(0).toUpperCase() + prop.slice(1);
            // console.log(par);
            this.parameterObj[property] = value;
        },
        async createNewCourse() {
            // console.log(this.oldPassword);
            // console.log(this.professor.password);
            // if (this.oldPassword == this.professor.password) {
                this.newCourse.imagePath = "";
                await postCourse(this.newCourse).then(res => this.newCourse = res);
                this.hideCreateCourseModal();
                await patchCourseProfessors(this.newCourse.id, this.professor.id, this.token);
                this.professorCourses.push(this.newCourse);
                this.newCourse = {};
                // this.disableCourseAdd = false;
            // } else {
                // this.disableCourseAdd = true;
        },
        // createNewCourse() {
        //     this.$router.push({name:'ProfessorCreateCourse',
        //  params: {idProfessor: this.professor.id}});
        // }
    },
};
</script>

<style scoped>
* {
    color: #fff;
}
h5 {
    font-size: 18px;
    font-weight: normal;
}

p {
    font-size: 16px;
    margin-left: 10px;
    margin-bottom: 5px;
}
#btn_login {
    margin-top: 20px;
    width: 100%;
    background-color: #212121;
    height: 45px;
    font-size: 18px;
    border: 2px solid #4f4f4f;
}

.form-control {
    margin-top: 15px !important;
    margin-bottom: 5px !important;
}

.form-control:focus {
    border: 1px solid #ced4da !important;
    outline: none !important;
    box-shadow: 0 0 5px #212121 !important;
}

#search-btn {
    width: 35px !important;
    height: 20px !important;
    background-color: #404040 !important;
    margin-left: 0 !important;
}

#main {
    overflow-x: hidden !important;
    margin-right: calc(-1 * (100vw - 100%)) !important;
}

#search-input {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

#menu-btn {
    background-color: #000 !important;
    height: 20px !important;
    width: 80px !important;
    margin-left: 20px !important;
    line-height: 1 !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    box-shadow: none !important;
}
#menu-btn:focus,
#menu-btn:hover,
#menu-btn:active {
    box-shadow: none !important;
    border: 0 !important;
    outline: 0 !important;
}
#search-icon {
    display: block !important;
    font-size: 10px !important;
    margin-top: 1px !important;
    color: #606060 !important;
}

.last__btn {
    margin-right: 10px !important;
}

#edit-btn {
    width: 100% !important;
    font-size: 18px !important;
    border-radius: 0 !important;
    border: 1px solid #606060 !important;
}

.courses__link {
    margin-right: 20px !important;
    text-decoration: none !important;
    padding: 8px 16px !important;
}

.courses__link:hover {
    color: #a9a9a9 !important;
    cursor: pointer !important;
}

#content {
    margin-top: 50px !important;
    margin-left: 50px !important;
}

#professor__descr {
    margin-top: 10px !important;
}

#edit-profile:hover {
    cursor: pointer !important;
}

::v-deep #modal-center___BV_modal_body_ * {
    color: #fff !important;
    font-weight: normal !important;
}
::v-deep #modal-center___BV_modal_header_ * {
    color: #fff !important;
    font-weight: normal !important;
}

::v-deep .modal-content {
    background-color: #4f4f4f !important;
    color: #fff !important;
}

::v-deep #modal-center___BV_modal_header_ > button {
    width: 30px !important;
    height: 30px !important;
    font-size: 20px !important;
    background-color: #4f4f4f !important;
    color: #fff !important;
    border: none !important;
}

::v-deep #modal-create-course___BV_modal_header_ > button {
    width: 30px !important;
    height: 30px !important;
    font-size: 20px !important;
    background-color: #4f4f4f !important;
    color: #fff !important;
    border: none !important;
}

::v-deep #modal-create-course___BV_modal_body_ * {
    color: #fff !important;
    font-weight: normal !important;
}
::v-deep #modal-create-course___BV_modal_header_ * {
    color: #fff !important;
    font-weight: normal !important;
}

::v-deep .modal-content {
    background-color: #4f4f4f !important;
    color: #fff !important;
}

.modal__heading {
    margin: 10px 0 0 10px !important;
}

.modal__input {
    background-color: #4f4f4f !important;
    border: 0 !important;
    border-bottom: 2px solid #fff !important;
    border-radius: 0 !important;
    margin-top: 0 !important;
    padding-left: 10px !important;
}

.modal__input:focus {
    border: 0 !important;
    border-bottom: 2px solid #fff !important;
    box-shadow: none !important;
}

#prof-profile-edit-btn {
    width: 150px !important;
}

.course__descr {
    margin-bottom: 20px !important;
}

.course__name {
    margin-left: 20px !important;
    text-decoration: none !important;
}

.course__name:hover {
    color: #606060 !important;
}

#professor__descr > * {
    font-weight: normal !important;
}

#add-btn {
    border: 2px solid #a34255 !important;
    height: 70px !important;
    width: 70px !important;
    color: #a34255 !important;
    font-weight: bold !important;
    position: relative;
    border-radius: 0 !important;
}

#add-btn:after,
#add-btn:before {
    content: "";
    display: block;
    background-color: #a34255;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#add-btn:before {
    height: 50px;
    width: 10px;
}

#add-btn:after {
    height: 10px;
    width: 50px;
}

.add-box {
    margin-top: 15px !important;
}

select {
    display: inline-block !important;
    width: 100px !important;
    background-color: #4f4f4f !important;
    border: none !important;
    color: #fff !important;
    border-bottom: 2px solid #fff !important;
    padding-left: 3px !important;
    margin-bottom: 20px !important;
}

select:active,
select:hover,
select:focus {
    border: none !important;
    outline: none !important;
    border-bottom: 2px solid #4f4f4f !important;
    background-color: #4f4f4f !important;
    border-bottom: 2px solid #fff !important;
    cursor: pointer !important;
}

.btn__edit_course {
    /* margin-left: 80px !important; */
    float: right !important;
    margin-top: 20px !important;
    width: 100px !important;
    height: 40px !important;
    background-color: #4f4f4f !important;
    border: 1px solid #fff !important;
    box-shadow: none !important;
    /* text-align: center !important; */
}

.btn__edit_course:hover {
    background-color: #212121 !important;
}

.course__edit {
    text-decoration: none !important;
}

.course__edit {
    color: #fff !important;
}
</style>
