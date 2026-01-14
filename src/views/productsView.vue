<script setup>
import { ref, onMounted } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { RouterLink, useRoute } from 'vue-router';
import LoginForm from '@/components/loginForm.vue';



    const products = ref([])
    const categories = ref([])
    const loading = ref(false)
    const loginError = ref("");
    const error = ref("");
    const emptySet = ref("");

    const route = useRoute();
    const categoryId = route.params.categoryId;




    onMounted(() => {
        getProducts();
        showCategory();
    })

    const showCategory = async() =>{
        loading.value = true;

    try {

        const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}`)

        if(res.ok) {
            const data = await res.json();
            categories.value = data;
        } else if(res.status === 401) {
                loginError.value = "Du måste vara inloggad för att göra ändringar";
        } else {

        }

    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    }
}



    
    const getProducts = async() =>{
        loading.value = true;

    try {

        const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}/products`)

        if(res.ok) {
            const data = await res.json();
            console.log("Hämtad data", data);
            products.value = data;
            console.log(products.value);
        } 
        
        if(products.value.length === 0) {
            emptySet.value = "Det finns inga produkter i den här kategorin..."
        }

    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    
    }
}

    const deleteProduct = async (_id) => {
            const token = localStorage.getItem("token");
            error.value = "";
        try {
            const res = await fetch("https://furniture-backend-aym8.onrender.com/products/" + _id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            if(res.ok) {
                getProducts();
                error.value = "";
                loginError.value = "";
            } else if(res.status === 401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            }
        } catch (error) {
            console.log("There was an error: " + error)
        }
    }

</script>

<template>
        <h1 class="m-3 text-center">Våra produkter i kategori {{ categories.name }}</h1>
        <p v-if="emptySet" class="error text-center text-secondary">{{ emptySet }}</p>

    <div v-if="loginError" class="loginError">
        <h2 class="text-center text-danger">{{ loginError }}</h2>
        <LoginForm />
    </div>

        <p v-if="loading" class="loading text-center text-muted">Produkter laddas in...</p>
<ProductItem v-for="product in products" :product="product" :key="product._id" @delete-product="deleteProduct"/>
<p v-if="error" class="error text-center text-danger">{{ error }}</p>
        <button class="addProduct rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny produkt</RouterLink></button>
</template>

<style scoped>
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