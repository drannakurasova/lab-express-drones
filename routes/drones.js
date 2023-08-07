const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js");

//GET to "/drones" para ver todos los drones

router.get("/drones", (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((allDrones) => {
      console.log("allDrones", allDrones);
      res.render("drones/list.hbs", {
        name: allDrones,
        propellers: allDrones,
        maxSpeed: allDrones,
      });
    })
    .catch((error) => next(error));
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  console.log(req.body);
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed,
  })
    .then(() => {
      res.redirect("/drones");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try { 
  console.log ("req.params.id",req.params.id)
  const response = await Drone.findById(req.params.id)
   res.render("drones/update-form.hbs", {
        updatedDrone: response,
      });
    
    } catch (error) { next(error)};
});

// router.post("/drones/:id/edit", async (req, res, next) => {
//   // Iteration #4: Update the drone

//   try {

//   const droneID = req.params.id;
//   console.log ("id=",droneID)
//     const { name, propellers, maxSpeed } = req.body;

//     const response = await Drone.findByIdAndUpdate(droneID, {
//       name: name,
//       propellers: propellers,
//       maxSpeed: maxSpeed,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.post ("/drones/:id/edit", (req, res, next) => {
  const droneID = req.params.id;
  console.log ("id=",droneID)

    const {name, propellers, maxSpeed} = req.body 

    Drone.findByIdAndUpdate( droneID, {
        name: name,
        propellers: propellers,
        maxSpeed: maxSpeed
    })
    .then (() => {
        res.redirect("/drones")
    }) 
    .catch ( (error) => next (error))
} )

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    const response = await Drone.findByIdAndDelete(req.params.id)
    res.redirect("/drones")
} catch (error) {next (error) } 
});

module.exports = router;
