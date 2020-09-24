<template>
  <div class="about">
    <h1>This is an about page</h1>
    <JonathanCoder title="about title" title2="About About About"></JonathanCoder>
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
