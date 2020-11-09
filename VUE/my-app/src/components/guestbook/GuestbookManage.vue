<template lang="html">
  <div id="guestbook_manage">
    제목 : <input type="text"

    /><br />
    작성자 : <input type="text"

    /><br />
    내용 :<br />
    <textarea>

    </textarea>
  </div>
</template>

<script>
export default {
  props : {
      guestbook : {
          type : Object,
          required : true
      }
  },
  methods : {

  }
}
</script>

<style lang="css" scoped>
</style>
