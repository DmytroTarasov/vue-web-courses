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
                    <button v-if="token == null" class="btn btn-dark fs-6" id="menu-btn">Log in</button>
                    <button v-if="token != null" class="btn btn-dark fs-6 last__btn" id="menu-btn" v-on:click="logOut">Log out</button>
                    <button v-if="token == null" class="btn btn-dark fs-6 last__btn" id="menu-btn">Register</button>
                </div>
            </div>
        </nav>
        <div class="content__edit_page">
            <div class="row">
                <div class="col-lg-2">
                    <button class="btn btn-dark fs-6 btn__edit_page" v-on:click="cancelEdit">Cancel</button>
                    <button class="btn btn-dark fs-6 btn__edit_page" v-on:click="updateLecture">Save</button>
                    <hr class="hr__edit_page" />
                    <button class="btn btn-dark fs-6 btn__edit_page">Delete</button>
                </div>
                <div class="col-lg-8" style="margin-left: 60px">
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="edit__lect_descr">Title</h5>
                            <input
                                v-model="lecture.name"
                                type="text"
                                class="form-control input__class"
                                v-on:change="lectureDataChange('name', lecture.name)"
                                style="width: 50% !important"
                            />
                            <div id="constructs-block">
                                <h5 class="edit__lect_descr" style="margin-top: 120px">Constructs</h5>
                                <div class="row">
                                    <div class="col-lg-9">
                                        <v-md-editor style="height: 400px; background-color: #606060" class="hide"></v-md-editor>
                                    </div>
                                </div>
                            </div>
                            <button
                                v-for="constructType of constructTypes"
                                :key="constructType.id"
                                class="btn btn-dark fs-6 btn__edit_page"
                                v-on:click="addConstruct(constructType.id)"
                                style="margin-top: 20px; margin-bottom: 0 !important; margin-left: auto !important; margin-right: auto !important"
                            >
                                Add {{ constructType.id }}
                            </button>
                            <!-- <div class="col-lg-6">
                            <h5 class="edit__lect_descr">{{lectureUnit}}</h5>
                            <h5 class="edit__lect_descr">Unit</h5>
                            <select v-model="selectedUnit" v-on:change="changeLectureUnit">
                                <option v-for="unit of units" 
                                :key="unit.id"
                                > {{unit.name}}</option>
                            </select> 
                        </div> -->
                        </div>

                        <!-- <div class="row">
                        <div class="col-lg-6">
                        </div>
                        <div class="col-lg-6">
                            <h5 class="edit__lect_descr">Topic</h5>
                            <select v-model="selectedTopic" v-on:change="changeLectureTopic">
                                <option v-for="topic in unitTopics" 
                                :key="topic.id">{{topic.name}}</option>
                            </select> 
                        </div>
                    </div>        -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getLectureById, patchLecture } from "../services/LectureService";
import { getAllConstructTypes } from "../services/ConstructTypeService";
import { postLectureConstruct } from "../services/LectureConstructService";
// import { getAllUnits, getUnitById } from '../services/UnitService';
// import { getTopicById, getAllTopics, getTopicsByUnitId } from '../services/TopicService';

