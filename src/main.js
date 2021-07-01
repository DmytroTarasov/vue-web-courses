import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import router from "./router";
import VueCookies from "vue-cookies";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

//первый editor
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";

//второй editor
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
Vue.use(VueSimplemde);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueCookies);

VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);

new Vue({
    router,
    render: h => h(App),
}).$mount("#app");
