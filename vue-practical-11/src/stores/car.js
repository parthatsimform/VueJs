import { defineStore } from "pinia";

export const useCarStore = defineStore("car", {
	state: () => ({
		togglePopup: false,
		title: "",
		editableCar: {},
		cars: [],
		car: {
			name: "",
			image: "",
			details: "",
			price: "",
		},
		carID: "",
	}),
	getters: {
		loadAllCars() {
			return this.cars;
		},
		loadCar() {
			return this.car;
		},
	},
	actions: {
		editFormOpen(car) {
			this.togglePopup = true;
			this.title = "Edit Car";
			this.editableCar = car;
		},
		showCarForm() {
			this.togglePopup = true;
			this.title = "Add Car";
		},
	},
});
