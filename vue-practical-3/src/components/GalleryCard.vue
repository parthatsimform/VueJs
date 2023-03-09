<template>
    <div class="card" v-for="car in cars" :key="car.name">
        <div class="cardTitle">
            <h2>{{ car.name }}</h2>
        </div>
        <div class="cardImgDiv">
            <img :src="car.image" :alt="car.name" class="cardImg">
        </div>
        <div class="cardDsc">
            <p>{{ car.desc }}</p>
        </div>
        <div class="info">
            <button class="priceBtn" @click.prevent="showPrice(car.name, car.price)" :disabled="!car.price"
                :class="{ notAvailable: !car.price }">
                {{ checkForPrice(car.price) }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["cars"],
    emits: ["alertPrice"],
    methods: {
        showPrice(name, price) {
            if (!this.$parent.viewForm) {
                this.$emit("alertPrice", name, price)
            }
        },
        checkForPrice(price) {
            if (price) {
                return "INFO";
            } else {
                return "Available Soon!";
            }
        }
    },
}
</script>

<style>
.card {
    width: 300px;
    height: auto;
    margin: 0 10px 10px;
    border-radius: 10px;
    background-color: #fff;
}

.card:hover {
    background-color: #e8ffdd;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
}

.cardTitle {
    font-family: 'Roboto', sans-serif;
}

.cardImg {
    width: 300px;
    height: 200px;
}

.cardDsc {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 5px;
    font-weight: 100;
    height: 112px;
    overflow: hidden;
}

.info {
    display: flex;
    flex-direction: column-reverse;
}

.priceBtn {
    border: 1px solid green;
    border-radius: 5px;
    padding: 7px 30px;
    background-color: green;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
}

.priceBtn:hover {
    color: #c7ffab;
    background-color: green;
}

.notAvailable {
    background-color: #1a4d01;
    cursor: not-allowed;
}
</style>