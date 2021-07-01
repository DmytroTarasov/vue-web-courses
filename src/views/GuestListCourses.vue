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
                        <!-- <a class="nav-link fs-6" aria-current="page" href="#" style="color: #fff; margin-right: 20px;">
                            Courses</a> -->
                        <router-link :to="{ name: 'GuestListCourses'}"
                        class="courses__link" onclick="location.reload()">Courses</router-link>
                        <a v-if="token!=null" class="nav-link fs-6 courses__link" aria-current="page" 
                        href="#" style="color: #fff; margin-right: 20px;">
                            Profile</a>

                    <form class="d-flex">
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search"
                        style="background-color: #121212; border: none; height: 20px; 
                        color: #fff; padding: 0 10px">
                        <button class="btn" type="submit" style="width: 35px; height: 20px; background-color: #404040">
                            <i class="fas fa-search" style="display: block; font-size: 10px; margin-top: 1px; 
                            color: #606060"></i>
                        </button>
                    </form>
                    <button v-if="token==null" class="btn btn-dark fs-6" id="menu-btn">Log in</button>
                    <button v-if="token!=null" class="btn btn-dark fs-6 last__btn" id="menu-btn">Log out</button>
                    <button v-if="token==null" class="btn btn-dark fs-6 last__btn" id="menu-btn">Register</button>
                </div>
            </div>
        </nav>
        <div class="container" style="max-width: 900px">
            <h1 v-if="token!=null" style="color: #4F4F4F">My Courses:</h1>
            <div style="height:auto">
                <CourseItem 
                    v-bind:courses="registeredPersonCourses" />  
            </div>
            <h1 style="color: #4F4F4F">Popular Courses:</h1>
            <div style="height:auto; min-height:190px; ">
                <CourseItem 
                    v-bind:courses="popularCourses" />  
                <!-- <CourseItem 
                v-for="course of courses" 
                :course="course"
                :key="course.id" /> -->
            </div>
            <div class="row">
                    <div class="col-lg-9">
                    <h1 style="color: #4F4F4F">Courses of category: {{filter}}</h1>           
                    </div>           
                <div class="col-lg-3">
                    <select v-model="filter">
                        <option>All</option>
                        <option v-for="courseCategory of courseCategories" 
                        :key="courseCategory.id">{{courseCategory.id}}</option>
                    </select> 
                </div>           
            </div> 
            <div style="height:auto; min-height:190px; ">
            <CourseItem 
                v-bind:courses="filteredCoursesByCategory" />
            </div>   
        </div>
    </div>
</template>

<script>
import CourseItem from '@/components/CourseItem';
import { getCourses, getFilteredCoursesByCategory,
getPopularCourses } from '../services/CourseService';
import { getProfessorCourses } from '../services/ProfessorService';

import { getAllCourseCategories } from '../services/CategoryService';
// import Loader from "@/components/Loader"
export default {
    components: {
        CourseItem,
    },
    data(){
        return{
        courses: [],
        popularCourses: [],
        courseCategories: [],
        filteredCourses: [],
        filter: "All",
        token: '',
        registeredPersonId: '',
        role: '',
        registeredPersonCourses: []
        }
    },

    async created(){
        this.token = this.$cookies.get("token");
        this.registeredPersonId = this.$cookies.get("registeredPersonId");
        this.role = this.$cookies.get("role");
        
        await getCourses().then(res => {
            this.courses = res;
        });

        await getPopularCourses().then(res => {
            this.popularCourses = res;
        });

        await getAllCourseCategories().then(res => {
            this.courseCategories = res;
        });

        if (this.role == "professor") {
            await getProfessorCourses(this.registeredPersonId).then(res => this.registeredPersonCourses = res);
        }

    },
    watch: {
        filter(value) {
            this.filter = value;
        }
    },
    computed: {
        filteredCoursesByCategory() {
            if (this.filter != "All") {
                getFilteredCoursesByCategory(this.filter).then(res => {
                this.filteredCourses = res;      
                // this.loading = false;     
                });
                return this.filteredCourses;    
            } else {
                // this.loading = false;     
                return this.courses;       
            }
        }
    }
}
</script>

<style scoped>
    select {
        display: inline-block !important;
        width: 100px !important;
        background-color: #212121 !important;
        border: none !important;
        color: #fff !important;
        border-bottom: 2px solid #fff !important;
        padding-left: 3px !important;
        margin-top: 7% !important;
    }
    /* option {
        background-color: #212121 !important;
    }
    option:focus, option:hover, option:active, option:link {
        background-color: #212121 !important;
    } */
    select:active, select:link, select:hover, select:focus {
        border: none !important;
        outline: none !important;
        border-bottom: 2px solid #fff !important;
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

    .last__btn {
        margin-right: 10px !important;
    }

    #menu-btn {
        background-color: #000 !important;
        height: 20px !important;
        width: 80px !important;
        margin-left: 20px !important;
        line-height: 1 !important; 
        padding: 0 !important;
    }

    #main {
        overflow-x: hidden !important;
        /* margin-right: calc(-1 * (100vw - 100%)) !important; */
        margin-right: calc(-1 * (100vw - 100%)) !important;
    }
</style>

