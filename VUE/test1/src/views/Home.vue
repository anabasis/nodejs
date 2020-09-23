<template lang="html">
    <div>
        <h1>This is Home Page</h1>
        <JonathanCoder title="Home title" title2="AAAAAA" ></JonathanCoder>
    </div>
</template>

<script>
import JonathanCoder from '@/components/JonathanCoder.vue';

export default {
    components: {
        JonathanCoder
    },
    data(){
        return {
            name : 'Jonathan Home Page'
        }
    }
}
</script>

<style lang="css" scoped>
h1 {
    color:red;
}
</style>
