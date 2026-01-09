<template>
        <div id="categoryForm" class="w-75 d-block m-auto justify-content-center">
        <form @submit.prevent="updateCategory">
<h2 class="text-center m-4">Lägg till en kategori</h2>

    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

    <label for="nameCategory" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameCategory" v-model="nameCategory">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Uppdatera</button>
</form>

<p class="error" v-if="error">{{ error }}</p>
</div>
</template>

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { RouterLink, useRoute, useRouter} from 'vue-router';
    import LoginForm from './loginForm.vue';

    const category = ref(null);
    const nameCategory = ref("");
    const description = ref("");

    const loading = ref(false);
    const loginError = ref("");
    const error = ref("");

    const route = useRoute();
    const router = useRouter();
    const categoryId = route.params.categoryId;

    onMounted(() => {
        getCategory();
    })

    const getCategory = async() => {
        loading.value = true;

        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}`)

            if(res.ok) {
                const data = await res.json();
                category.value = data;
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
    watch (category, (newCategory) => {
        if(newCategory) {
            nameCategory.value = newCategory.name;
            description.value = newCategory.description;
        }
    });

    //Uppdatera formulär 
    const updateCategory = async () => {
        error.value = "";
        const token = localStorage.getItem("token");

        if(nameCategory.value.length < 1) {
            error.value = "Skriv ett namn";
            return;
        }

        if(description.value.length < 1) {
            error.value = "Skriv en beskrivning";
            return;
        }

        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}`, {
             method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameCategory.value,
                description: description.value,
            })
        }
    );
            

        if(res.status===401) {
            loginError.value = "Du måste vara inloggad";
            return;
        }

        if(res.ok) {
            router.push ("/categories");
            return;
        }

        } catch (err) {
            error.value = "Något gick fel";
        }

    }
</script>