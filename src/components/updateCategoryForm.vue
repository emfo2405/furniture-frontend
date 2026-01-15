<template>
        <div id="categoryForm" class=" d-block m-auto justify-content-center col-10 col-md-8 col-lg-6 col-xl-4">
        <form @submit.prevent="updateCategory" >
<h1 class="text-center m-4">Uppdatera en kategori</h1>

    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>

    <label for="nameCategory" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameCategory" v-model="nameCategory">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <p class="error text-danger mt-3" v-if="error">{{ error }}</p>
    <p class="success text-success mt-3" v-if="success">{{ success }}</p>

    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Uppdatera</button>
</form>


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
    const success = ref("");

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
                error.value = "";
            } else {
                error.value = "Något gick fel, försök igen";
                success.value = "";
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
            success.value = "";
            return;
        }

        if(description.value.length < 1) {
            error.value = "Skriv en beskrivning";
            success.value = "";
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

        if(res.ok) {
            success.value = "Kategorin är uppdaterad"
            error.value = "";

            setTimeout(() => {
         router.push("/categories");   
        }, 1200);

        } else if(res.status===401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            } else {
                error.value = "Något gick fel, försök igen";
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