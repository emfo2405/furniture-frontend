<template>
    <div id="startInfo" class="text-center p-3 alert alert-warning col-10 col-md-8 col-lg-6 col-xl-4 m-auto mt-5 mb-5" role="alert">
        <!--Textinnehåll på startsida-->
        <h1>Välkommen till oss</h1>
        <p>Det här är lagerhanteringstjänsten för FurnitureStore. Du kan visa både kategorier och produkter utan att vara inloggad men för att uppdatera, lägga till eller radera något behöver du vara inloggad med ett giltigt konto. Om du inte har ett konto än kan du enkelt skapa ett genom att följa länken vid inloggningsformuläret.
        </p>
    </div>
    <!--Läser in inloggningsformulär-->
    <h3 class="text-center mb-3">Logga in här</h3>
    <LoginForm/>

</template>

<script setup>
//Filer och komponenter importerade
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import logoutButton from '@/components/logoutButton.vue';
import LoginForm from '@/components/loginForm.vue';


</script>

<style scoped>
    /*Design för text */
        #startInfo {
        background-color: #ce66269e;
        border: 1px solid #75400b;
        color: #5c3208;
    }
</style>