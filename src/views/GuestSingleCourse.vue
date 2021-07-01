<template>
    <div id="main">
        <nav class="navbar navbar-expand-lg" style="background-color: #212121">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1 font-weight-bold" 
                style="color: #A34255;">
                    <img src="http://placehold.it/30x20" alt="">
                    Knyaz Academy
                </span>
                <div class="collapse navbar-collapse justify-content-end">
                        <!-- <a class="nav-link fs-6 courses__link" aria-current="page" 
                        onclick="location.href='/'"
                        style="color: #fff; margin-right: 20px;">
                            Courses</a> -->
                        <router-link :to="{ name: 'GuestListCourses'}"
                        class="courses__link">Courses</router-link>
                        <!-- <a v-if="token!=null" class="nav-link fs-6 courses__link" aria-current="page" 
                        href="#" style="color: #fff; margin-right: 20px;">
                            Profile</a> -->
                        <router-link :to="{ name: 'ProfessorProfile', params: {idProfessor:
                        registeredPersonId }}"
                        class="courses__link">Profile</router-link>
                    <form class="d-flex">
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search"
                        style="background-color: #121212; border: none; height: 20px; 
                        color: #fff; padding: 0 10px" id="search-input">
                        <button class="btn" type="submit" id="search-btn">
                            <i class="fas fa-search" id="search-icon"></i>
                        </button>
                    </form>
                    <button v-if="token==null" class="btn btn-dark fs-6" id="menu-btn" 
                    v-b-modal.modal-center>Log in</button>
                    <button v-if="token!=null" class="btn btn-dark fs-6 last__btn" 
                    id="menu-btn" v-on:click="logOut">Log out</button>
                    <button v-if="token==null" class="btn btn-dark fs-6 last__btn" id="menu-btn">Register</button>
                </div>
            </div>
        </nav>
        <div class="course__header">
            <Loader v-if="loading1"/>
            <h1 id="course-name" style="color: #fff; margin-left: 35px"
            v-on:click="loadGeneralInfoAboutCourse">{{course.name}}</h1>
            <h6 style="color: #606060; margin-left: 35px"> {{this.course.categoryId}}</h6>
        </div>
        <div class="container-fluid" style="margin: 30px 0 0 20px; padding-right: 0">

            <div class="row">
                <div class="col-lg-3" style="padding: 0">  
                    <Loader v-if="loading3"/>
                    <CourseUnits @changePageContent="changePageContent"
                    v-for="unit of courseUnits" 
                    :unit="unit"
                    :selectedLectIndex="selectedLectIndex"
                    :selectedLectId="selectedLectId"
                    :key="unit.id" />
                </div>
                <div v-if="watchLecture==false" class="col-lg-6" style="margin-left: 50px; padding-right: 0">
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="course__descr">
                                <h5>
                                In this course you will learn: 
                                </h5>
                                <Loader v-if="loading1"/>
                                <p>{{course.description}}</p>
                            </div>
                            <div class="course__descr">
                                <h5>
                                    This course is made by:
                                </h5>    
                                <Loader v-if="loading4"/>
                                <p v-for="prof of professors"
                                    :key="prof.id"> - {{prof.name}} {{prof.surname}}<br></p> 
                            </div>
                            <div class="course__descr">
                                <h5>
                                    Details:
                                </h5> 
                                <div>
                                    <Loader v-if="loading5"/>
                                    <p v-else-if="!loading5">Lectures: {{lecturesCount}}</p>
                                </div>
                                <div>
                                    <Loader v-if="loading5"/>
                                    <p v-else-if="!loading5">Tasks: {{activitiesCount}}</p>
                                </div>
                            </div>     
                        </div>
                        <div class="col-lg-7">
                            <img src="http://placehold.it/250x250" alt="" style="float: right">
                        </div>
                    </div>
                    <button v-if="token==null" id="btn_login" v-b-modal.modal-center>
                        Log in to access this course</button>
                        <b-modal ref="modal_login_stud" id="modal-center" centered title="BootstrapVue" hide-footer>
                            <template #modal-title>
                            Log in Form (for students only)
                            </template>
                            <div class="d-block text-center">
                            <b-form-input placeholder="Enter your email"></b-form-input>
                            <b-form-input placeholder="Enter your password"></b-form-input>
                            <div class="button__prof_login">
                                <b-button id="prof_login" v-b-modal.modal-center-prof v-on:click="showProfessorModal">
                                    If you are a professor, click here</b-button>              
                            </div>
                            
                            <b-button id="cancel_button" v-on:click="hideStudentModal">Cancel</b-button>
                            <b-button id="login_button">Log in</b-button>       
                            </div>
                        <!-- <p class="my-4">Vertically centered modal!</p> -->
                        </b-modal>
                        <b-modal ref="modal_login_prof" id="modal-center-prof" centered title="BootstrapVue" hide-footer>
                            <template #modal-title>
                            Log in Form (for professors)
                            </template>
                            <div class="d-block text-center">
                            <b-form-input placeholder="Enter your email" v-model="emailProf" :state="loginStateProf"
                            aria-describedby="input-login-prof-feedback"></b-form-input>
                                <b-form-invalid-feedback id="input-login-prof-feedback">
                                Email must contain "@"
                                </b-form-invalid-feedback>
                            <b-form-input placeholder="Enter your password" v-model="passwordProf" 
                            :state="passwordStateProf" aria-describedby="input-password-prof-feedback"
                            type="password">
                            </b-form-input>
                                <b-form-invalid-feedback id="input-login-prof-feedback">
                                Password must contain at least 4 letters
                                </b-form-invalid-feedback>
                            <p v-if="!login" id="incorrent-info-to-login">{{msg}}</p>
                            <b-button id="cancel_button" v-on:click="hideProfessorModal">Cancel</b-button>
                            <b-button id="login_button" v-on:click="professorLogin">Log in</b-button>       
                            </div>
                        <!-- <p class="my-4">Vertically centered modal!</p> -->
                        </b-modal>
                    
                    <div class="user__comments">
                        <div class="user__comment">
                            <img src="../assets/images/commentator1.jpg" alt="" style="float: left">
                            <p>John Doe</p><br>
                            <p class="text__comment">Nice course, liked it so much</p>
                        </div>
                        <div class="user__comment">
                            <img src="../assets/images/commentator2.jpg" alt="" style="float: left">
                            <p>Kevin</p><br>
                            <p class="text__comment">The material is presented as clearly as possible</p>
                        </div>
                        <div class="user__comment">
                            <img src="../assets/images/commentator3.jpg" alt="" style="float: left">
                            <p>William Watkins</p><br>
                            <p class="text__comment">It is exactly what I wanted</p>
                        </div>
                    </div>
                    </div>

                    <div v-if="watchLecture==true" class="col-lg-7" style="margin-left: 50px">
                        <!-- <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" id="lectureVideo" 
                            src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                        </div> -->
                        <div class="lecture__content" id="lectId">
                            <!-- <p>Hello</p> -->

                        </div>
                        <div class="d-flex justify-content-between" style="margin-top: 20px">
                            <button v-on:click="changeLectureToPrev" class="button__change_lect">
                                <span class="lect_prev"> </span></button>
                            <h3 class="selected__lecture_title">{{selectedLectIndex+1}} {{selectedLect.name}}</h3>
                            <button v-on:click="changeLectureToNext" class="button__change_lect">
                                <span class="lect_next"> </span></button>
                        </div>
                    </div>

                    <!-- <div v-if="watchLecture==true" class="col-lg-2" style="margin-left: 25px">
                        <button class="btn btn-dark fs-6" 
                        id="edit-btn" v-on:click="editLecture">Edit</button> 
                    </div> -->

                    <!-- <div v-if="token!=null && watchLecture==false" class="col-lg-2" style="margin-left: 25px">             
                        <button class="btn btn-dark fs-6" 
                        id="edit-btn" v-on:click="editCourse"
                        >Edit</button> 
                        <div class="d-flex flex-column">  
                            <div class="add-box">
                                <button class="btn btn-dark fs-6" id="add-btn"></button>
                                <span style="margin-left: 10px;vertical-align: middle;
                                ">New Task</span>
                            </div>  
                            <div class="add-box">              
                                <button class="btn btn-dark fs-6" id="add-btn"></button>
                                <span style="margin-left: 10px">New Lecture</span>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
