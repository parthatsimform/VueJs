<template>
    <div>
        <Transition name="form" mode="out-in">
            <CarDataForm v-if="togglePopup" :title="title" :car="editableCar" @addCarData="newCarData"
                @editCarData="changeCarData" @closeForm="closeForm" />
        </Transition>
        <div id="homeComponent" :class="{ fadeBG: togglePopup }">
            <div id="addCar">
                <button class="addCarBtn" @click.prevent.stop="showCarForm">+ Add Car</button>
            </div>
            <div id="carComponent">
                <TransitionGroup name="carCard" appear>
                    <div v-for="car in cars" :key="car.id">
                        <GalleryCard :car="car" @alertPrice="displayPrice" @carEditForm="editFormOpen"
                            @deleteCar="removeCar" />
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script>
import GalleryCard from '../components/GalleryCard.vue';
import CarDataForm from '../components/CarDataForm.vue';
import Axios from 'axios';
export default {
    name: "Home",
    components: {
        GalleryCard,
        CarDataForm
    },
    data() {
        return {
            togglePopup: false,
            title: "",
            viewForm: false,
            editForm: false,
            editableCar: {},
            cars: [],
        }
    },
    created() {
        this.getCars();
    },
    methods: {
        async getCars() {
            const res = await Axios.get("https://testapi.io/api/dartya/resource/cardata");
            const data = await res.data.data;
            this.cars = data;
        },
        displayPrice(name, price) {
            alert(name + "'s Price is: " + price);
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
        async newCarData(newCar) {
            try {
                const res = await Axios.post("https://testapi.io/api/dartya/resource/cardata", newCar);
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
                        const res = await Axios.put(`https://testapi.io/api/dartya/resource/cardata/${c.id}`, car);
                        if (res.status === 200) {
                            this.getCars();
                        }
                    } catch (e) {
                        alert(e);
                    }
                }
            })
            this.closeForm();
        },
        async removeCar(car) {
            try {
                if (confirm("Are you sure you want to delete " + car.name + "?")) {
                    const res = await Axios.delete(`https://testapi.io/api/dartya/resource/cardata/${car.id}`);
                    if (res.status === 204) {
                        this.getCars();
                    }
                }
            } catch (e) {
                alert(e);
            }
        },
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Roboto:wght@500&display=swap');

body::before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("../assets/background.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.1;
    z-index: -1;
}

/* Car Form transition */
.form-enter-from,
.form-leave-to {
    opacity: 0;
    transform: scale(0.2);
}

.form-enter-active,
.form-leave-active {
    transition: all 0.5s ease;
}

.form-leave-active {
    position: absolute;
}

/* Car Card Transition */
.carCard-enter-from,
.carCard-leave-to {
    opacity: 0;
    transform: translateX(-200px) scale(0.2);
}

.carCard-enter-active,
.carCard-leave-active {
    transition: all 0.6s ease-in;
}

.carCard-leave-active {
    position: absolute;
}

.carCard-move {
    transition: all 0.3s ease;
}

#homeComponent {
    padding: 10px 8%;
}

#addCar {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    max-width: 1600px;
    margin: 0 auto 10px;
}

.addCarBtn {
    padding: 7px 20px;
    background-color: #e8ffdd;
    color: green;
    border: 1px solid green;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
}

.addCarBtn:hover {
    color: #e8ffdd;
    background-color: green;
}

#carComponent {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 1%;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
}

.fadeBG {
    filter: contrast(40%);
    pointer-events: none;
}

@media (max-width:1350px) {
    #carComponent {
        grid-template-columns: auto auto auto;
    }
}

@media (max-width:1050px) {
    #carComponent {
        grid-template-columns: auto auto;
    }
}

@media(max-width:570px) {
    #carComponent {
        grid-template-columns: auto;
    }
}
</style>