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
        <button class="priceBtn" @click.prevent="showPrice(car)" :disabled="checkForPrice(car)"
            :class="{ notAvailable: car.price === '' }">
            {{ priceBtnTxt }}
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            priceBtnTxt: "",
        }
    },
    props: ["cars"],
    emits: ["alertPrice"],
    methods: {
        showPrice(car) {
            this.$emit("alertPrice", car)
        },
        checkForPrice(car) {
            if (car.price === "") {
                this.priceBtnTxt = "Available Soon!";
                return true;
            } else {
                this.priceBtnTxt = "INFO";
                return false;
            }
        }
    }
}
</script>

<style>
.card {
    width: 300px;
    height: auto;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    background-color: #fff;
}

.card:hover {
    background-color: #e8ffdd;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
}

.cardImg {
    width: 300px;
    height: 200px;
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