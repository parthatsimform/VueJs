<template>
    <div class="editCarPopup">
        <div class="formHeader">
            <div class="formTitle">
                <h2>Edit Details</h2>
            </div>
            <div class="closePopup" @click="this.$parent.editForm = false">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <hr />
        <form class="carForm" @submit.prevent="editCarData">
            <label for="carName">Car Name:</label>
            <input type="text" id="carName" v-model="name" />
            <label for="carImage">Car Image:</label>
            <input type="url" id="carImage" v-model="image" />
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
    name: "EditForm",
    props: ["car"],
    emits: ['editCarData'],
    data() {
        return {
            id: this.car.id,
            name: this.car.name,
            image: this.car.image,
            desc: this.car.desc,
            price: this.car.price,
        }
    },
    methods: {
        editCarData() {
            const car = {
                id: this.id,
                name: this.name,
                image: this.image,
                desc: this.desc,
                price: this.price,
            }
            this.$emit("editCarData", car)
            this.$parent.editForm = false;
        }
    }
}
</script>

<style>
.editCarPopup {
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