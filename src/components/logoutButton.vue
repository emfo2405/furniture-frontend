<template @click="logout" class="btn btn-danger">
Logga ut
</template>

<script setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };
</script>