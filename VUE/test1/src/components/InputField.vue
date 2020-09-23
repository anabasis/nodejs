<template lang="html">
    <div>
        <label for="">NAME</label>
        <!-- <input type="text"
        :value="name"
        style="padding: 30px; border; 2px solid green"
        @input="updateName"
        > -->
        <input type="text"
        :value="value"
        style="padding: 30px; border; 2px solid green"
        @input="$emit('input',$event.target.value)"
        >
    </div>

</template>

<script>
export default {
    props : {
        value : {
            type: String,
            required: true
        }
    }
    // , methods:{
    //     updateName(e){
    //         console.log(e.target.value);
    //         //this.$emit('update-name',e.target.value);
    //     }
    // }
}
</script>

<style lang="css" scoped>
</style>
