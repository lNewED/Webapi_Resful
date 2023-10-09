const Restaurant = require("../models/restaurant.model")

//Instrt Data
Restaurant.createRestaurant = async(newRestaurant)=>{
    console.log("true");
    try {
        const  createRestaurant = await Restaurant.create(newRestaurant);
        console.log("created restaurants:", createRestaurant.toJSON());
        return createRestaurant.toJSON();
    } catch (error) {
        console.log("err", err);
        throw err;
    }
}

//Get all restaurant
Restaurant.getAll = async () =>{
    console.log("true");
    try {
        const restaurant = await Restaurant.findAll();
        return restaurant.map(restaurants => restaurants.toJSON());
    } catch (error) {
        console.log("error",error);
        throw error;
    }
}

//Get Restaurant By ID 
Restaurant.getById = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (restaurant) {
            return restaurant.toJSON();
        } else {
            throw { kind:"not_found" }
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

//Delete Restaurant
Restaurant.deletebyid = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.destroy({ where: { id: restaurantId } });
        return restaurant
    } catch (error) {
        console.log("err", error);
        throw error;
    }
};

//Update a restaurant
Restaurant.restaurantupdateid = async (edit,restaurantId) => {
    try {
        const restaurant = await Restaurant.update(edit,({ where: { id: restaurantId } }))
        return restaurant
    } catch (error) {
        console.log("err", error);
        throw error;
       }
};

module.exports = Restaurant;