</template>

<script>
import { getCourseById, getCourseCategory, getUnitsByCourseId, getCourseProfessors,
getCourseLecturesCount} 
from '../services/CourseService';
import CourseUnits from "@/components/CourseUnits";

import { getLectureConstructs, sortByDisplayOrder } from "../services/LectureService";

import { getTopicsByUnitId} from "../services/UnitService"
import { loginProfessor } from "../services/ProfessorService"
import UnitTopics from "@/components/UnitTopics"
import Loader from "@/components/Loader"

import { getLecturesByTopicId} from "../services/TopicService"

export default {
    components: {
        CourseUnits,
        UnitTopics,
        Loader
    },
  props: ["idCourse"],
    data(){
    return {     
        course: {},
        courseCategory: {},
        courseUnits: [],
        professors: [],
        lecturesCount: 0,
        activitiesCount: 0,
        loading1: true,
        loading2: true,
        loading3: true,
        loading4: true,
        loading5: true,
        emailProf: '',
        passwordProf: '',
        login: true,
        token: '',
        msg: '',
        watchLecture: false,
        selectedLect: {},
        selectedLectIndex: 0,
        selectedTopicLect: [],
        selectedLectId: 0,
        registeredPersonId: '',
        lectureConstructs: []
        }
    },
    async created(){
        // this.token = this.$cookies.remove("token");
        this.token = this.$cookies.get("token");
        // console.log(this.token);
        this.registeredPersonId = this.$cookies.get("registeredPersonId");
        // console.log(this.registeredPersonId);
        await getCourseById(this.$props.idCourse).then(res => {
            this.course = res;
            this.loading1 = false;
        });
        
        // await getCourseCategory(this.course.categoryId).then(res => {   
        //     this.courseCategory = res;
        //     this.loading2 = false;
        // });

        await getUnitsByCourseId(this.$props.idCourse).then(res => {
            this.courseUnits = res;
            this.loading3 = false;
        });

        await getCourseProfessors(this.course.id).then(res => {
            this.professors = res;
            this.loading4 = false;
        });

    //     await getUnitsByCourseId(this.course.id).then(units => {
    //         return new Promise(async resolve => {
    //             await units.forEach(async unit => {
    //             await getTopicsByUnitId(unit.id).then(async topics => {
    //             await topics.forEach(async topic => {
    //                 await getLecturesByTopicId(topic.id).then(res => {
    //                     console.log("Hello");
    //                     this.lecturesCount += res.length;
    //                 });
    //             });
    //             resolve();
    //             }
    //         );
    //         })
    //     })
        await getCourseLecturesCount(this.course.id).then(res => { 
            this.lecturesCount = res[0], 
            this.activitiesCount = res[1];
            this.loading5 = false;
        })   
    },
    methods: {
        hideStudentModal() {
        this.$refs['modal_login_stud'].hide();
      },
        hideProfessorModal() {
            this.$refs['modal_login_prof'].hide();
        },
        showProfessorModal() {
            this.$refs['modal_login_stud'].hide();
            this.$refs['modal_login_prof'].show();
        },
        async professorLogin() {
            const result = await loginProfessor(this.emailProf, this.passwordProf);
            if (result.status == "200") {
                this.login = true;
                // this.token = result.data.token;
                // this.registeredProf = result.data;
                // console.log(result);
                this.registeredPersonId = result.data.id;
                // console.log(this.registeredPersonId);
                this.$cookies.set("token",result.data.token, Infinity);
                this.$cookies.set("role","professor", Infinity);
                this.$cookies.set("registeredPersonId", result.data.id, Infinity);
                // console.log(result.data.id);
                // console.log(this.$cookies.get("registeredPersonId"));
                this.hideProfessorModal();
                this.token = this.$cookies.get("token");
            } else {
                this.login = false;
                this.msg = result.data.message;
            }
        },
        editCourse() {
            this.$router.push({name:'ProfessorEditCourse', params: {idCourse: this.course.id}}); 
        },
        editLecture() {
            this.$router.push({name:'ProfessorEditLecture',
             params: {idLecture: this.selectedLect.id, idCourse: this.course.id}});
        },
        async changePageContent(obj) {
            this.watchLecture = true;
            // console.log(obj.selectedLecture);
            // console.log(obj.topicLectures);
            // this.selectedLecture = obj.selectedLecture;
            this.selectedTopicLect = obj.topicLectures;
            this.selectedLect = this.selectedTopicLect
            .find(l => l.name == obj.lectureName);
            this.selectedLectIndex = this.selectedTopicLect.indexOf(this.selectedLect);
            if (this.selectedLect.id) {
                this.selectedLectId = this.selectedLect.id;
            } else {
                this.selectedLectId = -1;
            }
            
            setTimeout(async () => {
                await this.displayLectureContent();
            }, 500);
            
            // console.log(lecture_content);
        },
        async changeLectureToPrev() {
            this.selectedLectIndex -= 1;
            if (this.selectedLectIndex < 0) {
                this.selectedLectIndex = this.selectedTopicLect.length-1;            
            }
            this.selectedLect = this.selectedTopicLect[this.selectedLectIndex];
            this.selectedLectId = this.selectedLect.id;

            await this.displayLectureContent();
        },
        async changeLectureToNext() {
            this.selectedLectIndex += 1;
            if (this.selectedLectIndex > this.selectedTopicLect.length-1) {
                this.selectedLectIndex = 0;
            }
            this.selectedLect = this.selectedTopicLect[this.selectedLectIndex];
            this.selectedLectId = this.selectedLect.id;

            await this.displayLectureContent();
        },
        loadGeneralInfoAboutCourse() {
            this.watchLecture = false;
            this.selectedLectIndex = -1;
        },
        logOut() {
            this.$cookies.remove("token");
            this.$cookies.remove("role");
            this.$cookies.remove("registeredPersonId");
            this.token = this.$cookies.get("token");
            this.login = false;
            // this.token = this.$cookies.get("token");
        },
        async displayLectureContent() {
            let lecture_content = document.querySelector(".lecture__content");
                
                while (lecture_content.firstChild) {
                    lecture_content.removeChild(lecture_content.firstChild);
                }

                await getLectureConstructs(this.selectedLectId).then(res => this.lectureConstructs = res.sort(sortByDisplayOrder));

                await this.lectureConstructs.forEach(c => {
                    // console.log(c.content);
                if (c.constructTypeId == "Markdown") {
                    let paragraph = document.createElement("p");
                    paragraph.innerText = c.content;
                    paragraph.classList.add("construct__markdown");
                    lecture_content.insertAdjacentElement('beforeend', paragraph);
                    // lecture_content.insertAdjacentHTML('beforeend', '<hr></hr')
                } else {
                    let div = document.createElement("div");
                    div.classList.add("embed-responsive", "embed-responsive-16by9");
                    let iframe = document.createElement("iframe");
                    iframe.setAttribute("id", "lectureVideo");
                    iframe.classList.add("embed-responsive-item");
                    iframe.src = c.content;
                    div.appendChild(iframe);
                    lecture_content.insertAdjacentElement('beforeend', div)
                }                 
                lecture_content.insertAdjacentHTML('beforeend', '<hr></hr')
            }); 
        }
    },
    computed: {
        loginStateProf() {
            return this.emailProf.includes("@") ? true : false
        },
        passwordStateProf() {
            return this.passwordProf.length >=4 ? true : false;
        },
        getLectureConstructs() {
            return 
        },
    }
    // methods: {
    //     openModal: function() {
    //         // console.log("Hello");
    //         const fade = document.querySelector(".fade:not(.show)"),
    //             modal = document.querySelector(".modal"),
    //             main = document.querySelector("#main");
    //         fade.style.opacity = 1;
    //         modal.style.display = "block";
    //     }
    // }
  }
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
    .course__header {
        height: 80px;
    }
    .course__descr {
        height: 65px
    }
    #btn_login {
        margin-top:20px;
        width: 100%;
        background-color: #212121;
        height: 45px;
        font-size: 18px;
        border: 2px solid #4F4F4F;
    }
    /* button:hover, button:focus, button:active, button:link {
        border: 2px solid #4F4F4F !important;
        outline: none !important;
    } */
    .user__comments {
        margin-top: 35px;
        width: 100%;
    }
    .user__comment {
        margin-bottom: 25px;
        background-color: #121212;
        height: 80px;
    }

    .user__comment p {
        display: inline-block;
    }
    .text__comment {
        margin-left: 20px;
        font-size: 14px;
    }
    /* .modal-dialog {
        color: #212121 !important;
    } */
    /* .modal-content {
        color: #212121 !important;
    }
    .modal-title {
        color: #212121 !important;
    } */
    #modal-center___BV_modal_outer_{
        color: #212121 !important;
    }
    #modal-center___BV_modal_body_ * {
        color: #212121 !important;
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
    #cancel_button, #login_button {
        color: #fff !important;
        margin-bottom: 15px !important;
        margin-top: 15px !important;
    }
    #cancel_button {
        margin-right: 20px !important;
    }
    .button__prof_login {
        margin: 5px 0 10px 0 !important;
    }
    #prof_login {
        background-color: #fff !important;
        font-size: 14px !important;
        border: none !important;
    }
    #prof_login:focus, #prof_login:active, #prof_login:hover{
        margin-top: 0 !important;
        background-color: #fff !important;
        font-size: 14px !important;
        border: none !important;
        box-shadow: none !important;
    }

    #modal-center-prof___BV_modal_outer_ {
        color: #212121 !important;
    }

    #incorrent-info-to-login {
        font-size: 0.875em !important;;
        color: #dc3545 !important;
        /* visibility: hidden !important; */
    }

    #search-btn {
        width: 35px !important;
        height: 20px !important;
        background-color: #404040 !important;
        margin-left: 0 !important;
    }

    #main {
        /* overflow: hidden !important; */
        overflow-x: hidden !important;
        /* margin-left: calc(100vw - 100%) !important;
        margin-right: 0 !important; */
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
    #menu-btn:focus, #menu-btn:hover, #menu-btn:active {
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

    #add-btn {
        border: 2px solid #A34255 !important;
        height: 50px !important;
        width: 50px !important;
        color: #A34255 !important;
        font-weight: bold !important;
        position: relative;
    }
    
    #add-btn:after, #add-btn:before {
        content: "";
		display: block;
		background-color: #A34255;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
    }

    #add-btn:before {
		height: 35px;
		width: 7px;
	}

	#add-btn:after {
		height: 7px;
		width: 35px;
	}

    .add-box {
        margin-top: 15px !important;
    }

    .courses__link {
        margin-right: 20px !important;
        text-decoration: none !important;
        padding: 8px 16px !important;
    }

    .courses__link:hover {
        color: #A9A9A9 !important;
        cursor: pointer !important;
    }

    ::v-deep #lectureVideo {
        display: block !important;
        width: 100% !important;
        height: 400px !important;
        margin-bottom: 30px !important;
    }

    .selected__lecture_title {
        color: #A9A9A9 !important;
        font-weight: normal !important;
        text-align: center !important;
        margin-top: 15px !important;
    }

    .button__change_lect {
        width: 100px !important;
        background-color: #A34255 !important;
        border: 0 !important;
        outline: 0 !important;

    }
    .lect_prev {
        display: inline-block !important;
        /* color: #fff !important; */
        width: 0 !important;
        height: 0 !important;
        border-top: 10px solid transparent !important;
        border-right: 20px solid #fff !important;
        border-bottom: 10px solid transparent !important;
        vertical-align: middle;
    }

    .lect_next {
        display: inline-block !important;
        width: 0 !important;
        height: 0 !important;
        border-top: 10px solid transparent !important;
        border-left: 20px solid #fff !important;
        border-bottom: 10px solid transparent !important;
        vertical-align: middle !important;
    }
    #course-name {
        color: #fff !important; 
        margin-left: 35px !important; 
    }

    #course-name:hover {
        color: #A9A9A9 !important;
        cursor: pointer !important; 
    }

    .lecture__content {
        width: 100% !important;
        height: 500px !important;
        /* background-color: #A34255 !important; */
        border: 3px solid  #A34255 !important;
        overflow-y: scroll !important;
        overflow-x: hidden !important;

    }
    .lecture__content::-webkit-scrollbar {
        width: 5px !important;
    }

    .lecture__content::-webkit-scrollbar-thumb {
        background-color: darkgrey !important;
    }

    ::v-deep .control__area {
        margin-top: 20px !important;
        margin-bottom: 20px !important;
        border: 2px solid #606060 !important;
        background-color: #121212 !important;
        resize: none !important;
        color: #fff !important;
        font-size: 18px !important;
    }

    ::v-deep .control__area:focus {
        box-shadow: none !important;
        border: 2px solid #606060 !important;
    }

    ::v-deep .construct__markdown {
        text-align: center !important;
        font-size: 18px !important;
        padding: 15px !important; 
    }
</style>