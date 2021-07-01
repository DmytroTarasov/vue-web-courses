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
                        <router-link :to="{ name: 'GuestListCourses'}"
                        class="courses__link">Courses</router-link>
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
        <div class="content__edit_page">
            <div class="row">
                <div class="col-lg-2">
                    <button class="btn btn-dark fs-6 btn__edit_page" v-on:click="cancelEdit">Cancel</button>
                    <button class="btn btn-dark fs-6 btn__edit_page"
                    v-on:click="updateCourse">Save</button>
                    <hr class="hr__edit_page">
                    <button class="btn btn-dark fs-6 btn__edit_page"
                    v-on:click="deleteCourse">Delete</button>
                </div>
                <div class="col-lg-8" style="margin-left: 60px">
                    <div class="row">
                        <div class="col-lg-5">
                            <img src="http://placehold.it/350x300" alt="" style="float: left">
                        </div>
                        <div class="col-lg-7">
                            <h5 class="edit__course_descr">Category</h5>
                            <!-- <h5 class="edit__course_descr">{{course.categoryId}}</h5> -->
                            <select v-model="course.categoryId" v-on:change="courseDataChange('categoryId', 
                            course.categoryId)">
                                <option v-for="courseCategory of courseCategories" 
                                :key="courseCategory.id">{{courseCategory.id}}</option>
                            </select> 
                            <h5 class="edit__course_descr">Title</h5>
                            <input v-model="course.name" type="text" class="form-control" id="inputCourseTitle"
                            v-on:change="courseDataChange('name', course.name)">
                        </div>
                    </div>
                    <h5 class="edit__course_descr" style="margin-top: 20px">Description</h5>
                    <textarea v-model="course.description" class="form-control" id="courseDescription" rows="6"
                    placeholder="What students will learn..." v-on:change="courseDataChange('description', course.description)">
                    </textarea>

                    <h4 style="margin-top: 50px">Units</h4>
                    <div v-for="(unit,index) of courseUnits" :key="unit.id" :index="index"
                    style="margin-top: 50px">
                        <div style="margin-bottom: 50px">
                            <div class="row">
                                <div class="col-lg-4">
                                    <h5>{{index+1}} {{unit.name}}</h5>
                                </div>
                                <div class="col-lg-6">
                                    <button class="btn__edit_delete" v-on:click="editUnit(unit.id)">Edit</button>
                                </div>
                                <div class="col-lg-2">
                                    <button class="btn__edit_delete">Delete</button>
                                </div>
                      
                            </div>  
                        </div>  
                    </div>
                    <div style="margin-bottom: 100px">
                        <button class="btn btn-dark fs-6" id="add-btn"
                        v-b-modal.modal-create-unit></button>                  
                        <span style="margin-left: 10px; font-size: 1.25rem; color: #fff">
                        New Unit</span>
                    </div>
                       
                    <b-modal class="bg-secondary text-white" ref="create_unit_modal" id="modal-create-unit" 
                    centered title="BootstrapVue" hide-footer>
                        <template #modal-title>
                            Create Unit
                        </template>
                        
                        <h6 class="modal__heading">Name</h6>
                        <b-form-input class="modal__input" 
                        v-model="newUnit.name"></b-form-input>
                        <h6 class="modal__heading">Description</h6>
                        <b-form-input class="modal__input"
                        v-model="newUnit.description"></b-form-input>
                        <!-- <h6 class="modal__heading">Password</h6>
                        <b-form-input class="modal__input"
                        v-model="password" type="password"></b-form-input> -->
                        
                        <div class="d-flex justify-content-between" style="margin-top: 20px">
                            <b-button id="create-unit-btn" v-on:click="hideCreateUnitModal">Cancel</b-button>
                            <b-button id="create-unit-btn"
                            v-on:click="createNewUnit">Save changes</b-button>  
                        </div>     
                        <h6 v-if="disableUnitAdd" class="text-center">
                            Wrong password (new unit wasn`t created)</h6>
                    </b-modal>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
import { getAllCourseCategories  } from '../services/CategoryService';
import { postUnit  } from '../services/UnitService';
import { getCourseById, patchCourse, deleteCourseById, getUnitsByCourseId} 
from '../services/CourseService';

import { getProfessorById } from '../services/ProfessorService';
    export default {
        data() {
            return {
                token: '',
                registeredPersonId: '',
                courseCategories: [],
                course: {},
                courseUnits: [],
                newUnit: {},
                password: '',
                disableUnitAdd: false,
                professor: {},
                parameterObj: {},
            }
        },
        props: ["idCourse"],
        async created(){
            this.token = this.$cookies.get("token");
            this.registeredPersonId = this.$cookies.get("registeredPersonId");
            // console.log(this.token);

            await getCourseById(this.$props.idCourse).then(res => {
                this.course = res;
            });
           
            await getAllCourseCategories().then(res => {
                this.courseCategories = res;
            });
            // this.courseTitle = this.course.name;

            await getProfessorById(this.registeredPersonId).then(res => this.professor = res);

            await getUnitsByCourseId(this.course.id).then(res => this.courseUnits = res);
        },
        methods: {
            logOut(){
                this.$cookies.remove("token");
                // this.token = this.$cookies.get("token");
                this.$router.push({name:'GuestSingleCourse', params: {idCourse: this.course.id}}); 
            },
            cancelEdit() {
                this.$router.push({name:'GuestSingleCourse', params: {idCourse: this.course.id}}); 
            },
            courseDataChange(property, value) {
                let prop = property;
                prop = prop.charAt(0).toUpperCase() + prop.slice(1);
                this.parameterObj[property] = value;
            },
            async updateCourse() {
                await patchCourse(this.course.id, this.parameterObj, this.token)
                .then(res => this.course = res);
                // this.$refs['create_unit_modal'].hide();
            },
            // updateCourse() {
            //     patchCourse(this.course.id, this.course.categoryId, 
            //     this.course.name, this.course.description, this.token);
            //     // console.log(response);
            // },
            deleteCourse() {
                deleteCourseById(this.course.id);
                this.$router.push({name:'GuestListCourses'}); 
            },
            hideCreateUnitModal() {
                this.$refs['create_unit_modal'].hide();
            },
            async createNewUnit() {
                // console.log(this.password);
                // console.log(this.registeredPersonId);
                // if (this.password == this.professor.password) {
                    this.newUnit.courseId = this.course.id;
                    this.newUnit.imagePath = "";
                    await postUnit(this.newUnit);
                    // await getUnitsByCourseId(this.course.id).then(res => this.courseUnits = res);
                    this.courseUnits.push(this.newUnit);
                    // this.disableUnitAdd = false;
                    this.hideCreateUnitModal();
                    this.newUnit = {};
                // } else{
                //     this.disableUnitAdd = true;
                // }
            },
            editUnit(id) {
                // console.log(id);
                this.$router.push({name:'ProfessorEditUnit',
             params: {idCourse: this.course.id, idUnit: id}});
            }
        }
    }
</script>

<style scoped>

    h1, h2, h3, h4, h5, h6 {
        color: #fff !important;
        font-weight: normal !important;
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

    .content__edit_page {
        margin-top: 40px !important; 
        margin-left: 30px !important;
    }

    .btn__edit_page {
        width: 100% !important;
        border-radius: 0 !important;
        border: 1px solid #606060 !important;
        /* margin-bottom: 10px !important; */
        margin-bottom: 20px !important;

    }

    .hr__edit_page {
        display: block !important;
        color: #606060 !important;
        height: 3px !important;
        margin-bottom: 20px !important;
        margin-top: 0 !important;
        /* margin-top: 20px !important; */
    }

    .edit__course_descr {
        color: #A9A9A9 !important;
    }

    select {
        display: inline-block !important;
        width: 100px !important;
        background-color: #212121 !important;
        border: none !important;
        color: #fff !important;
        border-bottom: 2px solid #606060 !important;
        padding-left: 3px !important;
        margin-bottom: 20px !important;
    }

    select:active, select:link, select:hover, select:focus {
        border: none !important;
        outline: none !important;
        border-bottom: 2px solid #606060 !important;
        /* background-color: #606060 !important; */
        cursor: pointer !important;
    }
/* 
    .option, .option:hover, .option:focus {
        background-color: #606060 !important;
        cursor: pointer !important;
        color: #4F4F !important;
    } */
    #inputCourseTitle {
        background-color: #212121;
        color: #fff !important;
        border: none !important;
        border-bottom: 2px solid #606060 !important;
        border-radius: 0 !important;
        padding-left: 5px !important;
        width: 80% !important;
    }

    #inputCourseTitle:focus, #inputCourseTitle:hover {
        border: none !important;
        border-bottom: 2px solid #606060 !important;
        box-shadow: none !important;
        outline: 0 !important;
    }

    #courseDescription {
        margin-top: 20px !important;
        width: 100% !important;
        border: 2px solid #606060 !important;
        background-color: #121212 !important;
        resize: none !important;
        color: #fff !important;
        font-size: 18px !important;
    }

    #courseDescription:hover, #courseDescription:focus {
        box-shadow: none !important;
        font-size: 18px !important;
    }

    .courses__link {
        margin-right: 20px !important;
        text-decoration: none !important;
        padding: 8px 16px !important;
        color: #fff !important;
    }

    .courses__link:hover {
        color: #A9A9A9 !important;
        cursor: pointer !important;
    }

    .btn__edit_delete {
        /* margin-left: 80px !important; */
        float: right !important;
        /* margin-top: 20px !important; */
        width: 100px !important;
        height: 40px !important;
        background-color: #4F4F4F !important;
        border: 1px solid #fff !important;
        box-shadow: none !important;
        color: #fff !important;
        /* text-align: center !important; */
    }

    .btn__edit_delete:hover {
        background-color: #212121 !important;
    }

    #add-btn {
        border: 2px solid #A34255 !important;
        height: 60px !important;
        width: 60px !important;
        color: #A34255 !important;
        font-weight: bold !important;
        position: relative;
        border-radius: 0 !important;
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
		height: 50px;
		width: 10px;
	}

	#add-btn:after {
		height: 10px;
		width: 50px;
	}

    .modal__input {
        background-color: #4F4F4F !important;
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

    .modal__heading {
        margin: 10px 0 0 10px !important;
    }

    ::v-deep #modal-create-unit___BV_modal_body_ * {
        color: #fff !important;
        font-weight: normal !important;
    }
    ::v-deep #modal-create-unit___BV_modal_header_ *{
        color: #fff !important;
        font-weight: normal !important;
    }

    ::v-deep .modal-content {
        background-color: #4F4F4F !important;
        color: #fff !important;
    }

    ::v-deep #modal-create-unit___BV_modal_header_ > button {
        width: 30px !important;
        height: 30px !important;
        font-size: 20px !important;
        background-color: #4F4F4F !important;
        color: #fff !important;
        border: none !important;
    }

</style>