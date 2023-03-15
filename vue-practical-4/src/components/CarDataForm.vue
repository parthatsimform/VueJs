<template>
    <div class="carPopup">
        <div class="formHeader">
            <div class="formTitle">
                <h2>{{ title }}</h2>
            </div>
            <!-- <div class="closePopup" @click="this.$parent.viewForm = false; this.$parent.editForm = false">
                <i class="fa-solid fa-xmark"></i>
            </div> -->
            <div class="closePopup" @click="closePopup">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>

        <hr />
        <form class="carForm" @submit.prevent="addOrEditCarData">
            <label for="carName">Car Name:</label>
            <input id="carName" v-model="name" @input="validateName" ref="nameInput" />
            <div class="nameError"></div>
            <label for="carImage">Car Image:</label>
            <input id="carImage" v-model="image" @input="validateImage" ref="imageInput" />
            <div class="imageError"></div>
            <label for="cardetails">detailsription:</label>
            <textarea id="cardetails" cols="30" rows="4" v-model="details" @change="validatedetails" ref="detailsInput" />
            <div class="detailsError"></div>
            <label for="carPrice">Car Price(₹):</label>
            <input id="carPrice" v-model="price" @input="validatePrice" ref="priceInput" />
            <div class="priceError"></div>
            <button type="submit" id="submitForm">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "CarDataForm",
    props: ["car", "title"],
    emits: ["addCarData", "editCarData"],
    data() {
        if (this.$parent.viewForm) {
            return {
                name: "",
                image: "",
                details: "",
                price: "",
            }
        } else if (this.$parent.editForm) {
            return {
                id: this.car.id,
                name: this.car.name,
                image: this.car.image,
                details: this.car.details,
                price: this.car.price,
            }
        }
    },
    methods: {
        urlChacker() {
            const urlPattern = /^((https?:)?\/\/)?[^\s]+\.(jpe?g|png|gif|bmp|webp)(\?\S*)?$/i;
            return urlPattern.test(this.image);
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
            this.$parent.viewForm = false;
            this.$parent.editForm = false;
            this.$parent.togglePopup = false;
        },
        validateName() {
            if (this.name === "") {
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
            if (this.details === "" || this.details.length < 30 || this.details.length > 120) {
                this.showError(this.$refs.detailsInput, 'detailsError', "*Car detailsription in limit of 30 to 120 characters is required");
                return false;
            } else {
                this.removeError(this.$refs.detailsInput, 'detailsError');
                return true;
            }
        },
        validatePrice() {
            if (this.price === "" || Number.isInteger(Number(this.price))) {
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
                    name: this.name,
                    image: this.image,
                    details: this.details,
                    price: this.price,
                }
                this.$parent.togglePopup = false;
                if (this.$parent.viewForm) {
                    this.$emit("addCarData", car)
                    this.$parent.viewForm = false;
                }
                if (this.$parent.editForm) {
                    car.id = this.id;
                    this.$emit("editCarData", car)
                    this.$parent.editForm = false;
                }

            }
        },
    }
}
</script>

<style scoped>
.carPopup {
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