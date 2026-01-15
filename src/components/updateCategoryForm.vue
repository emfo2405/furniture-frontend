<template>
        <div id="categoryForm" class=" d-block m-auto justify-content-center col-10 col-md-8 col-lg-6 col-xl-4">
        <form @submit.prevent="updateCategory" >
<h1 class="text-center m-4">Uppdatera en kategori</h1>
<!--Om användare inte är inloggad-->
    <div v-if="loginError" class="loginError">
        <h2>{{ loginError }}</h2>
        <LoginForm />
    </div>
<!--Formulär för att uppdatera kategori-->
    <label for="nameCategory" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameCategory" v-model="nameCategory">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

<!--Felmeddelanden eller meddelande om något lyckas-->
    <p class="error text-danger mt-3" v-if="error">{{ error }}</p>
    <p class="success text-success mt-3" v-if="success">{{ success }}</p>

<!--Knapp för att uppdatera-->
    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Uppdatera</button>
</form>


</div>
</template>

<script setup>
    //Importerar filer för scriptet
    import { ref, onMounted, watch } from 'vue';
    import { RouterLink, useRoute, useRouter} from 'vue-router';
    import LoginForm from './loginForm.vue';

    //Variabler skapas
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

    //När sidan läses in körs getCategory för att hämta en kategori med specifikt id som ska uppdateras
    onMounted(() => {
        getCategory();
    })

    const getCategory = async() => {
        loading.value = true;

        //GET-anrop för kategori med specifikt id
        try {
            const res = await fetch(`https://furniture-backend-aym8.onrender.com/categories/${categoryId}`)

            //Om allt går bra
            if(res.ok) {
                const data = await res.json();
                category.value = data;
                error.value = "";
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

    //Fyll formulär och kollar efter uppdateringar
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

        //Kontrollerar input
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

        //PATCH-anrop till API
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

    //Om allt går bra
        if(res.ok) {
            success.value = "Kategorin är uppdaterad"
            error.value = "";

            //Skickas till kategori efter uppdatering
            setTimeout(() => {
         router.push("/categories");   
        }, 1200);

        //Om användaren inte är inloggad
        } else if(res.status===401) {
            loginError.value = "Du måste vara inloggad";
            window.scrollTo({
            top:250,
             behavior: "smooth"
            })
            //Om något annat går fel
            } else {
                error.value = "Något gick fel, försök igen";
            }
//Om något går fel med try
        } catch (err) {
            error.value = "Något gick fel";
        }

    }
</script>