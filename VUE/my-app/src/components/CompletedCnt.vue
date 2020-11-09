<template lang="html">
    <div>
        Completed Guestbook : {{ numberOfCompletedGuestbook }}
        <!-- {{Guestbooks}} -->
    </div>
</template>

<script>
export default {
    computed : {
        numberOfCompletedGuestbook() {
            //alert(this.$store.getters['Guestbook/numberOfCompletedGuestbook']);
            return this.$store.getters['guestbook/numberOfCompletedGuestbook'];
        }
    }
}
</script>
<style lang="css" scoped>
</style>
