<template>
        <div id="categoryForm" class="mb-5 d-block m-auto justify-content-center col-10 col-md-8 col-lg-6 col-xl-3">
        <form @submit.prevent="addCategory">
<h1 class="text-center m-4">Lägg till en kategori</h1>

    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

    <label for="nameCategory" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameCategory" v-model="nameCategory">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <p class="error mt-3 text-danger" v-if="error">{{ error }}</p>
    <p class="success mt-3 text-success" v-if="success">{{ success }}</p>

    <button id="addButton" type="submit" class="btn btn-secondary mt-2 mb-5">Lägg till</button>
</form>


</div>
</template>

<script setup>
    import {ref} from 'vue';
    import LoginForm from './loginForm.vue';

    const nameCategory = ref("");
    const description = ref("");
    const error = ref("");
    const loginError = ref("");
    const success = ref("");


   

    const addCategory = async () => {

        const token = localStorage.getItem("token");

        if(nameCategory.value.length <1) {
            error.value = "Skriv ett namn";
            return;
        }
        if(description.value.length <1) {
            error.value = "Skriv en beskrivning";
            return;
        }

        const data = {
                name: nameCategory.value,
                description: description.value
            }

    
    try {
        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.ok) {
 
            //Rensa fält i formuläret
            nameCategory.value = "";
            description.value = "";
            success.value = "En ny kategori är tillagd"
            error.value= "";

        } else if(res.status === 401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            } else {
                error.value = "Något gick fel, försök igen"
                console.log("Det gick inte att uppdatera");

            }
    } catch (error) {
        console.log("Något gick fel: " + error);
    }
        }
    

</script>