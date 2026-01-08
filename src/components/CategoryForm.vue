<template>
        <div id="categoryForm" class="w-75 d-block m-auto justify-content-center">
        <form @submit.prevent="addCategory">
<h2 class="text-center m-4">Lägg till en kategori</h2>

    <label for="nameCategory" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameCategory" v-model="nameCategory">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description" v-model="description">

    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Lägg till</button>
</form>

<p class="error" v-if="error">{{ error }}</p>
</div>
</template>

<script setup>
    import {ref} from 'vue';

    const nameCategory = ref("");
    const description = ref("");
    const error = ref("");

    const emits = defineEmits(["updateCategories"]);

    const token = localStorage.getItem("token");

    const addCategory = async () => {
        if(nameCategory.value.length <1) {
            error.value = "Skriv ett namn";
            return;
        }
        if(description.value.length <1) {
            error.value = "Skriv en beskrivning";
            return;
        }

        const data = {
                name: nameCategory.value,
                description: description.value
            }

    
    try {
        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(res.ok) {
            emits("updateCategories");
            //Rensa fält i formuläret
            nameCategory.value = "";
            description.value = "";
        }
    } catch (error) {
        console.log("Något gick fel: " + error);
    }
        }
    

</script>