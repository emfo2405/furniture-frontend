<script setup>
import { ref, onMounted } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { RouterLink, useRoute } from 'vue-router';


    const products = ref([])
    const loading = ref(false)

    const route = useRoute();
    const categoryId = route.params.categoryId;


    onMounted(() => {
        getProducts();
    })

    const getProducts = async() =>{
        loading.value = true;

    try {

        const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}/products`)

        if(res.ok) {
            const data = await res.json();
            console.log("Hämtad data", data);
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
        <h2 class="m-3 text-center">Våra produkter i kategori {{ categoryId }}</h2>

        <p v-if="loading" class="loading text-center text-muted">Produkter laddas in...</p>
<ProductItem v-for="product in products" :product="product" :key="product._id"/>
        <button class="addProduct rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny produkt</RouterLink></button>
</template>