const db = require("../models/index")
const ROLES = db.ROLES;
const User = db.user;


checkDupliatecateUserOrEmail = (req, res, next) => {
    //checkUser
    //SELET * FROM user WHERE username = req.body.username
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" })
            return;

        }

        //Check Email
        User.findOne({
            where: {
                email: req.body.email,
            }
        }).then(user => {
            if (user) {
                res.status(400).send({ message: "Failed! Username is already in use!" })
                return;
            }
            next();

        });
    });
};


checkRolesExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i=0 ; i< req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({message:"Failed! Role does not exist = " + req.body.roles[i],
            });
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDupliatecateUserOrEmail: checkDupliatecateUserOrEmail,
    checkRolesExisted: checkRolesExisted,
};
module.exports = verifySignUp;