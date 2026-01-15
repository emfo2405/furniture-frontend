<template>
    <!--Header skapad med meny-->
    <header>
        <div id="menu">
            <h1 class="m-2 text-center mainHeader">FurnitureStore</h1>
            <nav class="m-2 mb-0 navbar navbar-expand-md">
                <!--Knapp för att visa meny på små skärmar-->
                <!--Klasser för hamburgermenyfunktionalitet-->
                <button class="menuBtn navbar-toggler m-1 p-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">Meny</button>
                <div id="navbar" class="collapse navbar-collapse m-1">
                <ul class="nav nav-tabs navbar-nav w-50 text-center">
                    <li class="nav-item">
                        <RouterLink to="/" class="nav-link" active-class="active">Start</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/categories" class="nav-link" active-class="active">Kategorier</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/add" class="nav-link" active-class="active">Lägg till</RouterLink>
                    </li>
                </ul>
                </div>
            </nav>
            <img class="w-100" src="/furniturestore.jpg">
        </div>
    </header>
</template>


<script>
    //Importerar router
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
    /*Design av länkar och meny */
        .nav-link {
        color: #ce6626;
    }

    .nav-link:hover {
        color: #a25b14;
    }

    #menu h1 {
        color: #ce6626
    }

    .mainHeader {
        font-size: 300%; 
    }

    .menuBtn{
        border: 2px solid #ac734f;
        color:#ac734f;
    }
</style>

