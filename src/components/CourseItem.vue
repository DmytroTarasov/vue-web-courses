<template>
    <div class="p-2 bd-highlight" >
        <div class="d-flex justify-content-start" style="flex-wrap: wrap">
            <div v-for="course of courses" 
                    :key="course.id" style="max-width: 170px">
            <img src="http://placehold.it/150x150" alt="" style="margin-left: 10px;
                margin-right: 10px">
            <span class="course__info">
            <!-- <a href="/guest-course-{{course.name}}">{{course.name}}</a> -->
            <!-- <router-link :to="`/guest-course-${course.name}`">{{course.name}}</router-link> -->
                <router-link :to="{ name: 'GuestSingleCourse', params: {idCourse: course.id}}"
                class="course__link">{{course.name}}</router-link>
            </span>         
            </div>   
        </div>   
    </div>
</template>

<script>
    export default {
        props: {
            courses: {
                type: Array,
                required: true
            }
        },
    }
</script>

<style> 
    .course__info {
        display: block;
        text-align: center;
    }

    .course__link {
        color: #fff;
        text-decoration: none;
    }

    .course__link:hover {
        color: 	#989898;
    }

</style>