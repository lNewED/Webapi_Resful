const express = require("express");
const router = express.Router();
const Restaurant = require("../controllers/restaurant.controllers");

//สร้าง restaurants ใหม่
//http://localhost:4000/restaurants
router.post("/restaurant",async (req,res)=>{
    try{
        const newRestaurant = req.body;
        const createRestaurant = await Restaurant.createRestaurant(newRestaurant);
        res.status(201).json(createRestaurant);
    }catch (error) {
        res.status(500).json({error:"Failed to create Restaurant"})
    }
});

  //Get all restaurant
  router.get("/restaurant",async (req,res)=>{
    try{
        const restaurant = await Restaurant.getAll();
        res.status(201).json(restaurant);
    }catch (error) {
        res.status(500).json({error:"Failed to get all restaurant"});
    }
});

router.get("/restaurant/:id", async(req, res)=>{
    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.getById(restaurantId);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({error:"Failed to get restaurant by Id"});
    }
});

//Delete Restaurant
router.delete("/restaurant/:id", async (req, res) => {
    try {
      console.log("Hello")
      const restaurantId = req.params.id
      const ShoRestaurant = await Restaurant.deletebyid(restaurantId)
      res.status(201).json(ShoRestaurant)
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to Show Restaurant" })
    }
  });

//Update Restaurant
router.put("/restaurant/:id", async (req, res) => {
    try {
      console.log("Hello")
      const edit = req.body
      const restaurantId = req.params.id
      const ShoRestaurant = await Restaurant.restaurantupdateid(edit,restaurantId)
      res.status(201).json({ message: "success" })
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to Show Restaurant" })
    }
  });
//อัปเดต restaurants ใหม่
//http://localhost:4000/restaurants
module.exports = router;