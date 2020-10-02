<template lang="html">
    <div>
        <v-app-bar
          app
          color="indigo"
          dark
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>
    </div>

</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
