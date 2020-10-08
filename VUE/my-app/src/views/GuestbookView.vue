<template lang="html">
  <div id="app" class="container">
      <h1 class="text-center">Guestbook App</h1>
      <CompletedCnt />
      <hr />
      <GuestbookList/>

      <GuestbookManage/>

  </div>

</template>


<script>
// @ ROOT부터 페키지 검색
import CompletedCnt from '@/components/guestbook/CompletedCnt';
import GuestbookList from '@/components/guestbook/GuestbookList';
import GuestbookManage from '@/components/guestbook/GuestbookManage';

export default {
  components: {
      CompletedCnt,
      GuestbookList,
      GuestbookManage
  }
}
</script>

<style lang="css" scoped>
</style>
