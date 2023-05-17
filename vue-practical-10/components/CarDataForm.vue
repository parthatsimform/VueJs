<template>
    <div class="carPopup">
        <div class="carData">
            <div class="formHeader">
                <div class="formTitle">
                    <h2>{{ carStore.title }}</h2>
                </div>
                <div class="closePopup" @click="closePopup">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </div>
            </div>

            <hr />
            <form class="carForm" @submit.prevent="addOrEditCarData">
                <label for="carName">Car Name*</label>
                <input id="carName" v-model="formData.name" @input="validateName" ref="nameInput" />
                <div class="nameError"></div>
                <label for="carImage">Car Image*</label>
                <input id="carImage" v-model="formData.image" @input="validateImage" ref="imageInput" />
                <div class="imageError"></div>
                <label for="cardetails">Details*</label>
                <textarea id="cardetails" cols="30" rows="4" v-model="formData.details" @change="validatedetails"
                    ref="detailsInput" />
                <div class="detailsError"></div>
                <label for="carPrice">Car Price(₹)*</label>
                <input id="carPrice" v-model="formData.price" @input="validatePrice" ref="priceInput" />
                <div class="priceError"></div>
                <button type="submit" id="submitForm">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useCarStore } from '../stores/car'
const carStore = useCarStore()
let nameInput = ref(null)
let imageInput = ref(null)
let detailsInput = ref(null)
let priceInput = ref(null)

const formData = reactive({
    id: null,
    name: '',
    image: '',
    details: '',
    price: ''
})

if (carStore.title == "Edit Car") {
    formData.id = carStore.editableCar.id
    formData.name = carStore.editableCar.name
    formData.image = carStore.editableCar.image
    formData.details = carStore.editableCar.details
    formData.price = carStore.editableCar.price
}

const urlChacker = () => {
    const urlPattern = /^((https?:)?\/\/)?[^\s]+\.(jpe?g|png|gif|bmp|webp)(\?\S*)?$/i;
    return urlPattern.test(formData.image);
}

const showError = (ref, errDiv, err) => {
    ref.value.focus();
    ref.value.style.border = "1px solid red";
    document.getElementsByClassName(errDiv)[0].innerHTML = err;
}

const removeError = (ref, errDiv) => {
    ref.value.style.border = "1px solid rgb(192, 192, 192)";
    document.getElementsByClassName(errDiv)[0].innerHTML = "";
}

const closePopup = () => {
    carStore.togglePopup = false;
}

const validateName = () => {
    if (formData.name === "") {
        showError(nameInput, 'nameError', "Car name is required")
        return false;
    } else {
        removeError(nameInput, 'nameError');
        return true;
    }
}

const validateImage = () => {
    if (!urlChacker()) {
        showError(imageInput, 'imageError', "Please enter a valid image URL");
        return false;
    } else {
        removeError(imageInput, 'imageError');
        return true;
    }
}

const validatedetails = () => {
    if (formData.details === "" || formData.details.length < 30 || formData.details.length > 120) {
        showError(detailsInput, 'detailsError', "Car detail in limit of 30 to 120 characters is required");
        return false;
    } else {
        removeError(detailsInput, 'detailsError');
        return true;
    }
}

const validatePrice = () => {
    if (formData.price !== "" && Number.isInteger(Number(formData.price))) {
        removeError(priceInput, 'priceError');
        return true;
    } else {
        showError(priceInput, 'priceError', "Car Price in integer is required");
        return false;
    }
}

const addOrEditCarData = () => {
    if (validateName() && validateImage() && validatedetails() && validatePrice()) {
        const car = {
            name: formData.name,
            image: formData.image,
            details: formData.details,
            price: formData.price,
        }
        if (carStore.title == "Add Car") {
            carStore.newCarData(car);
        }
        if (carStore.title == "Edit Car") {
            car.id = formData.id;
            carStore.changeCarData(car);
        }
    } else {
        validateName()
        validateImage()
        validatedetails()
        validatePrice()
    }
}
</script>

<style scoped>
.carPopup {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.carData {
    background-color: white;
    border: 1px solid green;
    border-radius: 10px;
    width: 85%;
    max-width: 500px;
    min-height: 600px;
    padding: 20px 30px;
}

.formHeader {
    display: flex;
}

.closePopup {
    cursor: pointer;
    width: 1em;
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

/* remove aerrow from number input field */
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

.nameError,
.imageError,
.detailsError,
.priceError {
    color: red;
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

::placeholder {
    color: red;
}
</style>