<template>
<h1>Categories!</h1>
</template>

<script>
    const getCategories = async() =>{

    try {

        const res = await fetch("https://furniture-backend-aym8.onrender.com/categories")

        if(res.ok) {
            const data = await res.json();

        } else {

        }

    } catch (error){
        console.log("There was an error: " + error)
    } finally {
        
    }
    }

</script>