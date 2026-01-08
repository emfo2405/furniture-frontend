

<script setup>
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';


    const categories = ref([])

    onMounted(() => {
        getCategories();
    })

    const getCategories = async() =>{

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

    }
    }

</script>

<template>
<CategoryItem v-for="category in categories" :category="category" :key="category._id"/>
</template>