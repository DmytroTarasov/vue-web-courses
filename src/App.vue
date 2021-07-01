<template>
  <div id="app">
    <!-- <CourseList /> -->
    <router-view />
  </div>
</template>

<script>
    // export default {
    //   created() {
    //     document.addEventListener("touchstart", event => {
    //     }, { passive: true });
    //   }
    // }
</script>
<style >
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */

body {
  background-color: #181818 !important;
}

body::-webkit-scrollbar {
  width: 5px;
}

body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  /* outline: 1px solid slategrey; */
}

</style>
