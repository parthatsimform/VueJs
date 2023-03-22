<template>
    <div class="login">
        <div class="formHeader">
            <h2 class="formTitle">
                Login
            </h2>
        </div>
        <hr />
        <form class="loginForm" @submit.prevent="loginUser">
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="email" @input="validateEmail" ref="emailInput" />
            <div class="emailError"></div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" @input="validatePassword" ref="passwordInput" />
            <div class="passwordError"></div>
            <button type="submit" class="submitForm">Login</button>
        </form>
    </div>
</template>

<script>
import Axios from 'axios';

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
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
        async loginUser() {
            if (this.validateEmail() && this.validatePassword()) {
                // let allUsers;
                // try {
                //     const res = await Axios.get("https://testapi.io/api/dartya/resource/users");
                //     const data = await res.data.data;
                //     allUsers = data;
                //     let user = allUsers.find(u => u.email == this.email && u.password == this.password)

                //     if (user) {
                //         this.$router.push({ name: "home" })
                //     } else {
                //         alert("User not found")
                //     }
                // } catch (err) {
                //     alert(err)
                // }

                let user = {
                    email: this.email,
                    password: this.password
                }
                try {
                    const res = await Axios.post("https://testapi.io/api/dartya/resource/users", user);
                    console.log(res);
                } catch (err) {
                    alert(err)
                }
            }
        }
    }
}
</script>

<style scoped>
.login {
    background-color: white;
    border: none;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    margin: 10% auto;
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

.loginForm {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 20px;
}

input {
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(192, 192, 192);
    height: 36px;
    font-size: 18px;
    padding: 0 10px;
    margin: 5px 0 10px;
}

.emailError,
.passwordError {
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
    .login {
        border: initial;
        border-radius: initial;
        width: 95%;
        max-width: initial;
        margin: 50% 0;
        padding: 0 10px;
    }
}
</style>