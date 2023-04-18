<template>
    <div class="register">
        <div class="formHeader">
            <h2 class="formTitle">
                Register
            </h2>
        </div>
        <hr />
        <form class="registerForm" @submit.prevent="registerUser">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="userStore.user.name" @input="validateName" ref="nameInput">
            <div class="nameError"></div>
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="userStore.user.email" @input="validateEmail" ref="emailInput" />
            <div class="emailError"></div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="userStore.user.password" @input="validatePassword"
                ref="passwordInput" />
            <div class="passwordError"></div>
            <label for="cPassword">Confirm Password:</label>
            <input type="password" id="cPassword" v-model="userStore.user.cPassword" @input="validateCPassword"
                ref="cPasswordInput" />
            <div class="cPasswordError"></div>
            <label for="role">Role:</label>
            <select name="role" id="role" v-model="userStore.user.role" @change="validateRole" ref="roleInput">
                <option value="" selected disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
            </select>
            <div class="roleError"></div>
            <div class="genderSelect">
                <label for="gender">Gender:</label>
                <span class="maleRadio">
                    <input type="radio" id="male" value="Male" v-model="userStore.user.gender" @change="validateGender"
                        ref="genderInput" />
                    <label for="male">Male</label>
                </span>
                <span class="femaleRadio">
                    <input type="radio" id="female" value="Female" v-model="userStore.user.gender" @change="validateGender"
                        ref="genderInput" />
                    <label for="female">Female</label>
                </span>
                <div class="genderError"></div>
            </div>
            <label for="age">Age:</label>
            <input id="age" v-model="userStore.user.age" @input="validateAge" ref="ageInput" />
            <div class="ageError"></div>
            <label for="dob">DOB:</label>
            <input type="date" id="dob" v-model="userStore.user.dob" @change="validateDOB" ref="dobInput" />
            <div class="dobError"></div>
            <button type="submit" class="submitForm">Register</button>
        </form>
    </div>
</template>

<script setup>
import { onBeforeRouteLeave } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

let nameInput = ref(null)
let emailInput = ref(null)
let passwordInput = ref(null)
let cPasswordInput = ref(null)
let roleInput = ref(null)
let genderInput = ref(null)
let ageInput = ref(null)
let dobInput = ref(null)

onBeforeRouteLeave(() => {
    userStore.user.name = ''
    userStore.user.email = ''
    userStore.user.password = ''
    userStore.user.cPassword = ''
    userStore.user.role = ''
    userStore.user.gender = ''
    userStore.user.age = ''
    userStore.user.dob = ''
})

const showError = (ref, errDiv, err) => {
    ref.value.focus();
    ref.value.style.border = "1px solid red";
    document.getElementsByClassName(errDiv)[0].innerHTML = err;
}

const removeError = (ref, errDiv) => {
    ref.value.style.border = "1px solid rgb(192, 192, 192)";
    document.getElementsByClassName(errDiv)[0].innerHTML = "";
}

const validateName = () => {
    if (userStore.user.name === "") {
        showError(nameInput, 'nameError', "*User name is required")
        return false;
    } else {
        removeError(nameInput, 'nameError');
        return true;
    }
}

const validateEmail = () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (emailRegex.test(userStore.user.email)) {
        removeError(emailInput, 'emailError');
        return true;
    } else {
        showError(emailInput, 'emailError', "*Valid Email ID is required")
        return false;
    }
}

const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/
    if (passwordRegex.test(userStore.user.password)) {
        removeError(passwordInput, 'passwordError');
        return true;
    } else {
        showError(passwordInput, 'passwordError', "*Password of length 8-12 is required and must contain at least one numeric digit and a special character")
        return false;
    }
}

const validateCPassword = () => {
    if (userStore.user.cPassword !== userStore.user.password) {
        showError(cPasswordInput, 'cPasswordError', "*Confirm password doesn't match with password")
        return false;
    } else {
        removeError(cPasswordInput, 'cPasswordError');
        return true;
    }
}

const validateRole = () => {
    if (userStore.user.role === "") {
        showError(roleInput, 'roleError', "*Please select a role")
        return false;
    } else {
        removeError(roleInput, 'roleError');
        return true;
    }
}

const validateGender = () => {
    if (userStore.user.gender === "") {
        showError(genderInput, 'genderError', "*Please select a gender")
        return false;
    } else {
        removeError(genderInput, 'genderError');
        return true;
    }
}

const validateAge = () => {
    if (userStore.user.age !== "" && Number.isInteger(Number(userStore.user.age))) {
        removeError(ageInput, 'ageError');
        return true;
    } else {
        showError(ageInput, 'ageError', "*Age must be in integer required");
        return false;
    }
}

const validateDOB = () => {
    if (userStore.user.dob === "") {
        showError(dobInput, 'dobError', "*Please select your DOB")
        return false;
    } else {
        removeError(dobInput, 'dobError');
        return true;
    }
}

const validateForm = () => {
    if (validateName() && validateEmail() && validatePassword() && validateCPassword() && validateRole() && validateGender() && tvalidateAge() && validateDOB()) {
        return true;
    } else {
        return false;
    }
}

const registerUser = () => {
    if (validateForm()) {
        const newUser = {
            name: userStore.user.name,
            email: userStore.user.email,
            password: userStore.user.password,
            role: userStore.user.role,
            gender: userStore.user.gender,
            age: userStore.user.age,
            dob: userStore.user.dob
        }
        userStore.signupUser(newUser);
    }
}
</script>

<style scoped>
.register {
    background-color: white;
    border: 1px solid rgb(0, 90, 90);
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    padding: 20px 30px;
}

.formHeader {
    display: flex;
}

.formTitle {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
    color: rgb(0, 90, 90);
}

hr {
    border: 1px solid rgb(221, 221, 221);
}

.registerForm {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 20px;
}

input,
select {
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(192, 192, 192);
    height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 5px 0 10px;
}

.genderSelect {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.genderSelect label {
    margin: 0;
}

input[type="radio"] {
    width: 20px;
    height: 20px;
    margin-right: 10px;
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
.emailError,
.passwordError,
.cPasswordError,
.roleError,
.genderError,
.ageError,
.dobError {
    color: red;
}

.submitForm {
    background-color: white;
    border: 1px solid rgb(0, 90, 90);
    color: rgb(0, 90, 90);
    border-radius: 5px;
    outline: none;
    width: 100px;
    padding: 10px;
    margin: 10px auto;
    font-size: 16px;
    cursor: pointer;
}

.submitForm:hover {
    background-color: rgb(0, 90, 90);
    color: #e8ffdd;
    transition: all .3s ease;
}

@media(max-width: 460px) {
    .register {
        border: initial;
        border-radius: initial;
        width: 95%;
        max-width: initial;
        margin: 20px 0;
        padding: 0 10px;
    }
}
</style>