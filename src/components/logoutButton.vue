<template>
    <!--Utloggningsknapp skapad-->
<button @click="logout" id="logoutBtn" class="text-secondary mt-3 text-center btn btn-danger text-light margin-auto">Logga ut</button>

<!--Felmeddelanden-->
<p class="error mt-3 text-secondary text-center" v-if="error">{{ error }}</p>
</template>

<script setup>
    //Importerar filer för scriptet
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';

    //Variabler skapade
    const router = useRouter();
    const error = ref("");

    //Utloggningsfunktion där token tas bort från localstorage
    const logout = () => {
        
        localStorage.removeItem("token");
        error.value = "Du har loggats ut";
        setTimeout(() => {
         router.push("/");   
        }, 1200);
        
        
    };
</script>

<style scoped>
    /*Design av utloggningknapp */
    #logoutBtn {
        width: 90px;
        margin: 0 auto;
    }
</style>