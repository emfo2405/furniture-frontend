<script setup>
import { ref, onMounted } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { RouterLink, useRoute } from 'vue-router';




    const products = ref([])
    const categories = ref([])
    const loading = ref(false)

    const token = localStorage.getItem("token");

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
            console.log("Hämtad data", data);
            categories.value = data;
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
        } else {

        }

    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    
    }
}

    const deleteProduct = async (_id) => {
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
            }
        } catch (error) {
            console.log("There was an error: " + error)
        }
    }

</script>

<template>
        <h2 class="m-3 text-center">Våra produkter i kategori {{ categories.name }}</h2>

        <p v-if="loading" class="loading text-center text-muted">Produkter laddas in...</p>
<ProductItem v-for="product in products" :product="product" :key="product._id" @delete-product="deleteProduct"/>
        <button class="addProduct rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny produkt</RouterLink></button>
</template>