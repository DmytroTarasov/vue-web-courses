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
        <div class="content__edit_page">
            <div class="row">
                <div class="col-lg-2">
                    <button class="btn btn-dark fs-6 btn__edit_page" v-on:click="cancelEdit">Cancel</button>
                    <button class="btn btn-dark fs-6 btn__edit_page"
                    v-on:click="updateUnit">Save</button>
                    <hr class="hr__edit_page">
                    <button class="btn btn-dark fs-6 btn__edit_page"
                    v-on:click="deleteUnit">Delete</button>
                </div>
                <div class="col-lg-8" style="margin-left: 60px">
                    <div class="row">
                        <div class="col-lg-8">
                            <h5 class="edit__unit_descr">Name</h5>
                            <!-- <h5 class="edit__unit_descr">{{course.categoryId}}</h5> -->
                            <input v-model="unit.name" type="text" class="form-control" id="inputUnitName"
                            v-on:change="unitDataChange('name', unit.name)">
                            <h5 class="edit__unit_descr">Description</h5>
                            <input v-model="unit.description" type="text" class="form-control" id="inputUnitDescr"
                            v-on:change="unitDataChange('description', unit.description)">
                        </div>
                    </div>

                    <h4 style="margin-top: 50px">Topics</h4>
                    <div v-for="(topic,index) of unitTopics" :key="topic.id" :index="index"
                    style="margin-top: 50px">
                        <div style="margin-bottom: 50px">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h5>{{index+1}} {{topic.name}}</h5>
                                </div>
                                <div class="col-lg-4">
                                    <button class="btn__edit_delete"
                                    v-on:click="editTopic(topic.id)">Edit</button>
                                </div>
                                <div class="col-lg-2">
                                    <button class="btn__edit_delete">Delete</button>
                                </div>
                      
                            </div>  
                        </div>  
                    </div>
                    <div style="margin-bottom: 100px">
                        <button class="btn btn-dark fs-6" id="add-btn"
                        v-b-modal.modal-create-topic></button>                  
                        <span style="margin-left: 10px; font-size: 1.25rem; color: #fff">
                        New Topic</span>
                    </div>
                       
                    <b-modal class="bg-secondary text-white" ref="create_topic_modal" id="modal-create-topic" 
                    centered title="BootstrapVue" hide-footer>
                        <template #modal-title>
                            Create Topic
                        </template>
                        
                        <h6 class="modal__heading">Name</h6>
                        <b-form-input class="modal__input" 
                        v-model="newTopic.name"></b-form-input>
                        <h6 class="modal__heading">Description</h6>
                        <b-form-input class="modal__input"
                        v-model="newTopic.description"></b-form-input>
                        <!-- <h6 class="modal__heading">Password</h6>
                        <b-form-input class="modal__input"
                        v-model="password" type="password"></b-form-input> -->
                        
                        <div class="d-flex justify-content-between" style="margin-top: 20px">
                            <b-button v-on:click="hideCreateTopicModal">Cancel</b-button>
                            <b-button v-on:click="createNewTopic">Save changes</b-button>  
                        </div>     
                        <h6 v-if="disableTopicAdd" class="text-center">
                            Wrong password (new topic wasn`t created)</h6>
                    </b-modal>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>

import { getUnitById, getTopicsByUnitId, patchUnit  } from '../services/UnitService';

import { postTopic  } from '../services/TopicService';

import { getProfessorById } from '../services/ProfessorService';
    export default {
        data() {
            return {
                token: '',
                registeredPersonId: '',
                unit: {},
                unitTopics: [],
                newTopic: {},
                password: '',
                disableTopicAdd: false,
                professor: {},
                parameterObj: {},
            }
        },
        props: ["idCourse", "idUnit"],
        async created(){
            this.token = this.$cookies.get("token");
            this.registeredPersonId = this.$cookies.get("registeredPersonId");
            await getUnitById(this.$props.idUnit).then(res => {
                this.unit = res;
            });

            await getProfessorById(this.registeredPersonId).then(res => this.professor = res);

            await getTopicsByUnitId(this.unit.id).then(res => this.unitTopics = res);
        },
        methods: {
            logOut(){
                this.$cookies.remove("token");
                this.$router.push({name:'GuestSingleCourse', params: {idCourse: this.$props.idCourse}}); 
            },
            cancelEdit() {
                this.$router.push({name:'ProfessorEditCourse', params: {idCourse: this.$props.idCourse}}); 
            },
            deleteUnit() {
                // deleteCourseById(this.course.id);
                // this.$router.push({name:'GuestListCourses'}); 
            },
            hideCreateTopicModal() {
                this.$refs['create_topic_modal'].hide();
            },
            unitDataChange(property, value) {
                let prop = property;
                prop = prop.charAt(0).toUpperCase() + prop.slice(1);
                // console.log(par);
                this.parameterObj[property] = value;
            },
            async updateUnit() {
                await patchUnit(this.unit.id, this.parameterObj, this.token)
                .then(res => this.unit = res);
                // this.$refs['create_unit_modal'].hide();
            },
            editTopic(id) {
                this.$router.push({name:'ProfessorEditTopic', params: {idCourse: this.$props.idCourse,
                idUnit: this.unit.id, idTopic: id}}); 
            },
            async createNewTopic() {
                // console.log(this.professor);
                // if (this.password == this.professor.password) {
                    this.newTopic.unitId = this.unit.id;
                    await postTopic(this.newTopic);
                    // await getTopicsByUnitId(this.unit.id).then(res => this.unitTopics = res);
                    this.unitTopics.push(this.newTopic);
                    // this.disableTopicAdd = false;
                    this.hideCreateTopicModal();
                    this.newTopic = {};
                // } else{
                //     this.disableTopicAdd = true;
                // }
            },
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
        /* color: #4F4F4F !important; */
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

    .edit__unit_descr {
        color: #A9A9A9 !important;
        margin-top: 20px !important;
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
    #inputUnitName {
        background-color: #212121;
        color: #fff !important;
        border: none !important;
        border-bottom: 2px solid #606060 !important;
        border-radius: 0 !important;
        padding-left: 5px !important;
        width: 80% !important;
    }

    #inputUnitName:focus, #inputUnitName:hover {
        border: none !important;
        border-bottom: 2px solid #606060 !important;
        box-shadow: none !important;
        outline: 0 !important;
    }

        #inputUnitDescr {
        background-color: #212121;
        color: #fff !important;
        border: none !important;
        border-bottom: 2px solid #606060 !important;
        border-radius: 0 !important;
        padding-left: 5px !important;
        width: 80% !important;
    }

    #inputUnitDescr:focus, #inputUnitDescr:hover {
        border: none !important;
        border-bottom: 2px solid #606060 !important;
        box-shadow: none !important;
        outline: 0 !important;
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

    ::v-deep #modal-create-topic___BV_modal_body_ * {
        color: #fff !important;
        font-weight: normal !important;
    }
    ::v-deep #modal-create-topic___BV_modal_header_ *{
        color: #fff !important;
        font-weight: normal !important;
    }

    ::v-deep .modal-content {
        background-color: #4F4F4F !important;
        color: #fff !important;
    }

    ::v-deep #modal-create-topic___BV_modal_header_ > button {
        width: 30px !important;
        height: 30px !important;
        font-size: 20px !important;
        background-color: #4F4F4F !important;
        color: #fff !important;
        border: none !important;
    }

</style>