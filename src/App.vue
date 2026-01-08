<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import FooterComponent from './components/FooterComponent.vue';


</script>

<template>
  <Header/>
  <main>
    <RouterView/>
  </main>
  <FooterComponent/>
</template>

<style scoped></style>
