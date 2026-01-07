<template>
    <div id="startInfo" class="text-center p-3 m-5 alert alert-warning" role="alert">
        <h2>Välkommen till oss</h2>
        <p>text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
            text text text text 
        </p>
    </div>

    <div id="signIn" class="d-flex flex-column align-items-center">
        <form class="p-3 w-50  border border-dark rounded">
            <label for="email" class="form-label">E-post:</label>
            <input type="email" class="form-control" id="email">

            <label for="password" class="form-label">Lösenord:</label>
            <input type="password" class="form-control" id="password">

            <button id="logInButton" type="submit" class="btn btn-secondary mt-4">Logga in</button>

            
        </form>

        <p>Har du inget konto än? Skapa ett <a>här</a></p>
    </div>

</template>