<template>


    <article class="d-flex flex-column align-items-center">
        <div class="col-10 col-md-8 col-lg-6 col-xl-4">
        <div class="categoryItem m-4 p-3  d-flex flex-column align-items-center ">
            
            <h3 class="categoryHeading">{{ category.name }}</h3>
            <p class="text-secondary"> {{ category.description }}</p>
            <div id="categoryBtns" class="d-flex">
            <button class="toProducts rounded m-2 p-2 btn btn-dark"><RouterLink :to="`/products/${category._id}`" class="text-light">Visa produkterna</RouterLink></button>
           <RouterLink :to="`/categories/${category._id}`" class="text-light update rounded m-2 p-2 btn btn-dark">Uppdatera kategorin</RouterLink>
            </div>
            <button class="btn btn-danger rounded m-2" @click="$emit('deleteCategory', category._id)">Radera</button>
        </div>
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

<style scoped>
    .categoryItem {
    box-shadow: 10px 10px 0px black;
    border: 3px solid black;

}

.update, .toProducts {
    display: block;
    margin: 0 auto;
}

.update a, .toProducts a{
text-decoration: none;
}

#categoryBtns {
    border-top: 1.5px solid black;
}

@media (min-width: 1100px) {
.categoryHeading {
    font-size: 220%;
}

}


</style>