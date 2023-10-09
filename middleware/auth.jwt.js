const jwt = require("jsonwebtoken");
const config = require("../config/auth.configs");
const db = require("../models/index");
const User = db.user;

verifyToken = (req,res,next) => {
    let token = req.header['x-access-token'];
    if(!token){
        return res.status(403).send({message: " no token provided!!"})
    }
    jwt.verify(token, config.secret,  (err,decord)=> {
        if(err){
            return res.status(401).send({message: "Unauthorized!!!!",});
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req,res,next) => {
    //SELECT * FRON user WHWRE id = req.userId
    User.findBypk(req.userId).then(user => {
        //SELECT * FROM roles,users, users_roles WHERE user.id = user_roles.userId and role.id = user_roles.roleId 
        user.getRoles().then(reles => {
            for(let i=0 ; i< roles.length; i++){
                if(roles[i].name === "admin"){
                    next()
                    return;
                }
            }
            res.status(403).send({ message: "Require Admin Role!!"});
            return;
        });
    });
};

isModerator = (req,res,next) => {
    //SELECT * FRON user WHWRE id = req.userId
    User.findBypk(req.userId).then(user => {
        //SELECT * FROM roles,users, users_roles WHERE user.id = user_roles.userId and role.id = user_roles.roleId 
        user.getRoles().then(reles => {
            for(let i=0 ; i< roles.length; i++){
                if(roles[i].name === "Moderator"){
                    next()
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!!"});
            return;
        });
    });
};

isModeratorOrAdmin = (req,res,next) => {
    //SELECT * FRON user WHWRE id = req.userId
    User.findBypk(req.userId).then(user => {
        //SELECT * FROM roles,users, users_roles WHERE user.id = user_roles.userId and role.id = user_roles.roleId 
        user.getRoles().then(reles => {
            for(let i=0 ; i< roles.length; i++){
                if(roles[i].name === "isModerator"){
                    next()
                    return;
                }
                if(roles[i].name === "admin"){
                    next()
                    return;
                }
            }
            res.status(403).send({ message: "Require Moderator Role!!"});
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
} ;
module.exports = authJwt;
