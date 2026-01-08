<script setup>
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';
import { RouterLink } from 'vue-router';


    const products = ref([])
    const loading = ref(false)

    onMounted(() => {
        getProducts();
    })

    const getProducts = async() =>{
        loading.value = true;

    try {

        const res = await fetch("https://furniture-backend-aym8.onrender.com/products")

        if(res.ok) {
            const data = await res.json();
            products.value = data;
        } else {

        }

    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    }
    }

</script>

<template>
        <h2 class="m-3 text-center">Våra produkter</h2>

        <p v-if="loading" class="loading text-center text-muted">Produkter laddas in...</p>
<CategoryItem v-for="product in products" :product="product" :key="product._id"/>
        <button class="addProduct rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny produkt</RouterLink></button>
</template>