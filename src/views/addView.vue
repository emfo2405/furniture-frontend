<script setup>
//Filer och komponenter importerade
import { ref, onMounted } from 'vue';
import CategoryItem from '@/components/CategoryItem.vue';
import { RouterLink } from 'vue-router';
import CategoryForm from '@/components/CategoryForm.vue';
import ProductsForm from '@/components/ProductsForm.vue';


</script>    

<template>
<!--Läser ut komponenter-->
<CategoryForm />

<ProductsForm />



</template>