<template>
<button @click="logout" id="logoutBtn" class="text-secondary mt-3">Logga ut</button>
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };
</script>