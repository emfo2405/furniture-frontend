<template>
    <div id="signIn" class="d-flex flex-column align-items-center">
        <div class="loginFormDiv p-3 col-10 col-md-8 col-lg-6 col-xl-3 border border-dark rounded">
        <form 
        @submit.prevent="login">
        <!--Formulär skapat för att logga in-->
            <label for="email" class="form-label">E-post:</label>
            <input type="email" class="form-control" id="email" v-model="email">

            <label for="password" class="form-label">Lösenord:</label>
            <input type="password" class="form-control" id="password" v-model="password">

            <!--Knapp för att logga in-->
            <div class="d-flex justify-content-around">
            <button id="logInButton" type="submit" class="btn btn-secondary mt-4">Logga in</button>
            
            <!--Felmeddelanden och successmeddelanden-->
            </div>
            <p class="success mt-3 text-success text-center" v-if="success">{{ success }}</p>
            <p class="error mt-3 text-danger text-center" v-if="error">{{ error }}</p>
        </form>
        <div class="d-flex flex-column justify-content-around">
            <!--Infogar en utloggningsknapp-->
        <logoutButton />
        </div>
        </div>
        <!--Länk för att kunna logga ut och ta bort token-->
        <p>Har du inget konto än? Skapa ett <RouterLink to="/createuser" class="link-secondary link-offset-1 link-underline-opacity-25 link-underline-opacity-100-hover">här</RouterLink></p>
    </div>

</template>

<script setup>
//Filer importerade för scriptet
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import logoutButton from '@/components/logoutButton.vue';

    //Variabler skapade
    const error = ref("");
    const success = ref("");
    const email = ref("");
    const password = ref("");

    //Inloggningsfunktion
    const login = async() => {

        error.value = "";

        //Input samlas i en variabel
        const data = {
            email: email.value,
            password: password.value
        }

        //Input kontrolleras
        if(email.value.length <1) {
            error.value = "Fyll i e-postadress";
            success.value = "";
            return;
        }
        if(password.value.length <1) {
            error.value = "Fyll i ett lösenord";
            success.value = "";
            return;}

            //POST-anrop till API
        try{
            const res = await fetch("https://furniture-backend-aym8.onrender.com/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data )
            });

                           const result = await res.json();

            //Om allt går bra 
            if(res.ok) {
                console.log("Du är inloggad");
                email.value = "";
                password.value = "";
                success.value="Du är inloggad!"
                error.value="";

                //Token sparas och användare sparas
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user))

                //Om lösenord eller e-postadress är fel
            } else if (res.status===422) {
                error.value = "E-postadress eller lösenord stämmer inte, testa igen";
                success.value = "";
                //Om något annat går fel
            } else {
                error.value = "Något gick fel vid inloggning"
                success.value = "";
            }
            //Om något går fel med try
        } catch (err){
            console.log("Något gick fel vid inloggning", err)
        }
    }
</script>

<style scoped>
    /*Design för utloggningsknapp */
    #logoutBtn {
    border: none;
    background-color: white;
    text-decoration: underline;
}
</style>