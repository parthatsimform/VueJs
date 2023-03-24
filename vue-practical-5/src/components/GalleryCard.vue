<template>
    <div class="card">
        <div class="cardHeader">
            <div class="editBtnDiv">
                <button class="editBtn" @click.prevent.stop="editCar(car)" title="Edit"><i
                        class="fa-solid fa-pen-to-square"></i>
                </button>
            </div>
            <div class="cardTitle">
                <h2>{{ car.name }}</h2>
            </div>
            <div class="deleteBtnDiv">
                <button class="deleteBtn" @click.prevent.stop="deleteCar(car)" title="Delete"><i
                        class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
        <div class="cardImgDiv">
            <img :src="car.image" :alt="car.name" class="cardImg">
        </div>
        <div class="cardDsc">
            <p>{{ car.details }}</p>
        </div>

        <div class="info">
            <RouterLink :to="{ name: 'details', params: { id: `${car.id}` } }" class="infoBtn" :disabled="!car.price"
                :class="{ notAvailable: !car.price }">
                {{ checkForPrice(car.price) }}
            </RouterLink>
        </div>
    </div>
</template>

<script>
export default {
    name: "GalleryCard",
    data() {
        return {
            isEdit: false,
            editableCar: {},
        }
    },
    props: ["car"],
    emits: ["alertPrice", "editableCar", "isEdit", "deleteCar"],
    methods: {
        checkForPrice(price) {
            if (price) {
                return "INFO";
            } else {
                return "Available Soon!";
            }
        },
        editCar(car) {
            this.$parent.togglePopup = true;
            this.$parent.title = "Edit Car";
            this.isEdit = true;
            this.editableCar = car;
            this.$emit("editableCar", this.editableCar);
            this.$emit("isEdit", this.isEdit)
        },
        deleteCar(car) {
            if (!this.$parent.viewForm && !this.$parent.editForm) {
                this.$emit("deleteCar", car);
            }
        }
    },
}
</script>

<style scoped>
.card {
    width: 300px;
    height: auto;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid rgb(221, 221, 221);
}

.card:hover {
    background-color: #e8ffdd;
    box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
    border: 1px solid green;
}

.cardHeader {
    display: flex;
    margin: 0 0 10px;
    justify-content: space-between;
}

.cardTitle {
    font-family: 'Roboto', sans-serif;
    height: 75px;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin: 2px;
    text-overflow: ellipsis;
}

.cardImg {
    width: 100%;
    height: 200px;
}

.cardDsc {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 5px;
    font-weight: 100;
    height: 112px;
    overflow: hidden;
}

.info {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
}

.infoBtn {
    border: 1px solid green;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 7px 30px;
    width: 80%;
    background-color: green;
    color: rgb(255, 255, 255);
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
    text-decoration: none;
}

.infoBtn:hover {
    color: #c7ffab;
    background-color: green;
}

.notAvailable {
    background-color: #ebffd8;
    color: black;
    cursor: not-allowed;
}

.notAvailable:hover {
    color: black;
    background-color: #ebffd8;
}

.editBtn,
.deleteBtn {
    padding: 10px;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: none;
}

.editBtn:hover,
.deleteBtn:hover {
    transform: scale(130%);
    transition: all 0.3s ease;
}

.editBtn {
    border-bottom-right-radius: 10px;
    background-color: orange;
}

.deleteBtn {
    background-color: red;
    border-bottom-left-radius: 10px;
}

.card:hover .editBtn,
.card:hover .deleteBtn {
    display: block;
}

.editBtn:hover,
.deleteBtn:hover {
    filter: drop-shadow(0 0 0.1rem crimson);
}



@media(max-width:761px) {
    .card {
        width: 260px;
    }

    .cardImg {
        height: 190px;
    }

    .info {
        width: 95%;
        margin: 0 auto;
    }
}

@media(max-width:666px) {
    .cardImg {
        height: 210px;
    }

    .info {
        width: 100%;
    }
}

@media(max-width:570px) {
    .card {
        width: 300px;
    }

    .info {
        width: 100%;
    }
}
</style>