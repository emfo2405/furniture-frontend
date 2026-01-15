<template>
    <!--Om användaren inte är inloggad visas felmeddelande-->
    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

    <!--Formulär för att lägga till en ny produkt-->
<div id="productForm" class="mt-5 d-block m-auto justify-content-center col-10 col-md-8 col-lg-6 col-xl-3">
    <h1 class="text-center m-4">Lägg till en produkt</h1>
    <form @submit.prevent="addProduct">
    <label for="name" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="name" v-model="nameProduct">

    <label for="color" class="form-label">Färg:</label>
    <input type="text" class="form-control" id="color" v-model="color">

    <label for="price" class="form-label">Pris:</label>
    <input type="number" class="form-control" id="price" v-model="price">

    <label for="description" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <label for="stock" class="form-label">Lagersaldo:</label>
    <input type="number" class="form-control" id="stock" v-model="stock">

    <label for="image" class="form-label">Bild-url:</label>
    <input type="url" class="form-control" id="image" v-model="image">

    <!--Läser in kategori för att koppla produkt till kategori-->
    <label for="category" class="form-label">Kategori:</label>
    <select id="category" name="category" class="form-control" v-model="category">
        <option 
        v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
    </select>

<!--Felmeddelande eller meddelande om att funktionen lyckades-->
    <p class="error mt-3 text-danger" v-if="error">{{ error }}</p>
    <p class="success mt-3 text-success" v-if="success">{{ success }}</p>

    <!--Knapp för att lägga till ny produkt-->
    <button id="addButton" type="submit" class="btn btn-secondary mt-2 mb-5">Lägg till</button>
</form>
</div>

</template>

<script setup>
    //Importerar filer för scriptet
import { ref } from 'vue';
import { onMounted } from 'vue';
import LoginForm from './loginForm.vue';

//Variabler skapas
    const categories = ref([])
    const loading = ref(false)

    const error = ref("");
    const loginError = ref("");
    const success = ref("");

    const nameProduct = ref("");
    const color = ref("");
    const price = ref("");
    const stock = ref("");
    const image = ref("");
    const category = ref("");
    const description = ref("");

    //Token läses in från localstorage
    const token = localStorage.getItem("token");

    //Kontroller av inputs
    const addProduct = async () => {
        if(nameProduct.value.length < 1) {
            error.value = "Skriv ett namn";
            success.value = "";
            return;
        }
        if(color.value.length < 1) {
            error.value = "Skriv en färg";
            success.value = "";
            return;
        }
        if(Number(price.value) < 1) {
            error.value = "Skriv ett pris";
            success.value = "";
            return;
        }
        if(Number(stock.value) < 1) {
            error.value = "Skriv ett lagersaldo";
            success.value = "";
            return;
        }
        if(image.value.length < 1) {
            error.value = "Lägg till en bildlänk";
            success.value = "";
            return;
        }
        if(description.value.length < 1) {
            error.value = "Lägg till en beskrivning";
            success.value = "";
            return;
        }

        //Inputs samlas i en variabel
        const data = {
            name: nameProduct.value,
            color: color.value,
            price: Number(price.value),
            stock: Number(stock.value),
            image: image.value,
            description: description.value
        }

        //POST-anrop görs till API för att kunna lägga till en produkt med ett visst kategori id 
        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${category.value}/products`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        //Om allt går bra
                if(res.ok) {
      
            //Rensa fält i formuläret
            nameProduct.value = "";
            description.value = "";
            color.value = "";
            price.value = "";
            stock.value = "";
            image.value = "";
            success.value = "En ny produkt är tillagd";
            error.value = "";

        //Om användaren inte är inloggad
        }else if(res.status === 401) {
            loginError.value = "Du måste vara inloggad";
            success.value = "";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            //Om något annat går fel
            } else {
                error.value = "Något gick fel, försök igen"
                success.value = "";
            }
            //Om något går fel med try
        } catch (error) {
            console.log("Något gick fel: " + error)
        }
    }

//Hämtar kategorier när sidan läses in
    onMounted(() => {
        getCategories();
    })

    //Funktion för att hämta kategorier till select inputet i formuläret
    const getCategories = async() =>{
        loading.value = true;

        //GET_anrop till API
    try {

        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories")

        //Om allt går bra
        if(res.ok) {
            const data = await res.json();
            categories.value = data;
        } else {

        }
        //Om något går fel med try
    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    }
}

</script>