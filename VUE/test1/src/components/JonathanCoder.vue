<template lang="html">
  <div>
      <p>Header </p>
      <slot name="header" jonathan="jonathan"></slot>
      <p>Body</p>
      <slot></slot>
      <p>Footer</p>
      <h1>{{ title }}</h1>
      <h1>{{ title2 }}</h1>
      <p>
          {{name}}
      </p><br />
      <button @click="updateName">Change Name</button>
  </div>
</template>

<script>
export default {
    props: {
        title : {
            type:String,
            default:"DDDDD TILE"
        }
        ,title2 : {
            type : String,
            required: true,
            default:'Default title'
        }
    },
    data(){
        return {
            name : 'Jonathan Coder',
            jonathan : 'coder'
        }
    },
    methods: {
        updateName(){
            this.name = 'Jonathan Coder Updated';
        }
    }
}
</script>

<style lang="css" scoped>
</style>
