<template>
    <article class="d-flex flex-column align-items-center">
        <div class="categoryItem border border-dark m-4 p-3 w-50 d-flex flex-column align-items-center">
            <h3>{{ category.name }}</h3>
            <p> {{ category.description }}</p>
            <button class="toProducts"><RouterLink :to="`/products/${category._id}`" class="text-dark">Visa produkterna i kategorin</RouterLink></button>
  
        </div>
  </article>
</template>

<script setup>
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        category: Object
    })
</script>