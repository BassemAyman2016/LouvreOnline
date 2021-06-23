const ArtService = require('../services/artsServices')

const getArtController = async (req,res) => {
    const checkIsLoggedIn = req.user_role
    if(!checkIsLoggedIn){
        return res.status(401).send({ status: 'failure', message: 'Unauthorized access' }); 
    }
    const valid_params = 
        req.query
        && req.query.page
        && req.query.size
        
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Query paramters are missing' });    
    }
       
    const GetArtRequest = await ArtService.getArtsService(req,res);
    return GetArtRequest;
}
const addArtController = async (req,res) => {
    const checkIsAdmin = req.user_role && req.user_role==="ADMIN"
    if(!checkIsAdmin){
        return res.status(401).send({ status: 'failure', message: 'Unauthorized access' }); 
    }
    const valid_params = 
        req.body
        && req.body.picture
        && req.body.artist
        && req.body.description
        && req.body.name
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    
    const CreateArtRequest = await ArtService.addArtService(req,res);
    return CreateArtRequest;
                  
    
}
const editArtController = async (req,res) => {
    const checkIsAdmin = req.user_role && req.user_role==="ADMIN"
    if(!checkIsAdmin){
        return res.status(401).send({ status: 'failure', message: 'Unauthorized access' }); 
    }
    const valid_params = req.body && req.body.id
        
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    
    const EditArtRequest = await ArtService.editArtService(req,res);
    return EditArtRequest;
       
}
const deleteArtController = async (req,res) => {
    const checkIsAdmin = req.user_role && req.user_role==="ADMIN"
    if(!checkIsAdmin){
        return res.status(401).send({ status: 'failure', message: 'Unauthorized access' }); 
    }
    const valid_params = req.body && req.body.id
        
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    
    const DeleteArtRequest = await ArtService.deleteArtService(req,res);
    return DeleteArtRequest;
    
}


module.exports = {
    getArtController,
    addArtController,
    editArtController,
    deleteArtController
}