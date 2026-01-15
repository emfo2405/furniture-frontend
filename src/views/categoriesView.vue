

<script setup>
    //Filer och komponenter importerade
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';
import { RouterLink } from 'vue-router';
import LoginForm from '@/components/loginForm.vue';

//Variabler skapade
    const categories = ref([]);
    const loading = ref(false);
    const loginError = ref("");
    const error = ref("");

    
//När sidan laddas hämtas kategorier
    onMounted(() => {
        getCategories();
    })

    //Funktion för att hämta kategorier
    const getCategories = async() =>{
        loading.value = true;

        //GET-anrop till API för att hämta kategorier
    try {

        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories")

        //Om allt går bra sparas data
        if(res.ok) {
            const data = await res.json();
            categories.value = data;
            //Om användaren inte är autentiserad
        } else if(res.status === 401) {
                loginError.value = "Du måste vara inloggad för att göra ändringar";
        } else {

        }
//Om något går fel med try
    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    }
    }

//Funktion för att radera en kategori
    const deleteCategory = async (_id) => {
        //Hämtar token från localStorage
const token = localStorage.getItem("token");
//DELETE-anrop till API med kategori id
        try {
            const res = await fetch("https://furniture-backend-aym8.onrender.com/categories/" + _id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            //Om allt går bra
            if(res.ok) {
                getCategories();
                //Om användaren inte är inloggad
            } else if(res.status===401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
                top:250,
                behavior: "smooth"
            })
            return;
            //Om något annat går fel
        } else {
            error.value = "Något gick fel, försök igen";
        }
        //Om något går fel med try
        } catch (error) {
            console.log("There was an error: " + error)
        }
    }



</script>

<template>
    <!--Felmeddelanden om användaren inte är inloggad-->
        <h1 class="m-3 text-center">Våra kategorier</h1>
            <div v-if="loginError" class="loginError">
        <h2 class="text-center text-danger">{{ loginError }}</h2>
        <LoginForm />
    </div>
<!--Kategorier visas-->
        <p v-if="loading" class="loading text-center text-muted">Kategorier laddas in...</p>
<CategoryItem v-for="category in categories" :category="category" :key="category._id" @delete-category="deleteCategory"/>
<!--Error-meddelande om något går fel-->
<p class="error text-danger mt-3" v-if="error">{{ error }}</p>
<!--Knapp för att lägga till en kategori-->
        <button class="addCategory rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny kategori</RouterLink></button>
</template>

<style scoped>
    /*Design för kategoriknapp */
    .addCategory{
    border: 2px solid black;
    display: block;
    margin: 0 auto;
    box-shadow: 5px 5px 0px black;
}

.addCategory a{
        text-decoration: none;
}

.addCategory:hover {
    box-shadow: 2px 2px 0px black;
    transform: translate(3px, 3px);
}
</style>