<template>
    <div id="startInfo" class="text-center p-3 m-5 alert alert-warning" role="alert">
        <h2>Välkommen till oss</h2>
        <p>text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
        </p>
    </div>

    <LoginForm/>

</template>

<script setup>

    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import logoutButton from '@/components/logoutButton.vue';
import LoginForm from '@/components/loginForm.vue';


</script>