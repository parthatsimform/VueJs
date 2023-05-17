<template>
    <div class="register">
        <div class="formHeader">
            <h2 class="formTitle">
                Register
            </h2>
        </div>
        <hr />
        <form class="registerForm" @submit.prevent="registerUser">
            <label for="name">Name*</label>
            <input type="text" id="name" v-model="userStore.user.name" @input="validateName" ref="nameInput">
            <div class="nameError"></div>
            <label for="email">Email*</label>
            <input type="text" id="email" v-model="userStore.user.email" @input="validateEmail" ref="emailInput" />
            <div class="emailError"></div>
            <label for="password">Password*</label>
            <input type="password" id="password" v-model="userStore.user.password" @input="validatePassword"
                ref="passwordInput" />
            <div class="passwordError"></div>
            <label for="cPassword">Confirm Password*</label>
            <input type="password" id="cPassword" v-model="userStore.user.cPassword" @input="validateCPassword"
                ref="cPasswordInput" />
            <div class="cPasswordError"></div>
            <label for="role">Role*</label>
            <select name="role" id="role" v-model="userStore.user.role" @change="validateRole" ref="roleInput">
                <option value="" selected disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
            </select>
            <div class="roleError"></div>
            <div class="genderSelect">
                <label for="gender">Gender*</label>
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
            <label for="age">Age*</label>
            <input id="age" v-model="userStore.user.age" @input="validateAge" ref="ageInput" />
            <div class="ageError"></div>
            <label for="dob">DOB*</label>
            <input type="date" id="dob" v-model="userStore.user.dob" @change="validateDOB" ref="dobInput" />
            <div class="dobError"></div>
            <button type="submit" class="submitForm">Register</button>
        </form>
    </div>
</template>

<script>
import { useUserStore } from '../stores/user'
import { mapState, mapActions } from 'pinia';
import userFormMixin from '../mixins/userForm'
export default {
    mixins: [userFormMixin],
    computed: {
        ...mapState(useUserStore, ['user'])
    },
    methods: {
        ...mapActions(useUserStore, ['signupUser']),
        validateForm() {
            if (this.validateName() && this.validateEmail() && this.validatePassword() && this.validateCPassword() && this.validateRole() && this.validateGender() && this.validateAge() && this.validateDOB()) {
                return true;
            } else {
                return false;
            }
        },
        registerUser() {
            if (this.validateForm()) {
                const newUser = {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    role: this.user.role,
                    gender: this.user.gender,
                    age: this.user.age,
                    dob: this.user.dob
                }
                this.signupUser(newUser);
            } else {
                this.validateName()
                this.validateEmail()
                this.validatePassword()
                this.validateCPassword()
                this.validateRole()
                this.validateGender()
                this.validateAge()
                this.validateDOB()
            }
        }
    }
}
</script>

<script setup>
import { useUserStore } from '../stores/user'
import userFormMixin from '../mixins/userForm'

const userStore = useUserStore()

onBeforeRouteLeave((to, from) => {
    if (to.name == "login") {
        userStore.user.name = ''
        userStore.user.email = ''
        userStore.user.password = ''
        userStore.user.cPassword = ''
        userStore.user.role = ''
        userStore.user.gender = ''
        userStore.user.age = ''
        userStore.user.dob = ''
    }
})

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