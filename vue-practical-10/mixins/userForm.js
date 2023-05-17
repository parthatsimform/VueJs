import { useUserStore } from "../stores/user";
export default {
	// data() {
	// 	return {
	// 		nameInput: null,
	// 		emailInput: null,
	// 		passwordInput: null,
	// 		cPasswordInput: null,
	// 		roleInput: null,
	// 		genderInput: null,
	// 		ageInput: null,
	// 		dobInput: null,
	// 	};
	// },
	methods: {
		validateName() {
			const userStore = useUserStore();
			if (userStore.user.name === "") {
				useShowError(
					this.$refs.nameInput,
					"nameError",
					"User name is required"
				);
				return false;
			} else {
				useRemoveError(this.$refs.nameInput, "nameError");
				return true;
			}
		},
		validateEmail() {
			const userStore = useUserStore();
			const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
			if (emailRegex.test(userStore.user.email)) {
				useRemoveError(this.$refs.emailInput, "emailError");
				return true;
			} else {
				useShowError(
					this.$refs.emailInput,
					"emailError",
					"Valid Email ID is required"
				);
				return false;
			}
		},
		validatePassword() {
			const userStore = useUserStore();
			const passwordRegex =
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
			if (passwordRegex.test(userStore.user.password)) {
				useRemoveError(this.$refs.passwordInput, "passwordError");
				return true;
			} else {
				useShowError(
					this.$refs.passwordInput,
					"passwordError",
					"Password of length 8-12 is required and must contain at least one numeric digit and a special character"
				);
				return false;
			}
		},
		validateCPassword() {
			const userStore = useUserStore();
			if (
				userStore.user.cPassword == "" ||
				userStore.user.cPassword !== userStore.user.password
			) {
				useShowError(
					this.$refs.cPasswordInput,
					"cPasswordError",
					"Confirm password doesn't match with password"
				);
				return false;
			} else {
				useRemoveError(this.$refs.cPasswordInput, "cPasswordError");
				return true;
			}
		},
		validateRole() {
			const userStore = useUserStore();
			if (userStore.user.role === "") {
				useShowError(
					this.$refs.roleInput,
					"roleError",
					"Please select a role"
				);
				return false;
			} else {
				useRemoveError(this.$refs.roleInput, "roleError");
				return true;
			}
		},
		validateGender() {
			const userStore = useUserStore();
			if (userStore.user.gender === "") {
				useShowError(
					this.$refs.genderInput,
					"genderError",
					"Please select a gender"
				);
				return false;
			} else {
				useRemoveError(this.$refs.genderInput, "genderError");
				return true;
			}
		},
		validateAge() {
			const userStore = useUserStore();
			if (
				userStore.user.age !== "" &&
				Number.isInteger(Number(userStore.user.age))
			) {
				useRemoveError(this.$refs.ageInput, "ageError");
				return true;
			} else {
				useShowError(
					this.$refs.ageInput,
					"ageError",
					"Age must be in integer required"
				);
				return false;
			}
		},
		validateDOB() {
			const userStore = useUserStore();
			if (userStore.user.dob === "") {
				useShowError(
					this.$refs.dobInput,
					"dobError",
					"Please select your DOB"
				);
				return false;
			} else {
				useRemoveError(this.$refs.dobInput, "dobError");
				return true;
			}
		},
	},
};
