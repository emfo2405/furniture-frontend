<template>
    <article class="d-flex flex-column align-items-center">
        <div class="categoryItem border border-dark m-4 p-3 w-50 d-flex flex-column align-items-center">

            <h3>{{ product.name }}</h3>
            <h4>{{ product.price }}</h4>
            <h4>{{ product.color }}</h4>
            <p> {{ product.description }}</p>
            <div class="d-flex" id="stockDiv">
                <button @click="changeStock(-1)" :disabled="product.stock <=0">-</button>
                <p>{{ product.stock }}</p>
                <button @click="changeStock(1)">+</button>
            </div>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </article>
</template>

<script setup>
    import { ref } from 'vue';

    const error = ref("");

    

    const props = defineProps({
        product: Object
    })

    const changeStock = async (setNumber) => {

         error.value = "";

        try{
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${props.product._id}/addStock`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ setNumber: setNumber})
            });

            if(res.ok) {

            } else if(res.status === 401) {
                error.value = "Du måste vara inloggad för att göra ändringar";
            }
            
            else {
                console.log("Det gick inte att uppdatera");

            }

            const updatedProduct = await res.json();
            props.product.stock = updatedProduct.stock;
        } catch (err) {
            console.log("Något gick fel vid uppdatering")
        }
    }
</script>