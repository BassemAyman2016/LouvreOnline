import React, {useState} from 'react'
import {  makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ImageUploader from 'react-images-upload';
import cloudinary from "../api/cloudinary"
import api from "../api/api"

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ArtAddComponent = () => {
    const useStyles = makeStyles({      
        'login-container':{
            width:'100vw',
            height:'100vh',
            // backgroundColor:'lightblue',
            position:'relative',
            backgroundSize:'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition:'center'
        },
        root: {
            // position:'absolute',
            // left:'50%',
            // top:'50%',
            // transform:'translate(-50%,-50%)',
            width:'90vh'
        },
        'title-area':{
        // display:'flex',
        // justifyContent:'center',
        // padding:'25px',
        fontWeight:'600',
        fontSize:'25px',
        // borderBottom:'1px solid red'
        // flexDirection:'column'
        },
        highlightSpan:{
            width:'35%',
            height:'3px',
            backgroundColor:'blue',
        //   poisition:'absolute'
        },
        borderBottom:{
            width:'100%',
            height:'2px',
            backgroundColor:'#5C33F6',
            borderRadius:'2px'
            // color:'red',
            // position:'absolute',
            // bottom:'0px'
        },
        buttonStyle:{
            backgroundColor:'#5C33F6',
            width:'100%',
            height:'35px',
            cursor:'pointer',
            color:'white',
            borderRadius:'5px'
        }
    });
    const classes = useStyles();
    const [artName,setArtName] = useState('');
    const [artistName,setArtistName] = useState('');
    const [artDesc,setArtDesc] = useState('');
    const [artLink,setArtLink] = useState('');
    const [snackMessage,setSnackMessage] = useState('');
    const [displaySnack,setDisplaySnack] = useState(false);
    const [snackType,setSnackType] = useState('success');

    const handleImageSelect = async (e)=>{
        let imageFile = e[0]
        try {
            if(imageFile){
                const form = new FormData();
                form.append("file", imageFile);
                const uploadImageAPI = await cloudinary(form);
                let imageLink ='';
                if (uploadImageAPI.status && uploadImageAPI.status === "success"){
                        imageLink = uploadImageAPI.link;
                        setArtLink(imageLink)
                        setSnackMessage("Image uploaded successfully")
                        setDisplaySnack(true)
                        setSnackType('success')
                        setTimeout(()=>{
                            setDisplaySnack(false)
                        },2000)
                }else{
                    setArtLink("")
                    setSnackMessage("Error inside image upload")
                    setDisplaySnack(true)
                    setSnackType('error')
                    setTimeout(()=>{
                        setDisplaySnack(false)
                    },2000)
                }
            }
            
        } catch (error) {
            console.log("errorInfo",error)
            setSnackMessage("Error in image upload")
            setDisplaySnack(true)
            setSnackType('error')
            setTimeout(()=>{
                setDisplaySnack(false)
            },2000)
        }
        
        
    }
    const handleSubmit = async ()=>{
        if(artName!==''&& artistName!=='' && artDesc!=='' && artLink!=='' ){
            let apiObject = {
                name: artName,
                picture: artLink,
                artist: artistName,
                description: artDesc
            }
            await api().post(`/art`,apiObject)
            .then(async (res)=>{
                const data = res.data
                setSnackMessage(data.message)
                setDisplaySnack(true)
                setSnackType('success')
                setTimeout(()=>{
                    setDisplaySnack(false)
                },2000)
                setArtName("");
                setArtistName("");
                setArtDesc("");
                setArtLink("");
            })
            .catch(err=>{
                console.log("errrrrrrrrr",err)
                if(
                err && 
                err.response &&
                err.response.data && 
                err.response.data.message  
                ){
                    setSnackMessage(err.response.data.message)
                }else{
                    setSnackMessage('An error occured')
                }
                setSnackType('error')
                setDisplaySnack(true)
                setTimeout(()=>{
                    setDisplaySnack(false)
                },3000)
            })
            //success error
            
        }else{
            let returnMessage = 'unchanged'
            if(artName==='') returnMessage = 'Art name not entered';
            if(artistName==='') returnMessage = 'Artist name not entered';
            if(artDesc==='') returnMessage = 'Art description not entered';
            if(artLink==='') returnMessage = 'Art picture not entered';
            setSnackMessage(returnMessage)
            setDisplaySnack(true)
            setSnackType('error')
            setTimeout(()=>{
                setDisplaySnack(false)
            },2000)
        }
    }
    return (
        <div>
            <Snackbar open={displaySnack} autoHideDuration={6000} >
                <Alert severity={snackType}>
                    {snackMessage}
                </Alert>
            </Snackbar> 
            <div className="row align-center">
                <div className="column small-9">
                    <Card className={classes.root}>
                        <div className={` row align-center ${classes['title-area']}`}>
                            <div className="column small-6">
                            <div className="row align-center" style={{position:'relative'}}>
                                <div className="column small-12" style={{textAlign:'center',padding:'20px'}}>Upload Art</div>
                                <div className={`column small-12 ${classes.borderBottom}`}></div>
                            </div>
                                
                            </div>
                        </div>                
                        <Divider variant="middle" />
                        <div className="row" style={{margin:'20px'}}>
                            <div className="column small-12">
                                <div className="row expanded" >
                                    <div className="column small-12" style={{fontWeight:'bold'}}>
                                        Name
                                    </div>
                                    <div className="column small-12" style={{marginBottom:'10px'}}>
                                        <TextField value={artName} onChange={e => setArtName(e.target.value)} fullWidth id="outlined-basic1" placeholder="input art name in here" variant="outlined" />
                                    </div>
                                    <div className="column small-12" style={{fontWeight:'bold'}}>
                                        Artist
                                    </div>
                                    <div className="column small-12" style={{marginBottom:'10px'}}>
                                        <TextField value={artistName} onChange={e => setArtistName(e.target.value)} fullWidth id="outlined-basic2" placeholder="input artist name in here" variant="outlined" />
                                    </div>
                                    <div className="column small-12" style={{fontWeight:'bold'}}>
                                        Description
                                    </div>
                                    <div className="column small-12" style={{marginBottom:'10px'}}>
                                        <TextField value={artDesc} onChange={e => setArtDesc(e.target.value)} fullWidth id="outlined-basic3" placeholder="input art description in here" variant="outlined" />
                                    </div>
                                    <div className="column small-12">
                                        <div className="row align-center">
                                            <ImageUploader
                                                    withIcon={false}
                                                    buttonText='Choose image to upload'
                                                    onChange={(e)=>handleImageSelect(e)}
                                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                    maxFileSize={5242880}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row " style={{margin:'20px '}} >
                            <div className="column small-12">
                                <button onClick={()=>{handleSubmit()}} className={classes.buttonStyle}>Upload</button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div> 
        </div>
    )
}

export default ArtAddComponent
