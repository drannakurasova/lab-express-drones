// Iteration #1

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },

  { name: "Racer 57", propellers: 4, maxSpeed: 20 },

  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

const Drone = require("../models/Drone.model.js");

//Conexion mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/lab-express-drones")

// const MONGO_URI =
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-drones";

Drone.create(drones)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });


 //Paso "opcional" de la iteracion 1, aprender a cerrar una conexion
  mongoose.disconnect("mongodb://127.0.0.1:27017/lab-express-drones")

module.exports = Drone;
