const { Router } = require("express");
const sql = require("./db.sql");
//Constructor ตัวสร้าง object
const Restaurant = function (restaurant) {
  //Atrributes เพิ่มตามไดอาแกรม
  this.name = restaurant.name;
  this.type = restaurant.type;
  this.img = restaurant.img;
};

// Method
Restaurant.create = (newRestaurant, result) => {
  //INSERT INTO restaurant SET name, type, img VALUES ("KFC", "ฟาสฟู้ด", "url")
  sql.query("INSERT INTO restaurants SET ?", newRestaurant, (err, res) => {
    //เมื่อมีการ error เกิดขึ้น ทำเพื่อเช็ค
    if (err) {
      console.log("err", err);
      result(err, null);
      return;
    }
    //ไม่มี error
    console.log("new restaurant created");
    result(null, { id: res.id, ...newRestaurant });
  });
};

//Get all restaurant
Restaurant.getAll = (result) => {
  //SELECT * FROM restaurants
  sql.query("SELECT * FROM restaurants", (err, res) => {
    //เมื่อมีการ error เกิดขึ้น ทำเพื่อเช็ค
    if (err) {
      console.log("err", err);
      result(err, null);
      return;
    }
    //ไม่มี error
    console.log("new restaurant created");
    result(null, res);
  });
};

Restaurant.getById = (restaurantId, result) => {
  //SELECT * FROM restaurants WHERE id = restaurantId
  sql.query(`SELECT * FROM restaurants WHERE id = ${restaurantId}`,
    (err, res) => {
      //เมื่อมีการ error เกิดขึ้น ทำเพื่อเช็ค
      if (err) {
        console.log("err", err);
        result(err, null);
        return;
      }
      //ไม่มี error
      console.log("get restaurant by Id");
      if (res.length) result(null, res[0]);
      return;
    //not found
      result({ kind: "not_found" }, null);
    }
  )
 
};

//Update Res
Restaurant.updateById = (id , restaurant, result) => {
    //UPDATE restaurants SET name = "name" , type = "type" , img = "url" WHERE id = "id"
    sql.query("UPDATE restaurants SET name = ? , type = ? , img = ? WHERE id = ?", 
    [restaurant.name, restaurant.type, restaurant.img, id] ,
    (err, res) => {
        if(err){
            result(err, null)
            return;
        }
        if(res.affectedRow == 0){
            result({ kind : "not_found"} , null)
            return;
        }
        //Restaurant Update
        result(null, {id: id,...restaurant});
    });
};

//Delate Restaurant
Restaurant.delateById = (restaurantId , result) => {
    //DELETE FROM restaurants WHERE id = 6
    sql.query("DELETE FROM restaurants WHERE id = ? ", restaurantId , (err, res)=> {
        if(err) {
            result(err, null);
            return;
        }
        if (res.affectedRows == 0){
            result({ kind : "not_found"} , null);
            return;
        }
        //Restaurant Delate
        console.log("Restaurant id " + restaurantId + " is delated");
        result(null, res);
    });
}



module.exports = Restaurant;
