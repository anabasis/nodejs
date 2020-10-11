<template lang="html">
    <div id="app" class="container">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/todo">Todo</router-link> |
        <router-link to="/guestbook">Guestbook</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
</template>

<script>
// @ ROOT부터 페키지 검색

export default {
    components: {
    }
}
</script>

<style lang="css" scoped>
#app {
    
}
</style>
