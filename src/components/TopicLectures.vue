<template>
    <div class="container-fluid" style="max-width: 420px; padding: 0 0 0 15px; ">
        <b-nav-text>
            <span class="lecture__name" v-on:click="watchLecture">
                 {{index+1}} {{lecture.name}} 
                <img v-if="selectedLectIndex==index && selectedLectId==lecture.id
                && selectedLectIndex!=-1" src="../icons/eye-regular.svg"></span>
            <p class="lecture__paragraph">Ipsum blandit porta leo aliquet.</p>
        </b-nav-text>
    </div>
</template>

<script>
    // import TopicLectures from "@/components/TopicLectures"
    // import { getLecturesByTopicId} from "../services/TopicService"
    export default {
        // components: {
        //     TopicLectures
        // },
        // v-if="selectedLectIndex==index"
        props: {
            lecture: {
                type: Object,
                required: true
            },
            index: {
                type: Number, 
                required: true
            },
            selectedLectIndex: {
                type: Number,  
                required: true
            },
            selectedLectId: {
                type: Number, 
                required: true
            }
        },
        // data() {
        //     return {
        //         selectedLectIndex: ""
        //     }
        // },
        // created() {     
        //     if (this.$root.selectedLectIndex) {
        //         this.selectedLectIndex = this.$root.selectedLectIndex;
        //     }
        // },
        methods: {
            watchLecture() {
                this.$emit('changePageContent', this.lecture.name);
                // console.log(this.$root.selectedLectIndex);
                // console.log(selectedLectIndex);
                // getSelectLectIndex()
            }
        }
    }
        // }, created() {
        //     document.addEventListener("touchstart", event => {
        //     }, { passive: true });
        // }
        // data(){
        //     return{     
        //         topicLectures: []
        //     }
        // },
        // async created(){
        //     await getLecturesByTopicId(this.topic.id).then(res => {
        //         this.topicLectures = res;
        //     });
        // }
</script>

<style scoped>
    .navbar-text {
        font-size: 16px;
        padding-left: 20px !important;
        margin-right: 5px !important;
        margin-bottom: 5px !important;
        color: #fff !important;
        border: 3px solid #202020 !important;
    }
    .navbar-text > span > img {
        display: inline-block !important;
        width: 15px !important;
        height: 15px !important;
    }
    .lecture__paragraph {
        font-size: 15px !important;
        color: #585858 !important;
    }
    .lecture__paragraph:hover {
        cursor: default !important;
    }

    .lecture__name:hover {
        cursor: pointer !important;
    }

</style>

