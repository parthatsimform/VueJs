import { ref, computed } from "vue";
import { defineStore } from "pinia";
import Axios from "axios";

export const useCarStore = defineStore("car", {
	state: () => ({
		togglePopup: false,
		title: "",
		viewForm: false,
		editForm: false,
		editableCar: {},
		cars: [],
		car: {},
	}),
	actions: {
		async getCars() {
			const res = await Axios.get(
				"https://testapi.io/api/dartya/resource/cardata"
			);
			const data = await res.data.data;
			this.cars = data;
		},
		async newCarData(newCar) {
			try {
				const res = await Axios.post(
					"https://testapi.io/api/dartya/resource/cardata",
					newCar
				);
				if (res.status === 201) {
					this.getCars();
				}
			} catch (e) {
				alert(e);
			}
			this.closeForm();
		},
		changeCarData(car) {
			this.cars.forEach(async (c) => {
				if (c.id === car.id) {
					try {
						const res = await Axios.put(
							`https://testapi.io/api/dartya/resource/cardata/${c.id}`,
							car
						);
						if (res.status === 200) {
							this.getCars();
						}
					} catch (e) {
						alert(e);
					}
				}
			});
			this.closeForm();
		},
		async removeCar(car) {
			try {
				if (
					confirm("Are you sure you want to delete " + car.name + "?")
				) {
					const res = await Axios.delete(
						`https://testapi.io/api/dartya/resource/cardata/${car.id}`
					);
					if (res.status === 204) {
						this.getCars();
					}
				}
			} catch (e) {
				alert(e);
			}
		},
		async getCar(id) {
			try {
				const res = await Axios.get(
					`https://testapi.io/api/dartya/resource/cardata/${id}`
				);
				const data = await res.data;
				this.car = data;
			} catch (err) {
				alert(err);
			}
		},
		closeForm() {
			this.viewForm = false;
			this.editForm = false;
			this.togglePopup = false;
		},
		editFormOpen(car) {
			this.editForm = true;
			this.togglePopup = true;
			this.title = "Edit Car";
			this.editableCar = car;
		},
		showCarForm() {
			this.viewForm = true;
			this.togglePopup = true;
			this.title = "Add Car";
		},
	},
});
