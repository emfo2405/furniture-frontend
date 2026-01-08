<template>
    <article class="d-flex flex-column align-items-center">
        <div class="categoryItem border border-dark m-4 p-3 w-50 d-flex flex-column align-items-center">
            <h3>{{ user.name }}</h3>
            <p> {{ user.email }}</p>
            <p> {{ user.role }}</p>
            <button>Logga ut</button>
        </div>
  </article>
</template>

<script setup>
    const props = defineProps({
        user: Object
    })

</script>