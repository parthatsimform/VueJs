<template>
    <div class="addCarPopup">
        <div class="formHeader">
            <div class="formTitle">
                <h2>Add Car</h2>
            </div>
            <div class="closePopup" @click="this.$parent.viewForm = false">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>

        <hr />
        <form class="carForm" @submit.prevent="addCarData">
            <label for="carName">Car Name:</label>
            <input type="text" id="carName" v-model="name" />
            <label for="carImage">Car Image:</label>
            <input type="text" id="carImage" v-model="image" />
            <label for="carDesc">Description:</label>
            <textarea id="carDesc" cols="30" rows="4" v-model="desc" />
            <label for="carPrice">Car Price(₹):</label>
            <input type="number" id="carPrice" v-model="price" />
            <button type="submit" id="submitForm">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "CarForm",
    emits: ["addCarData"],
    data() {
        return {
            id: "",
            name: "",
            image: "",
            desc: "",
            price: "",
        }
    },
    methods: {
        addCarData() {
            const car = {
                id: this.id,
                name: this.name,
                image: this.image,
                desc: this.desc,
                price: this.price,
            }
            this.$emit("addCarData", car)
            this.$parent.viewForm = false;
        },
    }
}
</script>

<style>
.addCarPopup {
    background-color: white;
    border: none;
    border-radius: 10px;
    position: fixed;
    width: 100%;
    max-width: 500px;
    top: 25%;
    left: 37%;
    padding: 20px 30px;
}

.formHeader {
    display: flex;
}

.closePopup {
    cursor: pointer;
}

.formTitle {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
    color: #184b00;
}

hr {
    border: 1px solid rgb(221, 221, 221);
}

.carForm {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 20px;
}

input,
textarea {
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(192, 192, 192);
    height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 5px 0 10px;
}

textarea {
    padding: 7px;
    height: 82px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

input:focus,
textarea:focus {
    border: 2px solid rgb(166, 196, 55);
}

#submitForm {
    background-color: #e8ffdd;
    border: 1px solid green;
    color: green;
    border-radius: 5px;
    outline: none;
    width: 100px;
    padding: 10px;
    margin: 10px auto;
    font-size: 16px;
    cursor: pointer;
}

#submitForm:hover {
    background-color: green;
    color: #e8ffdd;
}
</style>