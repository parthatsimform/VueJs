<template>
    <nav>
        <h1>
            <span>Car Gallery</span>
        </h1>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
}
</script>

<style scoped>
* {
    background-color: white;
}

h1 {
    margin: 0;
    padding: 35px 0;
    text-align: center;
    font-size: xxx-large;
}

h1 span {
    color: #184b00;
    cursor: pointer;
}

h1 span:hover {
    color: green;
}
</style>