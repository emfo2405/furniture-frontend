<template>
    <div v-if="loginError" class="loginError">
        <h2 class="text-center text-danger mt-5 mb-3">{{ loginError }}</h2>
        <LoginForm />
    </div>
    <article class="d-flex flex-column align-items-center justify-content-center">
        <div class="col-10 col-md-8 col-lg-6 col-xl-4">
        <div class="categoryItem border border-dark m-4 p-3 d-flex flex-column align-items-center">

            <h3 class="productHeading border-bottom border-dark">{{ product.name }}</h3>
            <img class="m-3 w-50" v-bind:src="product.image" alt="Produktbild">
            <div class="text-center">
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

             <RouterLink :to="`/products/update/${product._id}`" class="text-light update rounded m-2 p-2 btn btn-dark">Uppdatera produkten</RouterLink>
            <button class="btn btn-danger rounded m-2" @click="$emit('deleteProduct', product._id)">Radera</button>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
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

<style scoped>
    .categoryItem img {
    width: 200px;
    border: 3px solid black;
}

    .categoryItem {
    box-shadow: 10px 10px 0px black;
    border: 3px solid black;

}

#stockDiv {
    border-top: 1.5px solid black;
}

#addStock {
    font-size: 20px;
    font-weight: bold;
    background-color: black;
}

#stockDiv p{
    font-size: 20px;;
}

.material-symbols-outlined {
    color: white;
    font-size: 15px;

}

@media (min-width: 1100px) {
.productHeading {
    font-size: 220%;
}

}
</style>