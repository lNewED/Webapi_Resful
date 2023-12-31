const {DataTypes} = require("sequelize");
const sequelize = require("./db");
//Defind the restaurants model
const Restaurant = sequelize.define("restaurants",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,  
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false,  
    },
    img:{
        type:DataTypes.STRING,
        allowNull:false,  
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue:DataTypes.NOW,
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:true,
        defaultValue:DataTypes.NOW,
    },
});

//Synchronize database
/*Restaurant.sync({force:false})
.then(()=>{
    console.log("Table created or already exists");
}).catch((error)=>{
    console.error("error creating table:", error)
});*/

module.exports = Restaurant;