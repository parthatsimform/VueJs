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
            <input type="text" id="name" v-model="name" @input="validateName" ref="nameInput">
            <div class="nameError"></div>
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" @input="validateEmail" ref="emailInput" />
            <div class="emailError"></div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" @input="validatePassword" ref="passwordInput" />
            <div class="passwordError"></div>
            <label for="cPassword">Confirm Password:</label>
            <input type="password" id="cPassword" v-model="cPassword" @input="validateCPassword" ref="cPasswordInput" />
            <div class="cPasswordError"></div>
            <label for="role">Role:</label>
            <select name="role" id="role" v-model="role" @change="validateRole" ref="roleInput">
                <option value="" selected disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="customer">Customer</option>
            </select>
            <div class="roleError"></div>
            <div class="genderSelect">
                <label for="gender">Gender:</label>
                <span class="maleRadio">
                    <input type="radio" id="male" value="Male" v-model="gender" @change="validateGender"
                        ref="genderInput" />
                    <label for="male">Male</label>
                </span>
                <span class="femaleRadio">
                    <input type="radio" id="female" value="Female" v-model="gender" @change="validateGender"
                        ref="genderInput" />
                    <label for="female">Female</label>
                </span>
                <div class="genderError"></div>
            </div>
            <label for="age">Age:</label>
            <input id="age" v-model="age" @input="validateAge" ref="ageInput" />
            <div class="ageError"></div>
            <label for="dob">DOB:</label>
            <input type="date" id="dob" v-model="dob" @change="validateDOB" ref="dobInput" />
            <div class="dobError"></div>
            <button type="submit" class="submitForm">Register</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            cPassword: "",
            role: "",
            gender: "",
            age: "",
            dob: "",
        }
    },
    methods: {
        showError(ref, errDiv, err) {
            ref.focus();
            ref.style.border = "1px solid red";
            document.getElementsByClassName(errDiv)[0].innerHTML = err;
        },
        removeError(ref, errDiv) {
            ref.style.border = "1px solid rgb(192, 192, 192)";
            document.getElementsByClassName(errDiv)[0].innerHTML = "";
        },
        validateName() {
            if (this.name === "") {
                this.showError(this.$refs.nameInput, 'nameError', "*User name is required")
                return false;
            } else {
                this.removeError(this.$refs.nameInput, 'nameError');
                return true;
            }
        },
        validateEmail() {
            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
            if (emailRegex.test(this.email)) {
                this.removeError(this.$refs.emailInput, 'emailError');
                return true;
            } else {
                this.showError(this.$refs.emailInput, 'emailError', "*Valid Email ID is required")
                return false;
            }
        },
        validatePassword() {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/
            if (passwordRegex.test(this.password)) {
                this.removeError(this.$refs.passwordInput, 'passwordError');
                return true;

            } else {
                this.showError(this.$refs.passwordInput, 'passwordError', "*Password of length 8-12 is required and must contain at least one numeric digit and a special character")
                return false;
            }
        },
        validateCPassword() {
            if (this.cPassword !== this.password) {
                this.showError(this.$refs.cPasswordInput, 'cPasswordError', "*Confirm password doesn't match with password")
                return false;
            } else {
                this.removeError(this.$refs.cPasswordInput, 'cPasswordError');
                return true;
            }
        },
        validateRole() {
            if (this.role === "") {
                this.showError(this.$refs.roleInput, 'roleError', "*Please select a role")
                return false;
            } else {
                this.removeError(this.$refs.roleInput, 'roleError');
                return true;
            }
        },
        validateGender() {
            if (this.gender === "") {
                this.showError(this.$refs.genderInput, 'genderError', "*Please select a gender")
                return false;
            } else {
                this.removeError(this.$refs.genderInput, 'genderError');
                return true;
            }
        },
        validateAge() {
            if (this.age !== "" && Number.isInteger(Number(this.age))) {
                this.removeError(this.$refs.ageInput, 'ageError');
                return true;
            } else {
                this.showError(this.$refs.ageInput, 'ageError', "*Age must be in integer required");
                return false;
            }
        },
        validateDOB() {
            if (this.dob === "") {
                this.showError(this.$refs.dobInput, 'dobError', "*Please select your DOB")
                return false;
            } else {
                this.removeError(this.$refs.dobInput, 'dobError');
                return true;
            }
        },
        validateForm() {
            if (this.validateName() && this.validateEmail() && this.validatePassword() && this.validateCPassword() && this.validateRole() && this.validateGender() && this.validateAge() && this.validateDOB()) {
                return true;
            } else {
                return false;
            }
        },
        async registerUser() {
            if (this.validateForm()) {
                // console.log("validated");
                const newUser = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: this.role,
                    gender: this.gender,
                    age: this.age,
                    dob: this.dob
                }
                try {
                    const res = await Axios.post("https://testapi.io/api/dartya/resource/users", newUser);
                    if (res.status === 201) {
                        console.log("Yesss");
                        this.$router.push({ name: "home" })
                    }
                } catch (err) {
                    alert(err)
                }
            }
        },
    },
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