const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant.model.sql");

//Insert rantaurant to database
//http://localhost:4000/restaurants
router.post("/restaurants", (req, res) => {
    const newRestaurant = new Restaurant({
        //Create Restaurant instance
        name :  req.body.name, 
        type : req.body.type ,
        img : req.body.img 
    })

    //Insert to DB
    Restaurant.create(newRestaurant,( err , data ) => {
        if(err) { 
            res.status(500).send({
                    messge: err.messge || "Some error occured while inserting the new restaurant"
                });
            }else{
                res.send(data);
            }
    })
})

//
//http://localhost:4000/restaurants
router.get("/restaurants", (req,res)=>{
    Restaurant.getAll ((err, data) => {
        if(err){
            res.status(500).send({
                messge: err.messge || "Some error occured while inserting the new restaurant"
                });
            }else{
                res.send(data);
            }
        })
})

//Get restaurant by id
//http://localhost:4000/restaurants/3
router.get ("/restaurants/:id", (req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.getById(restaurantId,(err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    messge:"Restaueant not found with this id " + restaurantId});
        }else{
            res.status(500).send({
                messge: err.messge || "Some error occured while inserting the new restaurant"});
        }
        }else{
            res.send(data)
        }
    })
});

//Update restaurant attributes
//http://localhost:4000/restaurants
router.put ("/restaurants/:id", (req,res) => {
    const restaurantId = Number.parseInt(req.params.id);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({
            messge: "Attributes can not be emply !!!!"
        })
    }
    Restaurant.updateById(restaurantId, new Restaurant(req.body), (err,data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    messge:"Restaueant not found with this id " + restaurantId});
        }else{
            res.status(500).send({
                messge: err.messge || "Some error occured while Updating the new restaurant"});
        }
        }else{
            res.send(data)
        }
    })
   
});



//Delate 
router.delete("/restaurants/:id", (req, res) => {
    const restaurantId = Number.parseInt(req.params.id);
    Restaurant.delateById(restaurantId, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(400).send({
                    messge:"Restaueant not found with this id " + restaurantId});
        }else{
            res.status(500).send({
                messge: err.messge || "Some error occured while Delate the new restaurant"});
        }
        }else{
            res.send(data)
        }
    })
});


module.exports = router;