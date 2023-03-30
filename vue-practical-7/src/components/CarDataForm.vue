<template>
    <div class="carPopup">
        <div class="carData">
            <div class="formHeader">
                <div class="formTitle">
                    <h2>{{ title }}</h2>
                </div>
                <div class="closePopup" @click="closePopup">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>

            <hr />
            <form class="carForm" @submit.prevent="addOrEditCarData">
                <label for="carName">Car Name:</label>
                <input id="carName" v-model="formData.name" @input="validateName" ref="nameInput" />
                <div class="nameError"></div>
                <label for="carImage">Car Image:</label>
                <input id="carImage" v-model="formData.image" @input="validateImage" ref="imageInput" />
                <div class="imageError"></div>
                <label for="cardetails">Details:</label>
                <textarea id="cardetails" cols="30" rows="4" v-model="formData.details" @change="validatedetails"
                    ref="detailsInput" />
                <div class="detailsError"></div>
                <label for="carPrice">Car Price(₹):</label>
                <input id="carPrice" v-model="formData.price" @input="validatePrice" ref="priceInput" />
                <div class="priceError"></div>
                <button type="submit" id="submitForm">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import { useCarStore } from '../stores/car'
export default {
    name: "CarDataForm",
    computed: {
        ...mapState(useCarStore, ['title']),
        ...mapWritableState(useCarStore, ['editableCar', 'togglePopup']),
        formData() {
            if (this.title == "Edit Car") {
                return {
                    id: this.editableCar.id,
                    name: this.editableCar.name,
                    image: this.editableCar.image,
                    details: this.editableCar.details,
                    price: this.editableCar.price,
                }
            } else {
                return {
                    name: "",
                    image: "",
                    details: "",
                    price: "",
                }
            }
        },
    },
    methods: {
        ...mapActions(useCarStore, ['newCarData', 'changeCarData']),
        urlChacker() {
            const urlPattern = /^((https?:)?\/\/)?[^\s]+\.(jpe?g|png|gif|bmp|webp)(\?\S*)?$/i;
            return urlPattern.test(this.formData.image);
        },
        showError(ref, errDiv, err) {
            ref.focus();
            ref.style.border = "1px solid red";
            document.getElementsByClassName(errDiv)[0].innerHTML = err;
        },
        removeError(ref, errDiv) {
            ref.style.border = "1px solid rgb(192, 192, 192)";
            document.getElementsByClassName(errDiv)[0].innerHTML = "";
        },
        closePopup() {
            this.togglePopup = false;
        },
        validateName() {
            if (this.formData.name === "") {
                this.showError(this.$refs.nameInput, 'nameError', "*Car name is required")
                return false;
            } else {
                this.removeError(this.$refs.nameInput, 'nameError');
                return true;
            }
        },
        validateImage() {
            if (!this.urlChacker()) {
                this.showError(this.$refs.imageInput, 'imageError', "*Please enter a valid image URL");
                return false;
            } else {
                this.removeError(this.$refs.imageInput, 'imageError');
                return true;
            }
        },
        validatedetails() {
            if (this.formData.details === "" || this.formData.details.length < 30 || this.formData.details.length > 120) {
                this.showError(this.$refs.detailsInput, 'detailsError', "*Car detail in limit of 30 to 120 characters is required");
                return false;
            } else {
                this.removeError(this.$refs.detailsInput, 'detailsError');
                return true;
            }
        },
        validatePrice() {
            if (this.formData.price !== "" && Number.isInteger(Number(this.formData.price))) {
                this.removeError(this.$refs.priceInput, 'priceError');
                return true;
            } else {
                this.showError(this.$refs.priceInput, 'priceError', "*Car Price in integer is required");
                return false;
            }
        },
        addOrEditCarData() {
            if (this.validateName() && this.validateImage() && this.validatedetails() && this.validatePrice()) {
                const car = {
                    name: this.formData.name,
                    image: this.formData.image,
                    details: this.formData.details,
                    price: this.formData.price,
                }
                if (this.title == "Add Car") {
                    this.newCarData(car);
                }
                if (this.title == "Edit Car") {
                    car.id = this.formData.id;
                    this.changeCarData(car);
                }
            }
        },
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
    height: 600px;
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