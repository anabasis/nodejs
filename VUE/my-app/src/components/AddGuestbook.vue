<template>
    <input
        v-model="guestbookText"
        type="text"
        class="w-100 p-2"
        placeholder="Type Guestbook"
        @keyup.enter="addGuestbook"
        >
</template>

<script>
export default {
    data(){
        return {
            guestbookText : ''
        }
    },
    methods: {
        addGuestbook(e) {
            //this.$store.commit('ADD_Guestbook', e.target.value); // mutations
            this.$store.dispatch('guestbook/addGuestbookAction', e.target.value);
            this.GuestbookText = '';
        }
    }
}
</script>
<style lang="css" scoped>
</style>
