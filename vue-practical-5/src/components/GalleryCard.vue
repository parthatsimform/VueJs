<template>
    <div class="card">
        <div class="cardTitle">
            <h2>{{ car.name }}</h2>
        </div>
        <div class="cardImgDiv">
            <img :src="car.image" :alt="car.name" class="cardImg">
        </div>
        <div class="cardDsc">
            <p>{{ car.details }}</p>
        </div>
        <div class="manipulateData">
            <div class="editBtnDiv">
                <button class="editBtn" @click.prevent.stop="editCar(car)"><i class="fa-solid fa-pen-to-square"></i>
                    Edit</button>
            </div>
            <div class="deleteBtnDiv">
                <button class="deleteBtn" @click.prevent.stop="deleteCar(car)"><i class="fa-solid fa-trash-can"></i>
                    Delete</button>
            </div>
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
    name: "GalleryCard",
    data() {
        return {
            isEdit: false,
            editableCar: {},
        }
    },
    props: ["car"],
    emits: ["alertPrice", "editableCar", "isEdit", "deleteCar"],
    methods: {
        showPrice(name, price) {
            if (!this.$parent.viewForm && !this.$parent.editForm) {
                this.$emit("alertPrice", name, price)
            }
        },
        checkForPrice(price) {
            if (price) {
                return "INFO";
            } else {
                return "Available Soon!";
            }
        },
        editCar(car) {
            this.$parent.togglePopup = true;
            this.$parent.title = "Edit Car";
            this.isEdit = true;
            this.editableCar = car;
            this.$emit("editableCar", this.editableCar);
            this.$emit("isEdit", this.isEdit)
        },
        deleteCar(car) {
            if (!this.$parent.viewForm && !this.$parent.editForm) {
                this.$emit("deleteCar", car);
            }
        }
    },
}
</script>

<style scoped>
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
    height: 75px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 2px;
    text-overflow: ellipsis;
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
    align-items: center;
}

.priceBtn {
    border: 1px solid green;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 7px 30px;
    width: 100%;
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
    background-color: #ebffd8;
    color: black;
    cursor: not-allowed;
}

.notAvailable:hover {
    color: black;
    background-color: #ebffd8;
}

.manipulateData {
    display: flex;
    margin: 0 0 10px;
    justify-content: space-between;
}

.editBtnDiv,
.deleteBtnDiv {
    width: 50%;
}

.editBtn,
.deleteBtn {
    width: 90%;
    padding-top: 5px;
    padding-bottom: 5px;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}

.editBtn {
    background-color: orange;
}

.deleteBtn {
    background-color: red;
}

.editBtn:hover,
.deleteBtn:hover {
    filter: drop-shadow(0 0 0.1rem crimson);
}
</style>