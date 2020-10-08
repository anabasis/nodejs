<template lang="html">
    <div id="app" class="container">
        <h1 class="text-center">Guestbook App</h1>
        <CompletedCnt />
        <AddGuestbook/>
        <hr />
        <GuestbookList/>
        {{ guestbooks }}
    </div>
</template>

<script>
// @ ROOT부터 페키지 검색
import CompletedCnt from '@/components/CompletedCnt';
import AddGuestbook from '@/components/AddGuestbook';
import GuestbookList from '@/components/GuestbookList';

export default {
    components: {
        CompletedCnt,
        AddGuestbook,
        GuestbookList
    }
}
</script>

<style lang="css" scoped>
</style>