export default {
    data() {
        return {
            token: "",
            // units: [],
            // topics: [],
            lecture: {},
            constructTypes: [],
            // lectureUnit: {},
            // lectureTopic: {},
            // unitTopics: [],
            // selectedUnit: "",
            // selectedTopic: ""
            parameterObjLecture: {},
            parameterObjLectureConstructs: {},
            counter: 0,
            counterForConstruct: 0,
            lectureDataChng: false,
        };
    },
    props: ["idLecture", "idCourse", "idUnit", "idTopic"],
    async created() {
        this.token = this.$cookies.get("token");

        await getLectureById(this.$props.idLecture).then(res => {
            this.lecture = res;
        });

        await getAllConstructTypes().then(res => (this.constructTypes = res));

        // await getAllUnits().then(res => {
        //     this.units = res;
        // })

        // await getAllTopics().then(res => {
        //     this.topics = res;
        // })

        // await getTopicById(this.lecture.topicId).then(async res => {
        //     this.lectureTopic = res;
        //     this.selectedTopic = res.name;
        //     await getUnitById(res.unitId).then(res => {
        //         this.lectureUnit = res;
        //         this.selectedUnit = res.name;
        //     });
        // })
        // await getTopicsByUnitId(this.lectureUnit.id).then(res => {
        //         this.unitTopics = res;
        //     });
        // await getAllCourseCategories().then(res => {
        //     this.courseCategories = res;
        // });
        // this.courseTitle = this.course.name;
    },
    methods: {
        logOut() {
            this.$cookies.remove("token");
            this.token = this.$cookies.get("token");
            this.$router.push({ name: "GuestSingleCourse", params: { idCourse: this.$props.idCourse } });
        },
        cancelEdit() {
            this.$router.push({
                name: "ProfessorEditTopic",
                params: { idCourse: this.$props.idCourse, idUnit: this.$props.idUnit, idTopic: this.$props.idTopic },
            });
        },
        async updateLecture() {
            if (this.lectureDataChng) {
                await patchLecture(this.lecture.id, this.parameterObjLecture, this.token).then(res => (this.lecture = res));
            }
            let constructs = document.querySelectorAll("#constructId");
            constructs = Array.from(constructs);
            constructs.forEach((c, i) => (constructs[i] = c.children[0].children[0]));
            // console.log(constructs);
            // constructs = constructs.filter(c => c.classList.contains("v-md-editor"));
            constructs.forEach(async (c, i) => {
                this.parameterObjLectureConstructs.lectureId = this.lecture.id;
                this.parameterObjLectureConstructs.displayOrder = i + 1;
                if (c.classList.contains("v-md-editor")) {
                    this.parameterObjLectureConstructs.constructTypeId = "Markdown";
                    console.log(
                        c.children[1].children[1].children[0].children[0].children[0].children[0].children[0].children[0].children[0].textContent
                    );
                    this.parameterObjLectureConstructs.content =
                        c.children[1].children[1].children[0].children[0].children[0].children[0].children[0].children[1].value;
                    console.log(this.parameterObjLectureConstructs.content);
                } else {
                    this.parameterObjLectureConstructs.constructTypeId = "Video";
                    let constructContent = c.value;
                    constructContent = constructContent.replace("watch?v=", "embed/");
                    this.parameterObjLectureConstructs.content = constructContent;
                }
                await postLectureConstruct(this.parameterObjLectureConstructs);
            });

            this.$router.push({
                name: "ProfessorEditTopic",
                params: { idCourse: this.$props.idCourse, idUnit: this.$props.idUnit, idTopic: this.$props.idTopic },
            });

            // console.log(constructs[0].innerText);
            // console.log(constructs);
            // console.log(constructs.children[0].children[0]);
            // let constructsBlockChildren = document.querySelector("#constructs-block").children;
            //     constructsBlockChildren = Array.from(constructsBlockChildren).filter(c => c.localName == "div");

            // constructsBlockChildren.forEach(c => console.log(c));
            // constructsBlockChildren.forEach(async (c,i) => {
            //     constructsBlockChildren[i] = c.children[0].children[0];
            //     if (constructsBlockChildren[i].localName == "textarea") {
            //         this.parameterObjLectureConstructs.constructTypeId = "Markdown";
            //     } else {
            //         this.parameterObjLectureConstructs.constructTypeId = "Video";
            //     }
            //     this.parameterObjLectureConstructs.lectureId = this.lecture.id;
            //     this.parameterObjLectureConstructs.displayOrder = i + 1;
            //     this.parameterObjLectureConstructs.content = constructsBlockChildren[i].value;
            //     console.log(this.constructsBlockChildren[i]);

            //     await postLectureConstruct(this.parameterObjLectureConstructs);

            //     this.$router.push({name: 'ProfessorEditTopic', params: {idCourse: this.$props.idCourse,
            //     idUnit: this.$props.idUnit, idTopic: this.$props.idTopic}});

            // });
            // console.log(constructsBlockChildren);
        },
        lectureDataChange(property, value) {
            let prop = property;
            prop = prop.charAt(0).toUpperCase() + prop.slice(1);
            this.parameterObjLecture[property] = value;
            this.lectureDataChng = true;
        },
        addConstruct(constructId) {
            const count = this.counter;
            const constructBlock = document.querySelector("#constructs-block");
            switch (constructId) {
                case "Markdown":
                    // let html = '<div class="row" id="constructId"><div class="col-lg-9"><textarea class="form-control control__area" rows="6" id="content-text-area"></textarea></div><div class="col-lg-3"><button class="btn btn-dark fs-6 btn__edit_page" style="margin-top: 20px" id="btnDeleteConstruct">Delete</button></div></div';
                    // constructBlock.insertAdjacentHTML('beforeend', html);
                    // break;
                    let html =
                        '<div class="row" id="constructId" style="margin-top: 30px"><div class="col-lg-9 markdown"></div><div class="col-lg-3"><button class="btn btn-dark fs-6 btn__edit_page"  id="btnDeleteConstruct">Delete</button></div></div';
                    constructBlock.insertAdjacentHTML("beforeend", html);
                    const markdown = document.querySelector(".v-md-editor");
                    let construct = document.querySelectorAll(".markdown");
                    // console.log(markdown, construct);
                    // markdown.style.display = "block";
                    construct = Array.from(construct)[construct.length - 1];
                    if (this.counterForConstruct == 0) {
                        markdown.classList.remove("hide");
                        markdown.classList.add("show");
                        construct.append(markdown);
                    } else {
                        const markdownClone = markdown.cloneNode(true);
                        markdownClone.classList.add("show");
                        markdown.classList.remove("hide");
                        construct.append(markdownClone);
                    }
                    this.counterForConstruct += 1;
                    break;
                    // constructBlock.insertAdjacentHTML('beforeend', '<v-md-editor height="400px"></v-md-editor>');
                    break;
                case "Video":
                    html =
                        '<div class="row" id="constructId"><div class="col-lg-9"><input type="text" class="form-control input__class" placeholder="Video URL here" style="width: 100%"></div><div class="col-lg-3"><button class="btn btn-dark fs-6 btn__edit_page"  id="btnDeleteConstruct">Delete</button></div></div>';
                    constructBlock.insertAdjacentHTML("beforeend", html);
                    break;
            }
            this.counter += 1;
            let btns = document.querySelectorAll("#btnDeleteConstruct");
            btns = Array.from(btns);
            btns[count].addEventListener("click", () => {
                btns[count].parentNode.parentNode.remove();
                this.counter -= 1;
            });
        },

        // async changeLectureUnit() {
        //     this.lectureUnit = this.units.find(u => u.name == this.selectedUnit);
        //     await getTopicsByUnitId(this.lectureUnit.id).then(res => {
        //         this.unitTopics = res;
        //     });
        //     if (this.unitTopics[0]) {
        //         this.lectureTopic = this.unitTopics[0];
        //         this.selectedTopic = this.unitTopics[0].name;
        //         // console.log(this.lectureTopic);
        //         // this.selectedTopic = this.lectureTopic.name;
        //     }
        //     // this.lectureUnit = this.units.find(u => u.name == this.lectureUnit.name);
        // },
        // async changeLectureTopic() {
        //     this.lectureTopic = this.unitTopics.find(t => t.name == this.selectedTopic);
        // }
    },
    // computed: {
    //     async filteredTopicsByUnitId() {
    //         // console.log(this.lectureUnit.id);
    //         await getTopicsByUnitId(this.lectureUnit.id).then(res => {
    //             this.lectureTopics = res;
    //         });
    //     }
    // }
    // computed: {
    //     markdownId() {
    //         return "markdown" + this.counter;
    //     }
    // }
};
</script>

