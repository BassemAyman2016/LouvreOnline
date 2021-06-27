const UserModel = require('../models/users')
const bcrypt = require('bcryptjs')
const getUsersService = async function (req,res) {
  try {
    const skip = (req.query.page - 1) * req.query.size;
    const UserFetchRequest = await UserModel.find({"user_role":"GUEST"}).limit(parseInt(req.query.size)).skip(skip)
    return res.status(200).send({ status: 'success', message: 'Users fetched successfully', data: UserFetchRequest });
  } catch (e) {
    console.log("error",e)
    return res.status(400).send({ status: 'failure', message: 'Error occured' })
  }
}
const userSignupService = async function (req,res) {
  try {
    const newUsername = req.body.user_name 
    const checkUserNameExists = await UserModel.find({user_name: newUsername})
    if(checkUserNameExists && checkUserNameExists.length>0){
      return res.status(400).send({ status: 'failure', message: 'User name already exists' })
    }

    const newUserBody = {
      user_name: req.body.user_name,
      user_role: req.body.user_role,
      phone_number: req.body.phone_number
    }
    const encrypted = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, encrypted);
    newUserBody.password = hashedPassword
    const newUserModel = new UserModel(newUserBody);
    
    let newUserRequest = await UserModel.create(newUserModel);

    let responseDataBody = {...newUserRequest._doc}
    if(newUserRequest){
      delete responseDataBody._id
      delete responseDataBody.password
      delete responseDataBody.__v
    }
    
    return res.status(200).send({ status: 'success', message: 'User created successfully', data: responseDataBody });
  
  } catch (e) {
    console.log("error",e)
    return res.status(400).send({ status: 'failure', message: 'Error occured' })
  }
}

module.exports = {
    getUsersService,
    userSignupService
}
