import { defineStore } from "pinia";
import Axios from "axios";
import useFetchCars from "~/composables/useFetchCars";

export const useCarStore = defineStore("car", {
	state: () => ({
		togglePopup: false,
		title: "",
		editableCar: {},
		cars: [],
		car: {},
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
		async getCars() {
			const data = await useFetchCars();
			this.cars = await data.data.value;
		},
		async getCar() {
			try {
				if (process.client) {
					const res = await Axios.get(
						`${import.meta.env.VITE_CAR_URL}/${this.carID}`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}
					);
					console.log(res);
					const data = await res.data;
					this.car = data;
				}
			} catch (err) {
				alert(err);
			}
		},
		async newCarData(newCar) {
			try {
				if (process.client) {
					const res = await Axios.post(
						import.meta.env.VITE_CAR_URL,
						newCar,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}
					);
					if (res.status === 201) {
						this.getCars();
					}
				}
			} catch (e) {
				alert(e);
			}
			this.togglePopup = false;
		},
		async changeCarData(car) {
			try {
				if (process.client) {
					const res = await Axios.put(
						`${import.meta.env.VITE_CAR_URL}/${car.id}`,
						car,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}
					);
					if (res.status === 200) {
						this.getCars();
					}
				}
			} catch (e) {
				alert(e);
			}
			this.togglePopup = false;
		},
		async removeCar(car) {
			try {
				if (
					confirm("Are you sure you want to delete " + car.name + "?")
				) {
					if (process.client) {
						const res = await Axios.delete(
							`${import.meta.env.VITE_CAR_URL}/${car.id}`,
							{
								headers: {
									Authorization: `Bearer ${localStorage.getItem(
										"token"
									)}`,
								},
							}
						);
						if (res.status === 204) {
							this.getCars();
						}
					}
				}
			} catch (e) {
				alert(e);
			}
		},
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
