<template>
    <div id="categoryForm">
        <form>
<h2>Lägg till en kategori</h2>

    <label for="name" class="form-label">Namn:</label>
    <input type="name" class="form-control" id="name">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="beskrivning" class="form-control" id="description">

    <button id="addButton" type="submit" class="btn btn-secondary mt-4">Lägg till</button>
</form>
</div>

<div id="productForm">
    <h2>Lägg till en produkt</h2>
    <form>
    <label for="name" class="form-label">Namn:</label>
    <input type="text" class="form-control" id="name">

    <label for="color" class="form-label">Färg:</label>
    <input type="text" class="form-control" id="color">

    <label for="price" class="form-label">Pris:</label>
    <input type="number" class="form-control" id="price">

    <label for="beskrivning" class="form-label">Beskrivning:</label>
    <input type="text" class="form-control" id="description">

    <label for="stock" class="form-label">Lagersaldo:</label>
    <input type="number" class="form-control" id="stock">

    <label for="image" class="form-label">Bild-url:</label>
    <input type="url" class="form-control" id="image">

    <label for="category">Kategori:</label>
    <select id="category" name="category">

    </select>
</form>
</div>

</template>

<script setup>

</script>    