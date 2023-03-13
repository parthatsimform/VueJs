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
      cars: [
        {
          id: 1,
          name: "Audi A8",
          image: "https://images.unsplash.com/photo-1597007030739-6d2e7172ee5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          desc: "It is a full-size luxury sedan with advanced technology, refined driving dynamics, and a spacious interior.",
          price: "1340000000"
        },
        {
          id: 2,
          name: "Audi Q7",
          image: "https://images.news18.com/ibnlive/uploads/2021/12/2022-audi-q7-16409483593x2.png?impolicy=website&width=510&height=356",
          desc: "It is a midsize luxury SUV with sleek design, impressive performance, and a spacious and high-tech interior.",
          price: ""
        },
        {
          id: 3,
          name: "Hyundai Creta",
          image: "https://images.news18.com/ibnlive/uploads/2022/12/hyundai-creta-3-16722898703x2.jpg?impolicy=website&width=510&height=356",
          desc: "It is a popular compact SUV with modern styling, fuel-efficient engines, and a feature-packed interior.",
          price: "1500000"
        },
        {
          id: 4,
          name: "Honda City",
          image: "https://www.indiacarnews.com/wp-content/uploads/2023/02/New-2023-Honda-City-Variants.jpg",
          desc: "Compact sedan with practicality, reliability, fuel efficiency, and a comfortable ride quality. It offers a spacious and safe interior.",
          price: "1200000"
        },
        {
          id: 5,
          name: "Honda Amaze",
          image: "https://images.hindustantimes.com/auto/img/2023/01/19/600x338/Honda_Amaze_Facelift_1674110358786_1674110359129_1674110359129.jpeg",
          desc: "It is a subcompact sedan with fuel efficiency, spacious cabin, affordability, and advanced safety and convenience features.",
          price: "1100000"
        },
        {
          id: 6,
          name: "Kia Seltos",
          image: "https://gumlet.assettype.com/evoindia%2Fimport%2F2019%2F07%2FKia-Seltos-3.jpg?auto=format%2Ccompress&fit=max&w=1920&dpr=1.0",
          desc: "Subcompact SUV known for its stylish design, impressive performance, and advanced safety and technology features.",
          price: ""
        },
        {
          id: 7,
          name: "Mahindra XUV700",
          image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/2021_Mahindra_XUV700_2.2_AX7_%28India%29_front_view.png",
          desc: "XUV700 is a highly-anticipated midsize SUV with advanced safety features, luxurious interiors, and powerful performance capabilities.as fs fdada da dg fqaqwdqwfdq dqd qdd q",
          price: ""
        },
        {
          id: 8,
          name: "Maruti Suzuki Baleno",
          image: "https://images.thequint.com/thequint%2F2019-04%2Fbcc42120-10a0-4dc7-a77e-6031ea904bc9%2FBaleno_Smart_Hybrid__BSVI.JPG?rect=0%2C0%2C1441%2C811&auto=format%2Ccompress&fmt=webp&width=720",
          desc: "Baleno is a premium hatchback with a spacious and feature-packed interior, fuel-efficient engines, and comfortable ride quality.",
          price: "900000"
        },
        {
          id: 9,
          name: "Mercedes C-Class",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Mercedes-Benz_C_200_Avantgarde_%28W_205%29_%E2%80%93_Frontansicht%2C_26._April_2014%2C_D%C3%BCsseldorf.jpg/280px-Mercedes-Benz_C_200_Avantgarde_%28W_205%29_%E2%80%93_Frontansicht%2C_26._April_2014%2C_D%C3%BCsseldorf.jpg",
          desc: "Luxurious compact sedan known for its advanced technology, refined driving dynamics, and comfortable and high-tech interior.",
          price: ""
        },
        {
          id: 10,
          name: "Mercedes-Benz GLC",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Mercedes-Benz_X254_1X7A6343.jpg/280px-Mercedes-Benz_X254_1X7A6343.jpg ",
          desc: "GLC is a popular midsize luxury SUV with a sophisticated design, advanced features, and impressive performance capabilities.",
          price: "7500000"
        },
        {
          id: 11,
          name: "Renault Kiger",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/2021_Renault_Kiger_RXZ_%28India%29_front_view.png/280px-2021_Renault_Kiger_RXZ_%28India%29_front_view.png",
          desc: "Kiger is a compact SUV known for its sporty design, spacious cabin, feature-packed interior, and fuel-efficient engines.",
          price: "1000000"
        },
        {
          id: 12,
          name: "Renault Kwid",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png/280px-2023_Renault_Kwid_Iconic_%28Colombia%29_front_view_01.png",
          desc: "Kwid is a budget-friendly hatchback with a distinctive design, spacious interior, fuel-efficient engines, and a host of features.",
          price: "1000000"
        },
        {
          id: 13,
          name: "Mahindra Scorpio N",
          image: "https://gumlet.assettype.com/evoindia%2F2022-06%2F5deb1717-fcf8-4b3d-a192-1788b8a0573e%2Fhero.jpg?auto=format%2Ccompress&fit=max&format=webp&w=1920&dpr=1.0",
          desc: "Midsize SUV known for its powerful performance, rugged design, and advanced features, making it ideal for off-road adventures.",
          price: "1600000"
        },
        {
          id: 14,
          name: "Tata Harrier",
          image: "https://www.indiacarnews.com/wp-content/uploads/2023/01/2023-Tata-Harrier-Dark-Edition.jpg",
          desc: "A midsize SUV with a bold and contemporary design, spacious and feature-packed interior, and powerful performance capabilities.",
          price: ""
        },
        {
          id: 15,
          name: "Tata Nexon",
          image: "https://www.financialexpress.com/wp-content/uploads/2023/02/nexon-dark.jpg?w=1024",
          desc: "A popular subcompact SUV with a modern and stylish design, fuel-efficient engines, and a spacious and feature-packed interior.",
          price: "1300000"
        },
        {
          id: 16,
          name: "Tata Punch",
          image: "https://images.news18.com/ibnlive/uploads/2023/03/tata-punch--16780811753x2.jpg?impolicy=website&width=510&height=356",
          desc: "It is a newly launched mini-SUV with a rugged and stylish design, advanced safety features, and powerful performance capabilities.",
          price: "700000"
        },
        {
          id: 17,
          name: "Vitara Brezza",
          image: "https://images.tv9hindi.com/wp-content/uploads/2022/06/maruti-suzuki-vitara-brezza.jpg?w=1200",
          desc: "Brezza is a subcompact SUV known for its sporty and modern design, fuel-efficient engines, and feature-packed and spacious interior.",
          price: "1600000"
        },
        {
          id: 18,
          name: "Volvo S60",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/2019_Volvo_S60_R-Design_Edition_T5_Automatic_2.0.jpg/280px-2019_Volvo_S60_R-Design_Edition_T5_Automatic_2.0.jpg",
          desc: "Volvo S60 is a luxurious midsize sedan known for its advanced safety features, elegant design, and refined driving dynamics.",
          price: "6000000"
        },
        {
          id: 19,
          name: "Volvo XC90",
          image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202111/2021_Volvo_XC90_petrol_mild-hy.jpg?size=690:388",
          desc: "A luxurious and safe midsize SUV with a high-tech interior, advanced features, and impressive performance capabilities.",
          price: "11000000"
        },
        {
          id: 20,
          name: "Innova Crysta",
          image: "https://imgd.aeplcdn.com/642x361/n/cw/ec/129579/infographics0.png?isig=1&q=75",
          desc: "A popular and reliable midsize MPV known for its spacious and comfortable cabin, advanced features, and efficient engines.",
          price: ""
        }
      ],
    }
  },
  methods: {
    displayPrice(name, price) {
      alert(name + "'s Price is: " + price);
    },
    showCarForm() {
      this.viewForm = true;
      this.togglePopup = true;
      this.title = "Add Car";
    },
    newCarData(newCar) {
      newCar.id = this.cars.length + 1;
      let price = newCar.price;
      if (!price) {
        price = "Available Soon"
      } else {
        price = "₹" + price
      }
      alert("Created Data:\n" + "Name: " + newCar.name + "\n" + "Image: " + newCar.image + "\n" + "Description: " + newCar.desc + "\n" + "Price: " + price);
      this.cars.push(newCar);
    },
    editCarForm() {
      this.editForm = true;
    },
    editCarData(car) {
      this.editableCar = car;
    },
    changeCarData(car) {
      this.cars.filter((c, index) => {
        if (c.id === car.id) {
          this.cars[index] = car;
          let price = car.price;
          if (!price) {
            price = "Available Soon"
          } else {
            price = "₹" + price
          }
          alert("Edited Data:\n" + "Name: " + car.name + "\n" + "Image: " + car.image + "\n" + "Description: " + car.desc + "\n" + "Price: " + price);
        }
      })
    },
    removeCar(car) {
      alert("Deleted " + car.name);
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
}

#homeComponent {
  padding: 10px 8%;
  background-color: rgb(240, 240, 240);
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