<<<<<<< HEAD
<template lang="html">
    <div id="app" class="container">
        <h1 class="text-center">Guestbook App</h1>
        111111
        <CompletedCnt />
        11111
        <!-- <AddGuestbook/>
        <hr />
        <GuestbookList/> -->
        <!-- {{ guestbooks }} -->
    </div>
</template>

<script>
// @ ROOT부터 페키지 검색
import CompletedCnt from '@/components/CompletedCnt';
// import AddGuestbook from '@/components/AddGuestbook';
// import GuestbookList from '@/components/GuestbookList';

export default {
    components: {
        CompletedCnt,
        // AddGuestbook,
        // GuestbookList
    }
}
</script>

<style lang="css" scoped>
</style>
=======
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
>>>>>>> 9cce1114ef3816712297122856d95d284a8504f5
