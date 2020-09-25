<template lang="html">
    <div>
      User List
      <div v-for="user in users" :key="user.id">
      {{ user.name }}
      </div>
    </div>
</template>

<script>
export default {
  craeted(){
    this.getUsers();
  },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  methods : {
    getUsers(){
        this.$store.dispatch('getUsers');
    }
  }
}
</script>

<style lang="css" scoped>
</style>
