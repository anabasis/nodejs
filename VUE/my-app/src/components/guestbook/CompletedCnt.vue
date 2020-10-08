<template lang="html">
    <div>
        Completed Guestbook : {{ numberOfCompletedGuestbook }}
        <!-- {{Guestbooks}} -->
        <button
            class="btn btn-danger btn-sm"
            @click="clickAdd"
            >ADD</button>
    </div>
</template>

<script>
export default {
    computed : {
        numberOfCompletedGuestbook() {
            //alert(this.$store.getters['Guestbook/numberOfCompletedGuestbook']);
            return this.$store.getters['guestbook/numberOfCompletedGuestbook'];
        }
    },
    methods : {
        clickAdd(){
            // this.$store.commit('DELETE_guestbook', this.guestbook.id);
            this.$store.dispatch('guestbook/deleteGuestbookAction', this.guestbook.id);
        }
    }
}
</script>
<style lang="css" scoped>
</style>
