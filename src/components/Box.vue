<template>
    <div class="main-panel bg-lightest-silver relative" >
        <SubNav></SubNav>
    </div>
</template>

<script>
    import SubNav from "./SubNav.vue";


    export default {
        name: "Box",
        components: {
            SubNav
        },
    }
</script>

<style scoped>
    @import "../assets/bashboard.css";
</style>
