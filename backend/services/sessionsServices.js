const UserModel = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenKey = require('../config/setup').secretOrKey||'secret'
const loginService = async function (req, res) {
  try {
    const { user_name, password } = req.body
    const checkIfUserExists = await UserModel.find({user_name})
    if(!(checkIfUserExists && checkIfUserExists.length>0)){
        return res.status(404).send({ status: 'failure', message: 'Invalid user name or password' });
    }else{
        const foundUser = checkIfUserExists[0]
        const match = bcrypt.compareSync(password, foundUser.password);
            if(match){
                const payload = {
                    user_role: foundUser.user_role,
                    id: foundUser._id
                }
                const token = jwt.sign(payload, tokenKey, { expiresIn: '8h' })
                return res.status(200).send({ status: 'success', token: `bearer ${token}`,  info:{id:foundUser._id,type:foundUser.user_role, user_name:foundUser.user_name} })
            }
            else{
                return res.status(404).send({ status: 'failure', message: 'Invalid user name or password' });
            }
    }
  } catch (e) {
    console.log(e)
    return res.status(400).send({ status: 'failure', message: 'Error ocurred' });
  }
}

module.exports = {
    loginService
}
