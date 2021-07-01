<template>
        <div class="container" style="max-width: 420px; padding: 0; margin-left: 20px">
        <!-- <div class="dropdown">
            <button type="button" class="btn btn-default dropdown-toggle fs-6" 
            data-toggle="dropdown" 
            style="color: #fff; border-radius: 0; background-color: #212121; border: none">
                {{unit.name}}
            </button>
            <ul class="dropdown-menu" style="color: #fff">
                <li><a href="">smth</a></li>
                <li><a href="">smth else</a></li>
            </ul>
        </div> -->
            <b-navbar toggleable type="dark" variant="dark">
                <b-navbar-toggle :target="`navbar-toggle-collapse${unit.id}unit`" id="button_toggle">
                {{unit.name}} 
                </b-navbar-toggle>

                <b-navbar-toggle :target="`navbar-toggle-collapse${unit.id}unit`" id="button_toggle">
                <template #default="{ expanded }">
                    <b-icon v-if="expanded" icon="chevron-bar-up" id="icon_down_up"></b-icon>
                    <b-icon v-else icon="chevron-bar-down" id="icon_down_up"></b-icon>
                    </template>
                </b-navbar-toggle>

                <b-collapse :id="`navbar-toggle-collapse${unit.id}unit`" is-nav >
                    <b-navbar-nav class="ml-auto">
                        <!-- <b-nav-item href="#">Link 1</b-nav-item>
                        <b-nav-item href="#">Link 2</b-nav-item> -->
                        <UnitTopics @changePageContent="changePageContent"
                        v-for="topic of unitTopics" 
                        :topic="topic"
                        :selectedLectIndex="selectedLectIndex"
                        :selectedLectId="selectedLectId"
                        :key="topic.id" />
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
        <!-- <div class="container-fluid" style="display: inline-block;max-width: 600px"> -->
            <!-- <span style="color: #fff">Hello</span>  -->
        <!-- </div> -->
    <!-- </div> -->
</template>

<script>

import { getTopicsByUnitId} from "../services/UnitService"
import UnitTopics from "@/components/UnitTopics"

    export default {
        components: {
            UnitTopics
        },
        props: {
            unit: {
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
                unitTopics: [],
                // selectedLectIndex1: this.selectedLectIndex
            }
        },
        async created(){
            await getTopicsByUnitId(this.unit.id).then(res => {
                this.unitTopics = res;
            });
        },
        methods: {
            changePageContent(obj) {
                // console.log(selectedLecture);
                this.$emit('changePageContent', {
                    "lectureName" : obj.lectureName,
                    "topicLectures" : obj.topicLectures
                });
                // console.log(selectedLecture);
            }
        }
    }
</script>

<style scoped>
/* .btn:focus {
  outline: none !important;
  box-shadow: none !important;
} */
    #icon_down_up {
        color: #fff !important;
        margin-right: 10px !important;
    }

    #button_toggle {
        color: #fff !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        padding-left: 15px !important; 
    }
    .navbar-toggler {
        font-size: 19px !important;
    }

    #button_toggle {
        margin-right: 0 !important;
    }
</style>

