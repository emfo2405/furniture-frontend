<template>
    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>
    <article class="d-flex flex-column align-items-center">
        <div class="categoryItem border border-dark m-4 p-3 w-50 d-flex flex-column align-items-center">

            <h3 class="border-bottom border-dark">{{ product.name }}</h3>
            <img class="m-3" v-bind:src="product.image" alt="Produktbild">
            <div class="text-start align-self-start ms-3">
            <p class="mb-0">Färg: {{ product.color }} </p>
            <p>Pris: {{ product.price }} kr</p>
            <p></p>  
            </div>

            <p class="text-secondary"> {{ product.description }}</p>
            <div class="d-flex align-items-center" id="stockDiv">
                <p class="mt-3">Lagersaldo:</p>
                <button id="addStock" class="rounded-circle m-2" @click="changeStock(-1)" :disabled="product.stock <=0"><span class="material-symbols-outlined d-flex">remove</span></button>
                <p class="mt-3">{{ product.stock }}</p>
                <button id="addStock" class="rounded-circle m-2" @click="changeStock(1)"><span class="material-symbols-outlined d-flex">add</span></button>
            </div>

             <button class="update rounded m-2 p-2 btn btn-dark"><RouterLink :to="`/products/${product._id}`" class="text-light">Uppdatera produkten</RouterLink></button>
            <button class="btn btn-danger rounded m-2" @click="$emit('deleteProduct', product._id)">Radera</button>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </article>
</template>

<script setup>
    import { ref } from 'vue';
import LoginForm from './loginForm.vue';
import { RouterLink } from 'vue-router';


    const error = ref("");
    const loginError = ref("");

    const emit = defineEmits(["deleteProduct"]);

    

    const props = defineProps({
        product: Object
    })

    const changeStock = async (setNumber) => {

        loginError.value = "";
         error.value = "";
         const token = localStorage.getItem("token");

        try{
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${props.product._id}/addStock`, {
                method: 'PATCH', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ setNumber: setNumber})
            });

            if(res.ok) {
                error.value = "";
                loginError.value = "";

            } else if(res.status === 401) {
                            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            } else {
                console.log("Det gick inte att uppdatera");

            }

            const updatedProduct = await res.json();
            props.product.stock = updatedProduct.stock;
        } catch (err) {
            console.log("Något gick fel vid uppdatering")
        }
    }
</script>