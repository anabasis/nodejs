<template lang="html">
    <div class="mb-2 d-flex">
        <!-- {{ guestbook.checked }} -->
        <input
            type="checkbox"
            :checked="guestbook.checked"
            @change="toggleCheckbox"
            />
        <span
        class="ml-3 flex-grow-1"
        :class="guestbook.checked ? 'text-muted' : '' "
        :style="guestbook.checked ? 'text-decoration:line-through' : '' "
        >
            {{guestbook.title}}
        </span>
        <button
            class="btn btn-danger btn-sm"
            @click="clickDelete"
            >Delete</button>
            <!-- {{ numberOfCompletedguestbook }} -->
    </div>
</template>

<script>
export default {
    props : {
        guestbook : {
            type : Object,
            required : true
        }
    },
    computed: {
        numberOfCompletedguestbook() {
            //return this.$store.getters.numberOfCompletedguestbook;
            return this.$store.getters['guestbook/numberOfCompletedGuestbook'];
        }
    },
    methods : {
        toggleCheckbox(e){
            // this.$store.commit('TOGGLE_guestbook', {
            //    id : this.guestbook.id,
            //    checked : e.target.checked
            // });  // mutations
            this.$store.dispatch('guestbook/toggleGuestbookAction', {
                 id : this.guestbook.id,
                 checked : e.target.checked
            })
        },
        clickDelete(){
            // this.$store.commit('DELETE_guestbook', this.guestbook.id);
            this.$store.dispatch('guestbook/deleteGuestbookAction', this.guestbook.id);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
