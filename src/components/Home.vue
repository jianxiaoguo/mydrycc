<template>
    <div>
        <div>
            <Nav />
        </div>

        <div style="height: 500px;width:200px;border: 1px solid red" @click="onClickHomeBody">

        </div>
    </div>

</template>

<script>
    import Nav from "./Nav.vue";

    export default {
        name: "Home",
        components: {
            Nav
        },
        methods:{
            onClickHomeBody(){
                console.log(24234234)
                hanlucen=false
            }
        }
    }
</script>

<style scoped>

</style>
