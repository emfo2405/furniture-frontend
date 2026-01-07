<template>
    <header>
        <div id="menu">
            <h1>FurnitureStore</h1>
            <nav>
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
                    <li class="nav-item">
                        <RouterLink to="/update" class="nav-link" active-class="active">Uppdatera</RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>


<script>
    import { RouterLink } from 'vue-router';
</script>

