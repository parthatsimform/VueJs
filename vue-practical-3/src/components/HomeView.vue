<template>
    <div id="homeComponent" :class="{ fadeBG: viewForm === true }" @click.prevent="viewForm = false">
        <div id="addCar">
            <button class="addCarBtn" @click.prevent.stop="showCarForm">Add Car</button>
        </div>
        <div id="carComponent">
            <GalleryCard :cars="cars" @alertPrice="displayPrice" />
        </div>
    </div>
    <CarForm v-if="viewForm" />
</template>

<script >
import GalleryCard from "./GalleryCard.vue"
import CarForm from "./CarForm.vue";

export default {
    name: "HomeView",
    props: ["cars"],
    components: {
        GalleryCard,
        CarForm,
    },
    data() {
        return {
            viewForm: false,
        }
    },
    methods: {
        displayPrice(name, price) {
            alert(name + "'s Price is: " + price);
        },
        showCarForm() {
            this.viewForm = true;

        }
    }
}
</script>

<style>
#homeComponent {
    padding: 10px 8%;
    background-color: rgb(240, 240, 240);
}

#addCar {
    display: flex;
    flex-direction: row-reverse;
    margin: 0 1% 10px;
}

.addCarBtn {
    padding: 7px 20px;
    background-color: #e8ffdd;
    color: green;
    border: 1px solid green;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}

.addCarBtn:hover {
    color: #e8ffdd;
    background-color: green;
}

#carComponent {

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
}

.fadeBG {
    filter: contrast(40%);
}
</style>