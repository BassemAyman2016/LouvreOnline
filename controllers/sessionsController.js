const SessionsServices = require('../services/sessionsServices')
const login =  async function (req, res) {
    var valid_params = 
        req.body 
    && req.body.user_name 
    && req.body.password 
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Login fields are missing' });
    }else{
        const LoginRequest = await SessionsServices.loginService(req,res)
        return LoginRequest
    }
}


module.exports = {
    login
}