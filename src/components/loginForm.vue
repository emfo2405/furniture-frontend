<template>
    <div id="signIn" class="d-flex flex-column align-items-center">
        <form class="p-3 col-10 col-md-6 col-lg-4 col-xl-3 border border-dark rounded"
        @submit.prevent="login">
            <label for="email" class="form-label">E-post:</label>
            <input type="email" class="form-control" id="email" v-model="email">

            <label for="password" class="form-label">Lösenord:</label>
            <input type="password" class="form-control" id="password" v-model="password">

            <div class="d-flex justify-content-around">
            <button id="logInButton" type="submit" class="btn btn-secondary mt-4">Logga in</button>
            <logoutButton />
            </div>

            <p class="error" v-if="error">{{ error }}</p>
        </form>
        

        <p>Har du inget konto än? Skapa ett <RouterLink to="/createuser" class="link-secondary link-offset-1 link-underline-opacity-25 link-underline-opacity-100-hover">här</RouterLink></p>
    </div>

</template>

<script setup>

    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import logoutButton from '@/components/logoutButton.vue';

    const error = ref("");
    const email = ref("");
    const password = ref("");

    const login = async() => {

        error.value = "";

        const data = {
            email: email.value,
            password: password.value
        }

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
                error.value="Du är inloggad!"

 
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user))

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