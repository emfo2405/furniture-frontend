<template>
    <article>
        <div class="categoryItem">
            <h3>{{ category.name }} - {{ category.description }}</h3>

        </div>
    </article>
</template>

<script setup>
    const props = defineProps({
        category: Object
    })
</script>