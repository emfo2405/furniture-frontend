<script setup>
    //Filer och komponenter importerade
import { ref, onMounted } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { RouterLink, useRoute } from 'vue-router';
import LoginForm from '@/components/loginForm.vue';


//Variabler skapade
    const products = ref([])
    const categories = ref([])
    const loading = ref(false)
    const loginError = ref("");
    const error = ref("");
    const emptySet = ref("");

    const route = useRoute();
    const categoryId = route.params.categoryId;



//När sidan läses in hämtas produkter och kategorier
    onMounted(() => {
        getProducts();
        showCategory();
    })

    //Funktion för att visa kategori
    const showCategory = async() =>{
        loading.value = true;

        //GET-anrop för att hämta en kategori med specifikt id för att hämta produkter från det och läsa ut dess namn
    try {

        const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}`)

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



    //Funktion för att hämta produkter från det kategori id som hämtades
    const getProducts = async() =>{
        loading.value = true;

        //GET-anrop för att hämta en kategoris produkter
    try {

        const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}/products`)

        //Om allt går bra sparas data
        if(res.ok) {
            const data = await res.json();
            console.log("Hämtad data", data);
            products.value = data;
        } 
        //Om det inte finns några produkter i kategorin
        if(products.value.length === 0) {
            emptySet.value = "Det finns inga produkter i den här kategorin..."
        }
        //Om något går fel med try
    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    
    }
}

//Funktion för att radera en produkt
    const deleteProduct = async (_id) => {
        //Token hämtas från localstorage
            const token = localStorage.getItem("token");
            error.value = "";

            //DELETE-anrop från API
        try {
            const res = await fetch("https://furniture-backend-aym8.onrender.com/products/" + _id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            //Om allt går bra
            if(res.ok) {
                getProducts();
                error.value = "";
                loginError.value = "";
                //Om användaren inte är inloggad
            } else if(res.status === 401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            //Om något annat går fel
            } else {
                error.value ="Något gick fel, försök igen"
            }
            //Om något går fel med try
        } catch (error) {
            console.log("There was an error: " + error)
        }
    }

</script>

<template>
    <!--Kategorinamnet läses ut-->
        <h1 class="m-3 text-center">Våra produkter i kategori {{ categories.name }}</h1>
        <p v-if="emptySet" class="error text-center text-secondary">{{ emptySet }}</p>

        <!--Om användaren inte är inloggad-->
    <div v-if="loginError" class="loginError">
        <h2 class="text-center text-danger">{{ loginError }}</h2>
        <LoginForm />
    </div>

    <!--Produkter visas-->
        <p v-if="loading" class="loading text-center text-muted">Produkter laddas in...</p>
        <!--Radera-knapp-->
<ProductItem v-for="product in products" :product="product" :key="product._id" @delete-product="deleteProduct"/>
<!--Felmeddelande-->
<p v-if="error" class="error text-center text-danger">{{ error }}</p>
<!--Knapp för att lägga till en ny produkt-->
        <button class="addProduct rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny produkt</RouterLink></button>
</template>

<style scoped>
    /*Styling för lägga till-knapp */
    .addProduct {
    border: 2px solid black;
    display: block;
    margin: 0 auto;
    box-shadow: 5px 5px 0px black;
}

.addProduct a{
        text-decoration: none;
}

.addProduct:hover {
    box-shadow: 2px 2px 0px black;
    transform: translate(3px, 3px);
}
</style>