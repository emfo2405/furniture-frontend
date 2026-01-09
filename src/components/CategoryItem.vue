<template>
    <article class="d-flex flex-column align-items-center">
        <div class="categoryItem m-4 p-3 w-50 d-flex flex-column align-items-center">
            <h3>{{ category.name }}</h3>
            <p class="text-secondary"> {{ category.description }}</p>
            <div id="categoryBtns" class="d-flex">
            <button class="toProducts rounded m-2 p-2 btn btn-dark"><RouterLink :to="`/products/${category._id}`" class="text-light">Visa produkterna</RouterLink></button>
            <button class="update rounded m-2 p-2 btn btn-dark"><RouterLink :to="`/categories/${category._id}`" class="text-light">Uppdatera kategorin</RouterLink></button>
            </div>
            <button class="btn btn-danger rounded m-2" @click="$emit('deleteCategory', category._id)">Radera</button>
        </div>
  </article>
</template>

<script setup>
    import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';


    const props = defineProps({
        category: Object
    })

      const emit = defineEmits(["deleteCategory"]);
</script>