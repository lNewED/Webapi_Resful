const db = require("../models");
const config = require("../config/auth.configs");
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Op = db.Sequelize.Op;

//SingUp
exports.singup = (req, res) => {
    //save user to DB
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    }).then(
        user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        },
                    },
                }).then((roles) => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was register successfully" });
                    });
                });
            } else {
                //user role = 1 user
                user.setRoles([1]);
                res.send({ message: "User was register successfully" })
            }
        }).catch(err => {
            res.status(500).send({message: err.message});
        });
};

//SingIn
exports.singin = (req,res) =>{
    //SELECT * FROM users WHERE username = req.body.username
    User.findOne({
        where:{
            username: req.body.username 
        }
    }).then(user => {
        if(!user){
            return res.status(404).send({message:"User not found"});
        }
        let passwordInValid = bcrypt.compareSync(req.body.password, user.password);
        if(! passwordInValid){
            return res.status(401).send({
                accessToken : null,
                message: "InValid password",
            }); 
        }
        const token = jwt.sign({id:user.id}, config.secret ,{
                algorithm:"HS256",
                allowInsecureKeySizes:true,
                expiresIn: 86400, //24hours 60*60*24
            });
            let authorities = [];
            user.getRoles().then(roles => {
                for(let i=0; i< roles.length; i++) {
                    authorities.push("ROLES_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id:user.id,
                    username:user.username,
                    email:user.email,
                    roles:authorities,
                    accessToken:token
                });
            }).catch(err => {
                res.status(500).send({message: err.message})
            });
    });
};