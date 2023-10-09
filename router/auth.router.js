const verifySingUp = require("../middleware/verifySingUp");
const controller = require("../controllers/auth.controller");
module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-axxess-token, Origin, Content-Typr, Accept"
        );
        next();
    });
    app.post("/api/auth/singup",
    [verifySingUp.checkDupliatecateUserOrEmail, verifySingUp.checkRolesExisted],
    controller.singup
    );

    app.post("/api/auth/singin", controller.singin);    
};