<template>
    <header>
        <div id="menu">
            <h1 class="m-2 text-center">FurnitureStore</h1>
            <nav class="m-2 mb-0">
                <ul class="nav nav-tabs">
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
            </nav>
            <img class="w-100" src="/furnitureStoreHeader.jpg">
        </div>
    </header>
</template>


<script>
    import { RouterLink } from 'vue-router';
</script>

<style scoped>
        .nav-link {
        color: #ce6626;
    }

    .nav-link:hover {
        color: #a25b14;
    }

    #menu h1 {
        color: #ce6626
    }
</style>

