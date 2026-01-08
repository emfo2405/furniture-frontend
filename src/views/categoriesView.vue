

<script setup>
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';
import { RouterLink } from 'vue-router';


    const categories = ref([])
    const loading = ref(false)

    onMounted(() => {
        getCategories();
    })

    const getCategories = async() =>{
        loading.value = true;

    try {

        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories")

        if(res.ok) {
            const data = await res.json();
            categories.value = data;
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
        <h2 class="m-3 text-center">Våra kategorier</h2>

        <p v-if="loading" class="loading text-center text-muted">Kategorier laddas in...</p>
<CategoryItem v-for="category in categories" :category="category" :key="category._id"/>
        <button class="addCategory rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny kategori</RouterLink></button>
</template>