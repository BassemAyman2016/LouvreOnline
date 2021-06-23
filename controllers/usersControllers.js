const UserServices = require('../services/usersServices')

const getUsersController = async (req,res) => {
    const checkIsAdmin = req.user_role && req.user_role==="ADMIN"
    if(!checkIsAdmin){
        return res.status(401).send({ status: 'failure', message: 'Unauthorized access' }); 
    }
    const GetUsersRequest = await UserServices.getUsersService(req,res);
    return GetUsersRequest;
}
const userSignupController = async (req,res) => {
    const valid_params = 
        req.body 
        && req.body.user_name
        && req.body.password 
        && req.body.user_role 
        && req.body.phone_number    
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    
    const userSignupRequest = await UserServices.userSignupService(req,res)
    return userSignupRequest;   
}

module.exports = {
    getUsersController,
    userSignupController
}