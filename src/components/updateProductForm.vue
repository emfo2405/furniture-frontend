<template>
    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

<div id="productForm" class="w-75 d-block m-auto justify-content-center">
    <h2 class="text-center m-4">Lägg till en produkt</h2>
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

    <label for="category" class="form-label">Kategori:</label>
    <select id="category" name="category" class="form-control" v-model="category">
        <option 
        v-for="category in categories" :key="category._id" :value="category._id">{{ category.name }}</option>
    </select>

    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Uppdatera produkt</button>
</form>
<p class="error" v-if="error">{{ error }}</p>
</div>

</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import LoginForm from './loginForm.vue';

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

    const route = useRoute();
    const router = useRouter();
    const productId = route.params.productId;

    onMounted(() => {
        getProduct();
    })

        onMounted(() => {
        getCategories();
    })

    const getCategories = async() =>{
        loading.value = true;

    try {

        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories")

        if(res.ok) {
            const data = await res.json();
            categories.value = data;
        } else {

        }

    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        loading.value = false;
    }
}

    const getProduct = async() => {
        loading.value = true;

        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${productId}`)

            if(res.ok) {
                const data = await res.json();
                product.value = data;
            } else {
                error.value = "Något gick fel";
            }
        } catch (err) {
            console.log("Något gick fel: " + error)
        } finally {
            loading.value = false;
        }
    }

    //Fyll formulär
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
        const token = localStorage.getItem("token");

        if(nameProduct.value.length < 1) {
            error.value = "Skriv ett namn";
            return;
        }
        if(color.value.length < 1) {
            error.value = "Skriv en färg";
            return;
        }
        if(Number(price.value) < 1) {
            error.value = "Skriv ett pris";
            return;
        }
        if(Number(stock.value) < 1) {
            error.value = "Skriv ett lagersaldo";
            return;
        }
        if(image.value.length < 1) {
            error.value = "Lägg till en bildlänk";
            return;
        }
        if(description.value.length < 1) {
            error.value = "Lägg till en beskrivning";
            return;
        }

        const data = {
            name: nameProduct.value,
            color: color.value,
            price: Number(price.value),
            stock: Number(stock.value),
            image: image.value,
            description: description.value,
            category: category.value
        }

        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/products/${productId}`, {
             method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
            

        if(res.status===401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            }

        if(res.ok) {
            router.push (`/categories/${product.value.category}`);
            return;
        }

        } catch (err) {
            error.value = "Något gick fel";
        }

    }

</script>