<template>
    <article class="d-flex flex-column align-items-center">
        <div class="categoryItem border border-dark m-4 p-3 w-50 d-flex flex-column align-items-center">
            <h3>{{ product.name }}</h3>
            <p> {{ product.description }}</p>
        </div>
    </article>
</template>

<script setup>
    const props = defineProps({
        product: Object
    })
</script>