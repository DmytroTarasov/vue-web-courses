<template>
    <div class="container-fluid" style="max-width: 420px; padding: 0 0 0 15px; ">
        <b-navbar toggleable type="dark" variant="dark">
            <b-navbar-toggle :target="`navbar-toggle-collapse${topic.id}topic`" 
            id="button">
            {{topic.name}}
            </b-navbar-toggle>

            <b-navbar-toggle :target="`navbar-toggle-collapse${topic.id}topic`" id="button">
            <template #default="{ expanded }">
                <b-icon v-if="expanded" icon="chevron-bar-up" id="icon_down_up"></b-icon>
                <b-icon v-else icon="chevron-bar-down" id="icon_down_up"></b-icon>
                </template>
            </b-navbar-toggle>

            <b-collapse :id="`navbar-toggle-collapse${topic.id}topic`" is-nav>
                <b-navbar-nav class="ml-auto">
                    <TopicLectures @changePageContent="changePageContent"
                    v-for="(lecture, index) of topicLectures" 
                    :lecture="lecture"
                    :index="index"
                    :selectedLectIndex="selectedLectIndex"
                    :selectedLectId="selectedLectId"
                    :key="lecture.id" />
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import TopicLectures from "@/components/TopicLectures"
    import { getLecturesByTopicId} from "../services/TopicService"
    export default {
        components: {
            TopicLectures
        },
        props: {
            topic: {
                type: Object,
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
        data(){
            return{     
                topicLectures: [],
                // selectedLecture: {},
                
            }
        },
        async created(){
            await getLecturesByTopicId(this.topic.id).then(res => {
                this.topicLectures = res;
            });
        },
        methods: {
            async changePageContent(lectureName) {
                // this.selectedLecture = 
                // await this.topicLectures.find(l => l.name == lectureName);
                // this.selectedLectureIndex = this.topicLectures.indexOf(this.selectedLecture);
                // console.log(this.selectedLectureIndex);
                this.$emit('changePageContent', {
                    "lectureName" : lectureName,
                    "topicLectures" : this.topicLectures
                });
            }
        }
    }
</script>

<style scoped>
    #icon_down_up {
        color: #fff !important;
        margin-right: 10px !important;
    }
    #button {
        color: #fff !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        /* padding: 0 !important; */
        padding-left: 20px !important;
        height: 30px !important;
    }
    .navbar {
        padding-top: 10px !important;
        padding-bottom: 0 !important;
    }

    .navbar-toggler {
        font-size: 17px !important;
    }
</style>