<template>
<button @click="logout" id="logoutBtn" class="text-secondary mt-3 text-center btn btn-danger text-light margin-auto">Logga ut</button>

<p class="error mt-3 text-secondary text-center" v-if="error">{{ error }}</p>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';

    const router = useRouter();
    const error = ref("");

    const logout = () => {
        
        localStorage.removeItem("token");
        error.value = "Du har loggats ut";
        setTimeout(() => {
         router.push("/");   
        }, 1200);
        
        
    };
</script>

<style scoped>
    #logoutBtn {
        width: 90px;
        margin: 0 auto;
    }
</style>