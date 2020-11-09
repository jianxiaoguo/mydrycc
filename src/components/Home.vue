<template>
    <div @click="clickOther($event)" style="height: 100vh">
        <Nav> </Nav>
        <div id="hk-slide-panels" style="height: 3px"></div>
        <Box > </Box>
    </div>
</template>

<script>
    import Nav from "./Nav.vue";
    import Box from "./Box.vue";

    export default {
        name: "Home",
        components: {
            Nav, Box
        },
        methods: {
            clickOther(e) {
                console.log(e.target.id);
                if (e.target.id !== 'menu-nav' && e.target.id !== 'menu-account'
                    && e.target.id !== 'menu-select-group' && e.target.id !== 'menu-new'
                ) {
                    this.$store.commit('closeAllMenu')
                }

            }
        },

    }
</script>

<style scoped>
    @import "../assets/home.css";
</style>
