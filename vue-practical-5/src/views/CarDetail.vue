<template>
    <div class="backBtn">
        <RouterLink :to="{ name: 'home' }"><i class="fa-solid fa-caret-left"></i> Back</RouterLink>
    </div>
    <div class="carDetail">
        <div class="carImg">
            <img :src="car.image" :alt="car.name" />
        </div>
        <div class="carInfo">
            <div class="carName">
                <h2>{{ car.name }}</h2>
            </div>
            <div class="carDesc">
                <p>{{ car.details }}</p>
            </div>
            <div class="carPrice">
                <p>Price:&nbsp;<span>₹{{ car.price }}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    name: "CarDetail",
    data() {
        return {
            car: {}
        }
    },
    async created() {
        try {
            const res = await Axios.get(`https://testapi.io/api/dartya/resource/cardata/${this.$route.params.id}`)
            const data = await res.data;
            this.car = data;
        } catch (err) {
            alert(err)
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: black;
}

.backBtn {
    margin: 10px 9%;
    color: black;
}

.carDetail {
    display: flex;
    background-color: white;
    width: 90%;
    max-width: 1400px;
    margin: 20px auto;
    border-radius: 10px;
}

.carImg img {
    width: 90%;
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

.carInfo {
    padding: 5px;
}

.carName {
    font-size: 2rem;
    color: rgb(7, 15, 56);
}

.carDesc {
    font-size: 1rem;
}

.carPrice p {
    display: inline-flex;
    background-color: rgb(170, 255, 100);
    padding: 10px 15px;
    border-radius: 50px;
}

@media(max-width: 420px) {
    .carDetail {
        background: none;
    }

    .carImg img {
        width: 100%;
        height: 100%;
        border: 0px;
    }
}

@media(max-width:720px) {
    .carDetail {
        flex-direction: column;
    }

    .carImg {
        width: 100%;
    }

    .carImg img {
        width: 100%;
        height: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom-left-radius: 0;
    }

    .carInfo {
        padding: 0 15px;
    }
}
</style>