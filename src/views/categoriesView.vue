

<script setup>
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';
import { RouterLink } from 'vue-router';
import LoginForm from '@/components/loginForm.vue';


    const categories = ref([]);
    const loading = ref(false);
    const loginError = ref("");

    

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

    const deleteCategory = async (_id) => {
const token = localStorage.getItem("token");
        try {
            const res = await fetch("https://furniture-backend-aym8.onrender.com/categories/" + _id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            if(res.ok) {
                getCategories();
            }
        } catch (error) {
            console.log("There was an error: " + error)
        }
    }



</script>

<template>
        <h2 class="m-3 text-center">Våra kategorier</h2>
            <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

        <p v-if="loading" class="loading text-center text-muted">Kategorier laddas in...</p>
<CategoryItem v-for="category in categories" :category="category" :key="category._id" @delete-category="deleteCategory"/>
        <button class="addCategory rounded p-3 mt-5 mb-5"><RouterLink to="/add" class="text-dark">Lägg till en ny kategori</RouterLink></button>
</template>