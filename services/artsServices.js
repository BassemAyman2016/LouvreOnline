const ArtModel = require('../models/arts')

const getArtsService = async function (req,res) {
  try {
    const skip = (req.query.page - 1) * req.query.size;
    const ArtFetchRequest = await ArtModel.find().limit(parseInt(req.query.size)).skip(skip)
    return res.status(200).send({ status: 'success', message: 'Art fetched successfully', data: ArtFetchRequest });
  } catch (e) {
    console.log("error",e)
    return res.status(400).send({ status: 'failure', message: 'Error occured' })
  }
}
const addArtService = async function (req,res) {
  try {
    const newArtname = req.body.name 
    const checkArtNameExists = await ArtModel.find({name: newArtname})
    if(checkArtNameExists && checkArtNameExists.length>0){
      return res.status(400).send({ status: 'failure', message: 'Art name already exists' })
    }

    const newArtBody = {
      name: req.body.name,
      picture: req.body.picture,
      artist: req.body.artist,
      description: req.body.description
    }

    const newArtModel = new ArtModel(newArtBody);
    let newArtRequest = await ArtModel.create(newArtModel);

    let responseDataBody = {...newArtRequest._doc}
    if(newArtRequest){
      delete responseDataBody._id
      delete responseDataBody.__v
    }
    
    return res.status(200).send({ status: 'success', message: 'Art created successfully', data: responseDataBody });
    } catch (e) {
    console.log("error",e)
    return res.status(400).send({ status: 'failure', message: 'Error occured' })
  }
}
async function editArtService (req,res) {
  try {
    const artId = req.body.id 
    const checkArtExists = await ArtModel.findById(artId)
    if(!checkArtExists){
      return res.status(400).send({ status: 'failure', message: 'Art does not exist' })
    }

    let artUpdateBody = {}
    if(req.body.picture) artUpdateBody.picture = req.body.picture
    if(req.body.artist) artUpdateBody.artist = req.body.artist
    if(req.body.description) artUpdateBody.description = req.body.description
    if(req.body.name) artUpdateBody.name = req.body.name

    let editArtRequest = await ArtModel.updateOne({ '_id': artId },artUpdateBody);
    let updatedArt = await ArtModel.findOne({ '_id': artId})
    let responseDataBody = {...updatedArt._doc}
    if(updatedArt){
      delete responseDataBody._id
      delete responseDataBody.__v
    }
    return res.status(200).send({ status: 'success', message: 'Art updated successfully', data: responseDataBody });    
  } catch (e) {
    console.log("error",e)
    return res.status(400).send({ status: 'failure', message: 'Error occured' })
  }
}
const deleteArtService = async function  (req,res) {
    
  try {
    const artId = req.body.id 
    const checkArtExists = await ArtModel.findById(artId)
    if(!checkArtExists){
      return res.status(400).send({ status: 'failure', message: 'Art does not exist' })
    }

    let deleteArtRequest = await ArtModel.findByIdAndDelete(artId);
    let updatedArt = await ArtModel.findOne({ '_id': artId})
    let responseDataBody = {...deleteArtRequest._doc}
    if(deleteArtRequest){
      delete responseDataBody._id
      delete responseDataBody.__v
    }
    return res.status(200).send({ status: 'success', message: 'Art deleted successfully', data: responseDataBody });
  } catch (e) {
    console.log("error",e)
    return res.status(400).send({ status: 'failure', message: 'Error occured' })
  }
}


module.exports = {
    getArtsService,
    addArtService,
    editArtService,
    deleteArtService
}
