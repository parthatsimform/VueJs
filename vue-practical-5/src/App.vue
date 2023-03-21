<template>
  <NavBar />
  <div id="homeComponent" :class="{ fadeBG: togglePopup }" @click.prevent="hideForm">
    <div id="addCar">
      <button class="addCarBtn" @click.prevent.stop="showCarForm">Add Car</button>
    </div>
    <div id="carComponent">
      <div v-for="car in cars" :key="car.id">
        <GalleryCard :car="car" @alertPrice="displayPrice" @isEdit="editCarForm" @editableCar="editCarData"
          @deleteCar="removeCar" />
      </div>
    </div>
  </div>
  <CarDataForm v-if="togglePopup" :title="title" @addCarData="newCarData" :car="editableCar"
    @editCarData="changeCarData" />
</template>

<script>
import GalleryCard from './components/GalleryCard.vue';
import CarDataForm from './components/CarDataForm.vue';
import Axios from 'axios';
export default {
  name: "App",
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
    },
    editCarForm() {
      this.editForm = true;
    },
    editCarData(car) {
      this.editableCar = car;
    },
    changeCarData(car) {
      this.cars.filter(async (c) => {
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
    hideForm() {
      this.viewForm = false;
      this.editForm = false;
    },
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Roboto:wght@500&display=swap');

body {
  margin: 0;
  background-color: rgb(240, 240, 240);
}

#homeComponent {
  padding: 10px 8%;
}

#addCar {
  display: flex;
  flex-direction: row-reverse;
  margin: 0 1% 10px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}

.fadeBG {
  filter: contrast(40%);
  pointer-events: none;
}
</style>