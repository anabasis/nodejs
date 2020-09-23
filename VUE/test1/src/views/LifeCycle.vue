<template lang="html">
    <div>
        {{ name }}
        <h1>This is Home Page</h1>
        <JonathanCoder title="Home title" title2="AAAAAA" ></JonathanCoder><br />
        <button @click="updateName">Change Name</button>

    </div>
</template>

<script>
import JonathanCoder from '@/components/JonathanCoder.vue';

export default {
    components: {
        JonathanCoder
    },
    data(){
        return {
            name : 'Jonathan Home Page'
        }
    },
    beforeCreate(){
        console.log('beforeCreate', this.name);
    },
    created(){  // 많이 사용함
        console.log('created', this.name);
    },
    beforeMount(){
        alert('beforeMount');
    },
    mounted(){
        alert('mounted');
    },
    beforeUpdate(){
        alert('beforeUpdate');
    },
    updated(){
        alert('update');
    },
    beforeDestroy(){
        alert('beforeDestroy');
    },
    destroyed(){
        alert('destroyed');
    },
    methods:{
        updateName(){
            this.name = 'Hello';
        }
    }
}
</script>

<style lang="css" scoped>
h1 {
    color:red;
}
</style>
