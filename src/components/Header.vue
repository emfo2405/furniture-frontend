<template>
    <header>
        <div id="menu">
            <h1>FurnitureStore</h1>
            <nav>
                <ul>
                    <li><RouterLink to="/">Start</RouterLink></li>
                    <li><RouterLink to="/categories">Kategorier</RouterLink></li>
                    <li><RouterLink to="/add">Lägg till</RouterLink></li>
                    <li><RouterLink to="/update">Uppdatera</RouterLink></li>
                </ul>
            </nav>
        </div>
    </header>
</template>


<script>
    import { RouterLink } from 'vue-router';
</script>