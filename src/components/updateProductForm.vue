<template>
    <!--Om användaren inte är inloggad-->
    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>
<!--Formulär för att uppdatera produkt-->
<div id="productForm" class=" d-block m-auto justify-content-center col-10 col-md-8 col-lg-6 col-xl-4">
    <h1 class="text-center m-4">Uppdatera en produkt</h1>
    <form @submit.prevent="updateProduct">
    <label for="name" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="name" v-model="nameProduct">

    <label for="color" class="form-label">Färg:</label>
    <input type="text" class="form-control" id="color" v-model="color">

    <label for="price" class="form-label">Pris:</label>
    <input type="number" class="form-control" id="price" v-model="price">

    <label for="description" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <label for="stock" class="form-label">Lagersaldo:</label>
    <input type="number" class="form-control" id="stock" v-model="stock">

    <label for="image" class="form-label">Bild-url:</label>
    <input type="url" class="form-control" id="image" v-model="image">

    <!--Felmeddelanden eller meddelanden om att något lyckas-->
    <p class="error text-danger mt-3" v-if="error">{{ error }}</p>
    <p class="success text-success mt-3" v-if="success">{{ success }}</p>

    <!--Knapp för att uppdatera produkt-->
    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Uppdatera produkt</button>
</form>

</div>

</template>

<script setup>
    //Läser in filer för scriptet
    import { ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import LoginForm from './loginForm.vue';

    //Skapar variabler
    const product = ref(null);
    const nameProduct = ref("");
    const color = ref("");
    const price = ref("");
    const description = ref("");
    const stock = ref("");
    const image = ref("");
    const category = ref("");
    const categories = ref([])

    const loading = ref(false);
    const loginError = ref("");
    const error = ref("");
    const success = ref("");

    const route = useRoute();
    const router = useRouter();
    const productId = route.params.productId;

    //Hämtar in produkt när sidan läses in
    onMounted(() => {
        getProduct();
    })

//Funktion för att hämta in en produkt med visst id
    const getProduct = async() => {
        loading.value = true;

        //GET-anrop för produkt med id
        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${productId}`)

            //Om allt går bra
            if(res.ok) {
                const data = await res.json();
                product.value = data;
                //Om något går fel
            } else {
                error.value = "Något gick fel, försök igen";
                success.value = "";
            }
            //Om något går fel med try
        } catch (err) {
            console.log("Något gick fel: " + error)
        } finally {
            loading.value = false;
        }
    }

    //Fyll formulär och kollar efter ändringar
    watch (product, (newProduct) => {
        if(newProduct) {
            nameProduct.value = newProduct.name;
            color.value = newProduct.color;
            price.value = newProduct.price;
            description.value = newProduct.description;
            stock.value = newProduct.stock;
            image.value = newProduct.image;
            category.value = newProduct.category;
        }
    });

    //Uppdatera formulär
        const updateProduct = async () => {
        error.value = "";
        //Läser in token från localstorage
        const token = localStorage.getItem("token");

        //Kontrollerar inputs
        if(nameProduct.value.length < 1) {
            error.value = "Skriv ett namn";
            success.value = "";
            return;
        }
        if(color.value.length < 1) {
            error.value = "Skriv en färg";
            success.value = "";
            return;
        }
        if(Number(price.value) < 1) {
            error.value = "Skriv ett pris";
            success.value = "";
            return;
        }
        if(Number(stock.value) < 1) {
            error.value = "Skriv ett lagersaldo";
            success.value = "";
            return;
        }
        if(image.value.length < 1) {
            error.value = "Lägg till en bildlänk";
            success.value = "";
            return;
        }
        if(description.value.length < 1) {
            error.value = "Lägg till en beskrivning";
            success.value = "";
            return;
        }


        //Sparar input i variabel
        const data = {
            name: nameProduct.value,
            color: color.value,
            price: Number(price.value),
            stock: Number(stock.value),
            image: image.value,
            description: description.value,
        }

        //PATCH-anrop för produkt med id för att uppdatera med nya uppgifter
        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${productId}`, {
             method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            
//Om allt går bra
        if(res.ok) {
        success.value = "Produkten är uppdaterad"
            error.value = "";
            setTimeout(() => {
         router.push("/categories");   
        }, 1200);
        //Om användaren inte är autentiserad
        } else if(res.status===401) {
            loginError.value = "Du måste vara inloggad";
            success.value = "";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            //Om något annat går fel
            } else {
                error.value = "Något gick fel, försök igen";
                success.value = "";
            }
//Om något går fel med try
        } catch (err) {
            error.value = "Något gick fel";
        }

    }

</script>