<script setup>
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';
import { RouterLink } from 'vue-router';
import CategoryForm from '@/components/CategoryForm.vue';


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
<CategoryForm @update-categories="getCategories"/>

<div id="productForm" class="w-75 d-block m-auto justify-content-center">
    <h2 class="text-center m-4">Lägg till en produkt</h2>
    <form>
    <label for="name" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="name">

    <label for="color" class="form-label">Färg:</label>
    <input type="text" class="form-control" id="color">

    <label for="price" class="form-label">Pris:</label>
    <input type="number" class="form-control" id="price">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description">

    <label for="stock" class="form-label">Lagersaldo:</label>
    <input type="number" class="form-control" id="stock">

    <label for="image" class="form-label">Bild-url:</label>
    <input type="url" class="form-control" id="image">

    <label for="category" class="form-label">Kategori:</label>
    <select id="category" name="category" class="form-control">
        <option 
        v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
    </select>

    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Lägg till</button>
</form>
</div>

</template>