<style scoped>
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

::v-deep .btn__edit_page {
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

.edit__lect_descr {
    color: #a9a9a9 !important;
}

select {
    display: inline-block !important;
    width: 75% !important;
    height: 40px !important;
    background-color: #212121 !important;
    border: none !important;
    color: #fff !important;
    border-bottom: 2px solid #606060 !important;
    padding-left: 3px !important;
    margin-bottom: 20px !important;
}

select:active,
select:link,
select:hover,
select:focus {
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
::v-deep .input__class {
    background-color: #212121 !important;
    color: #fff !important;
    border: none !important;
    border-bottom: 2px solid #606060 !important;
    border-radius: 0 !important;
    padding-left: 5px !important;
    width: 100% !important;
    height: 40px !important;
    margin-bottom: 20px !important;
    margin-top: 20px !important;
}

::v-deep .input__class:focus,
.input__class:hover {
    border: none !important;
    border-bottom: 2px solid #606060 !important;
    box-shadow: none !important;
    outline: 0 !important;
}

/* #courseDescription {
        margin-top: 20px !important;
        width: 90% !important;
        border: 2px solid #606060 !important;
        background-color: #121212 !important;
        resize: none !important;
        color: #fff !important;
        font-size: 18px !important;
    }

    #courseDescription:hover, #courseDescription:focus {
        box-shadow: none !important;
        font-size: 18px !important;
    } */

.courses__link {
    margin-right: 20px !important;
    text-decoration: none !important;
    padding: 8px 16px !important;
    color: #fff !important;
}

.courses__link:hover {
    color: #a9a9a9 !important;
    cursor: pointer !important;
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

.hide {
    display: none;
}

.show {
    display: -webkit-flex;
}

::v-deep #btnDeleteConstruct {
    width: 70% !important;
    margin-left: 50px !important;
    margin-top: 20px !important;
}

::v-deep .v-md-editor__right-area {
    background-color: #a34255 !important;
    color: #fff !important;
}

::v-deep .v-md-editor__toolbar-item--active,
.v-md-editor__toolbar-item--active:hover {
    background-color: #a34255 !important;
    color: #fff !important;
}

::v-deep .v-md-textarea-editor > textarea {
    background-color: #a34255 !important;
    color: #fff !important;
}

::v-deep .vuepress-markdown-body {
    background-color: #a34255 !important;
    color: #fff !important;
}

::v-deep .v-md-editor__toolbar-item {
    background-color: #a34255 !important;
    color: #fff !important;
}
</style>
