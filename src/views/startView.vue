<template>
    <div id="startInfo" class="text-center p-3 alert alert-warning col-10 col-md-6 col-lg-4 col-xl-3 m-auto mt-5 mb-5" role="alert">
        <h2>Välkommen till oss</h2>
        <p>Det här är lagerhanteringstjänsten för FurnitureStore. Du kan visa både kategorier och produkter utan att vara inloggad men för att uppdatera, lägga till eller radera något behöver du vara inloggad med ett giltigt konto. Om du inte har ett konto än kan du enkelt skapa ett genom att följa länken vid inloggningsformuläret.
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

<style scoped>
        #startInfo {
        background-color: #ce66269e;
        border: 1px solid #75400b;
        color: #5c3208;
    }
</style>