<template>
    <div id="signIn" class="d-flex flex-column align-items-center">
        <div class="loginFormDiv p-3 col-10 col-md-8 col-lg-6 col-xl-3 border border-dark rounded">
        <form 
        @submit.prevent="login">
            <label for="email" class="form-label">E-post:</label>
            <input type="email" class="form-control" id="email" v-model="email">

            <label for="password" class="form-label">Lösenord:</label>
            <input type="password" class="form-control" id="password" v-model="password">

            <div class="d-flex justify-content-around">
            <button id="logInButton" type="submit" class="btn btn-secondary mt-4">Logga in</button>
            
            </div>
            <p class="success mt-3 text-success text-center" v-if="success">{{ success }}</p>
            <p class="error mt-3 text-danger text-center" v-if="error">{{ error }}</p>
        </form>
        <div class="d-flex flex-column justify-content-around">
        <logoutButton />
        </div>
        </div>

        <p>Har du inget konto än? Skapa ett <RouterLink to="/createuser" class="link-secondary link-offset-1 link-underline-opacity-25 link-underline-opacity-100-hover">här</RouterLink></p>
    </div>

</template>

<script setup>

    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import logoutButton from '@/components/logoutButton.vue';

    const error = ref("");
    const success = ref("");
    const email = ref("");
    const password = ref("");

    const login = async() => {

        error.value = "";

        const data = {
            email: email.value,
            password: password.value
        }

        if(email.value.length <1) {
            error.value = "Fyll i e-postadress";
            return;
        }
        if(password.value.length <1) {
            error.value = "Fyll i ett lösenord";
            return;}

        try{
            const res = await fetch("https://furniture-backend-aym8.onrender.com/users/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data )
            });

                           const result = await res.json();

            if(res.ok) {
                console.log("Du är inloggad");
                email.value = "";
                password.value = "";
                success.value="Du är inloggad!"
                error.value="";

 
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user))

            } else if (res.status===422) {
                error.value = "E-postadress eller lösenord stämmer inte, testa igen"
            } else {
                error.value = "Något gick fel vid inloggning"
            }
        } catch (err){
            console.log("Något gick fel vid inloggning", err)
        }
    }
</script>

<style scoped>
    #logoutBtn {
    border: none;
    background-color: white;
    text-decoration: underline;
}
</style>