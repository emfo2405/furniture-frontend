<template>
        <div id="userForm" class="col-10 col-md-8 col-lg-6 col-xl-3 d-block m-auto justify-content-center">
        <form @submit.prevent="addUser">
            <!--Skapar formulär för att kunna skapa en ny användare-->
<h1 class="text-center m-4">Skapa ett användarkonto</h1>

    <label for="nameUser" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="nameUser" v-model="nameUser">

    <label for="email" class="form-label">E-post:</label>
    <input type="email" class="form-control" id="email" v-model="email">

    <label for="password" class="form-label">Lösenord:</label>
    <input type="password" class="form-control" id="password" v-model="password">

    <label for="role" class="form-label">Arbetsroll:</label>
    <select id="role" name="role" class="form-control" v-model="role"> 
        <option value="Lagerarbetare">Lagerarbetare</option>
        <option value="Arbetsledare">Arbetsledare</option>
    </select>

    <!--Läser ut felmeddelanden eller meddelanden om att något lyckades-->
    <p class="success mt-2 text-success" v-if="success">{{ success }}</p>
    <p class="error mt-2 text-danger" v-if="error">{{ error }}</p>

    <!--Knapp för att skapa användare-->
    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Skapa användare</button>
</form>


</div>
</template>

<script setup>
    //Importerar filer till scriptet
    import {ref} from 'vue';

    //Skapar variabler
    const nameUser = ref("");
    const email = ref("");
    const password = ref("");
    const role = ref("");

    const error = ref("");
    const success = ref("");

    //Funktion för att lägga till användare
    const addUser = async () => {
        //Kontrollera input
        if(nameUser.value.length <1) {
            error.value = "Skriv ett namn";
            return;
        }
        if(email.value.length <1) {
            error.value = "Skriv en e-postadress";
            return;
        }
        if(password.value.length <1) {
            error.value = "Skriv ett lösenord";
            return;
        }
        if(role.value.length <1) {
            error.value = "Välj en arbetsroll";
            return;
        }
        //Sparar input i variabel
        const data = {
                name: nameUser.value,
                email: email.value,
                password: password.value,
                role: role.value
            }

    //POST-anrop till API för att skapa en ny användare med sparad input
    try {
        const res = await fetch("https://furniture-backend-aym8.onrender.com/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        //Om allt går bra
        if(res.ok) {
 
            //Rensa fält i formuläret
            nameUser.value = "";
            email.value = "";
            password.value = "";
            role.value = "";
            error.value = "";
            success.value = "Ny användare skapad!";
            //Om e-posten redan finns
        } else if(res.status===409) {
            error.value = "E-postadressen är redan registrerad, testa med en annan"
            success.value = "";
            //Om något annat går fel
        } else {
            error.value = "Något gick fel, försök igen."
            success.value = "";
        }

//Om något går fel med try
    } catch (error) {
        console.log("Något gick fel: " + error);
    }
        }
    

</script>