var user = require("../controllers/User.controller");

module.exports = (app) => {
    app.post("/api/user/register", user.register);
    app.post("/api/user/login", user.login);
    app.post("/api/user/confirm-email", user.confirmEmail);
    app.post("/api/user/send-confirmEmail", user.sendConfirmEmail);
    app.post("/api/user/forgotPassword", user.forgotPassword);
    app.post("/api/user/savepasswordwithverify", user.savePasswordWithVerify);
    
};
