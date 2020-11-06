<template>
    <div @click="clickOther($event)" style="height: 100vh">
    <Nav />
    </div>
</template>

<script>
    import Nav from "./Nav.vue";

    export default {
        name: "Home",
        components: {
            Nav
        },
        methods: {
            clickOther(e) {
                if (e.target.id !== 'menu-nav' && e.target.id !== 'menu-account') {
                    this.$store.dispatch('setIsNavMenuActived', false)
                    this.$store.dispatch('setIsAccountMenuActived', false)
                }

            }
        },

    }
</script>

<style scoped>

</style>
