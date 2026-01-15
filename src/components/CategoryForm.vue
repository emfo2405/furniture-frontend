<!--Template för kategorifromuläret-->
<template>
        <div id="categoryForm" class="mb-5 d-block m-auto justify-content-center col-10 col-md-8 col-lg-6 col-xl-3">
            <!--Formulär skapat-->
        <form @submit.prevent="addCategory">
<h1 class="text-center m-4">Lägg till en kategori</h1>

<!--Inloggningsruta dyker om om autentiseringen saknas-->
    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

    <!--Formulär för att lägga till en kategori-->
    <label for="nameCategory" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameCategory" v-model="nameCategory">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <!--Meddelanden om något går fel eller något lyckas-->
    <p class="error mt-3 text-danger" v-if="error">{{ error }}</p>
    <p class="success mt-3 text-success" v-if="success">{{ success }}</p>

    <!--Knapp för att lägga till-->
    <button id="addButton" type="submit" class="btn btn-secondary mt-2 mb-5">Lägg till</button>
</form>
</div>
</template>

<script setup>
    /*Importerar nödvändiga filer */
    import {ref} from 'vue';
    import LoginForm from './loginForm.vue';

    /* Skapar variabler*/
    const nameCategory = ref("");
    const description = ref("");
    const error = ref("");
    const loginError = ref("");
    const success = ref("");


   
/* Funktion för att lägga till en kategori*/
    const addCategory = async () => {

        /*Token läses in från localStorage */
        const token = localStorage.getItem("token");

        /*Kontroll av input */
        if(nameCategory.value.length <1) {
            error.value = "Skriv ett namn";
            success.value = "";
            return;
        }
        if(description.value.length <1) {
            error.value = "Skriv en beskrivning";
            success.value = "";
            return;
        }

        /*Input samlas i en variabel */
        const data = {
                name: nameCategory.value,
                description: description.value
            }

    /*POST-anrop till API */
    try {
        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        /*Om allt är okej */
        if(res.ok) {
 
            //Rensa fält i formuläret
            nameCategory.value = "";
            description.value = "";
            success.value = "En ny kategori är tillagd"

            /*Error value sätts till inget */
            error.value= "";

            /*Om användaren inte är autentiserad */
        } else if(res.status === 401) {
            /*Felmeddelande */
            loginError.value = "Du måste vara inloggad";
            success.value = "";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            /*Om något annat går fel */
            } else {
                error.value = "Något gick fel, försök igen"
                console.log("Det gick inte att uppdatera");
                success.value = "";

            }
            /*Om något går fel med try*/
    } catch (error) {
        console.log("Något gick fel: " + error);
    }
        }
    

</script>