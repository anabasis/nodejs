<template>
  <div class="about">
    <h1>This is an about page</h1>
    <JonathanCoder title="Home title" title2="AAAAAA">
        <!-- <template v-slot:header> -->
        <!-- <template #header="props">
            <p>header11 {{props.jonathan}}</p>
        </template> -->
        <template #header="{jonathan}">
            <p>header11 {{jonathan}}</p>
        </template>
        <!-- <template v-slot:default> -->
        <template #default>
            hello1
        </template>
    </JonathanCoder>
  </div>
</template>

<script>
import JonathanCoder from '@/components/JonathanCoder.vue';

export default {
    components: {
        JonathanCoder
    }
}
</script>

<style lang="css" scoped>
h1 {
    color:red;
}
</style>
