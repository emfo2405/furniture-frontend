<template>
    <!--Felmeddelande om autentisering misslyckas-->
    <div v-if="loginError" class="loginError">
        <h2 class="text-center text-danger mt-5 mb-3">{{ loginError }}</h2>
        <LoginForm />
    </div>
    <article class="d-flex flex-column align-items-center justify-content-center">
        <div class="col-10 col-md-8 col-lg-6 col-xl-3">
        <div class="categoryItem border border-dark m-4 p-3 d-flex flex-column align-items-center">
<!--Struktur för hur en produkt ska visas-->
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
<!--Knapp för att ändra lagersaldo med +1 eller -1-->
                <button id="addStock" class="rounded-circle m-2" @click="changeStock(-1)" :disabled="product.stock <=0"><span class="material-symbols-outlined d-flex">remove</span></button>
                <p class="mt-3">{{ product.stock }}</p>
                <button id="addStock" class="rounded-circle m-2" @click="changeStock(1)"><span class="material-symbols-outlined d-flex">add</span></button>
            </div>
<!--Om allt går bra visas successtext-->
            <p v-if="success" class="success text-success">{{ success }}</p>

<!--Knapp för att uppdatera eller radera produkt-->
             <RouterLink :to="`/products/update/${product._id}`" class="text-light update rounded m-2 p-2 btn btn-dark">Uppdatera produkten</RouterLink>
            <button class="btn btn-danger rounded m-2" @click="$emit('deleteProduct', product._id)">Radera</button>
<!--Felmeddelande om något går fel-->
            <p v-if="error" class="error text-danger mt-3">{{ error }}</p>
        </div>
        </div>
    </article>
</template>

<script setup>
    //Importerar filer för scriptet
    import { ref } from 'vue';
import LoginForm from './loginForm.vue';
import { RouterLink } from 'vue-router';

//Variabler skapade
    const error = ref("");
    const success = ref("");
    const loginError = ref("");

    const emit = defineEmits(["deleteProduct"]);

    
//Objekt skapat för produkt
    const props = defineProps({
        product: Object
    })

    //Funktion för att ändra lagersaldo
    const changeStock = async (setNumber) => {

        loginError.value = "";
         error.value = "";
         //Token hämtas in
         const token = localStorage.getItem("token");

         //PATCH-anrop till API
        try{
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${props.product._id}/addStock`, {
                method: 'PATCH', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ setNumber: setNumber})
            });

            //Om allt går bra
            if(res.ok) {
                error.value = "";
                loginError.value = "";
                success.value = "Lagersaldot har uppdaterats!"

                //Om användaren inte är inloggad
            } else if(res.status === 401) {
            loginError.value = "Du måste vara inloggad";
            success.value = "";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            //Om något annat går fel
            } else {
                error.value = "Något gick fel, försök igen"
                console.log("Det gick inte att uppdatera");
                success.value = "";

            }
            //Lagersaldo uppdateras till det nya värdet
            const updatedProduct = await res.json();
            props.product.stock = updatedProduct.stock;
            //Om något går fel med try
        } catch (err) {
            console.log("Något gick fel vid uppdatering")
        }
    }
</script>

<style scoped>
    /*Design för att visa produkt */
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