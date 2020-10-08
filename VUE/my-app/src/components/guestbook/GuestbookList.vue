<template lang="html">
    <div>
    <Guestbook
        v-for="guestbook in guestbooks"
        :key="guestbook.id"
        :guestbook="guestbook"
         ></Guestbook>
     </div>
</template>

<script>
import Guestbook from '@/components/guestbook/Guestbook.vue';

export default {
    components: {
            Guestbook
    },
    computed: {
      guestbooks(){
        //return this.$store.state.guestbooks;
        return this.$store.state.guestbook.guestbooks;
      }
    }
}
</script>

<style lang="css" scoped>
</style>
