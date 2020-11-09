<template lang="html">

    <div class="mb-2 d-flex">
        Completed Guestbook : {{ numberOfCompletedGuestbook }}
        <span
        class="ml-3 flex-grow-1"
        ></span>
        <button
            class="btn btn-danger btn-sm"
            @click="clickAdd"
            >ADD</button>
            <!-- {{ numberOfCompletedguestbook }} -->
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
            //this.$store.dispatch('guestbook/deleteGuestbookAction', this.guestbook.id);
            alert('CLICK!!!');
        }
    }
}
</script>
<style lang="css" scoped>
</style>
