<template>
  <div id="carComponent">
    <GalleryCard :cars="cars" @alertPrice="displayPrice" />
  </div>
</template>

<script>
import GalleryCard from "./components/GalleryCard.vue"
export default {
  name: "App",
  components: {
    GalleryCard,
  },
  data() {
    return {
      cars: [
        {
          id: 1,
          name: "Audi A8",
          image: require("./images/Audi_A8.jpg"),
          desc: "It is a full-size luxury sedan with advanced technology, refined driving dynamics, and a spacious interior.",
          price: "₹1.34 Cr"
        },
        {
          id: 2,
          name: "Audi Q7",
          image: require("./images/Audi_Q7.jpeg"),
          desc: "It is a midsize luxury SUV with sleek design, impressive performance, and a spacious and high-tech interior.",
          price: ""
        },
        {
          id: 3,
          name: "Hyundai Creta",
          image: require("./images/creta.webp"),
          desc: "It is a popular compact SUV with modern styling, fuel-efficient engines, and a feature-packed interior.",
          price: "₹15 Lakh"
        },
        {
          id: 4,
          name: "Honda City",
          image: require("./images/Honda_City.jpg"),
          desc: "Compact sedan with practicality, reliability, fuel efficiency, and a comfortable ride quality. It offers a spacious and safe interior.",
          price: "₹12 Lakh"
        },
        {
          id: 5,
          name: "Honda Amaze",
          image: require("./images/Honda-amaze.jpg"),
          desc: "It is a subcompact sedan with fuel efficiency, spacious cabin, affordability, and advanced safety and convenience features.",
          price: "₹11 Lakh"
        },
        {
          id: 6,
          name: "Kia Seltos",
          image: require("./images/Kia_Seltos.jpeg"),
          desc: "Subcompact SUV known for its stylish design, impressive performance, and advanced safety and technology features.",
          price: ""
        },
        {
          id: 7,
          name: "Mahindra XUV700",
          image: require("./images/mahindra-xuv700.webp"),
          desc: "XUV700 is a highly-anticipated midsize SUV with advanced safety features, luxurious interiors, and powerful performance capabilities.",
          price: ""
        },
        {
          id: 8,
          name: "Maruti Suzuki Baleno",
          image: require("./images/Maruti-Suzuki-Baleno.webp"),
          desc: "Baleno is a premium hatchback with a spacious and feature-packed interior, fuel-efficient engines, and comfortable ride quality.",
          price: "₹9 Lakh"
        },
        {
          id: 9,
          name: "Mercedes C-Class",
          image: require("./images/mercedes-c-class.webp"),
          desc: "Luxurious compact sedan known for its advanced technology, refined driving dynamics, and comfortable and high-tech interior.",
          price: ""
        },
        {
          id: 10,
          name: "Mercedes-Benz GLC",
          image: require("./images/Mercedes_GLC.webp"),
          desc: "GLC is a popular midsize luxury SUV with a sophisticated design, advanced features, and impressive performance capabilities.",
          price: "₹75 Lakh"
        },
        {
          id: 11,
          name: "Renault Kiger",
          image: require("./images/Renault_kiger.webp"),
          desc: "Kiger is a compact SUV known for its sporty design, spacious cabin, feature-packed interior, and fuel-efficient engines.",
          price: "₹10 Lakh"
        },
        {
          id: 12,
          name: "Renault Kwid",
          image: require("./images/Renault_kwid-.webp"),
          desc: "Kwid is a budget-friendly hatchback with a distinctive design, spacious interior, fuel-efficient engines, and a host of features.",
          price: "₹10 Lakh"
        },
        {
          id: 13,
          name: "Mahindra Scorpio N",
          image: require("./images/scorpio-n.webp"),
          desc: "Midsize SUV known for its powerful performance, rugged design, and advanced features, making it ideal for off-road adventures.",
          price: "₹16 Lakh"
        },
        {
          id: 14,
          name: "Tata Harrier",
          image: require("./images/tata-harrier.webp"),
          desc: "A midsize SUV with a bold and contemporary design, spacious and feature-packed interior, and powerful performance capabilities.",
          price: ""
        },
        {
          id: 15,
          name: "Tata Nexon",
          image: require("./images/tata-nexon.jpeg"),
          desc: "A popular subcompact SUV with a modern and stylish design, fuel-efficient engines, and a spacious and feature-packed interior.",
          price: "₹13 Lakh"
        },
        {
          id: 16,
          name: "Tata Punch",
          image: require("./images/tata-punch.webp"),
          desc: "It is a newly launched mini-SUV with a rugged and stylish design, advanced safety features, and powerful performance capabilities.",
          price: "₹7 Lakh"
        },
        {
          id: 17,
          name: "Vitara Brezza",
          image: require("./images/vitara-brezza.webp"),
          desc: "Brezza is a subcompact SUV known for its sporty and modern design, fuel-efficient engines, and feature-packed and spacious interior.",
          price: "₹16 Lakh"
        },
        {
          id: 18,
          name: "Volvo S60",
          image: require("./images/Volvo_s60.webp"),
          desc: "Volvo S60 is a luxurious midsize sedan known for its advanced safety features, elegant design, and refined driving dynamics.",
          price: "₹60 Lakh"
        },
        {
          id: 19,
          name: "Volvo XC90",
          image: require("./images/Volvo_xc90.jpeg"),
          desc: "A luxurious and safe midsize SUV with a high-tech interior, advanced features, and impressive performance capabilities.",
          price: "₹1.1 Cr"
        },
        {
          id: 20,
          name: "Innova Crysta",
          image: require("./images/innova-crysta.jpeg"),
          desc: "A popular and reliable midsize MPV known for its spacious and comfortable cabin, advanced features, and efficient engines.",
          price: ""
        }
      ],
    }
  },
  methods: {
    displayPrice(name, price) {
      alert(name + "'s Price is: " + price);
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#carComponent {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  background-color: rgb(240, 240, 240);
}
</style>