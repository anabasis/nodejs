<template lang="html">
    <div>
        <h1>This is Emit Page</h1>
        <form action="">
            <label for="">Name</label>
            <!--<input type="text" v-model="name" style="padding: 30px; border: 2px solid green;" />-->
            <!-- <InputField :name="name" @update-name="name = $event.target.value"></InputField> -->
            <InputField v-model="name" ></InputField>
            <br /><button >Submit</button>
        </form>
        {{name}}
    </div>
</template>

<script>
import InputField from '@/components/InputField.vue'
export default {
    components: {
        InputField
    },
    data(){
        return {
            name : ''
        }
    }
    // , methods:{
    //     updateName(name){
    //         this.name = name;
    //     }
    // }
}
</script>

<style lang="css" scoped>
h1 {
    color:red;
}
</style>
