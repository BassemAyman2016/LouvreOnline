import React, {useEffect,useState} from 'react'
import api from "../api/api.js"
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import  {setDisplayArt,setPageArts} from "../redux/actions/art.actions"
import Pagination from '@material-ui/lab/Pagination';
import {setLoaderFlag} from "../redux/actions/loader.actions"
import Typography from '@material-ui/core/Typography';
import CloseImage from '../assets/close.png'
import { Dialog, DialogContent, Theme, DialogTitle,DialogContentText,DialogActions } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    imageContainer:{
      width:'70px',
      height:'70px',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      borderRadius:'5px'
    },
    seeDetails:{
      color:'#5C33F6',
      fontWeight:'bold',
      cursor:'pointer',
      marginTop:'5px',
    },
    deleteButton:{
      color:'white',
      cursor:'pointer',
      backgroundColor:'red',
      display:'inline-block',
      padding:'10px 20px',
      borderRadius:'5px',
      textAlign:'center',
      verticalAlign:'middle'
    },
    backDrop: {
      backdropFilter: "blur(3px)",
      backgroundColor:'rgba(250,250,250,0.4)'
    },
    singleImageContainer:{
      width:'35vw',
      backgroundColor:'white',
      borderRadius:'10px',
      position:'relative',
      overflow:'visible'
    },
    singleImageWrapper:{
      display:'inline-block',
      width:'35vw',
      height:'35vw',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      
      // backgroundColor:'red'
    },
    artistTitle:{
      color:'#208BEB',
      padding:'10px 15px',
      fontWeight:'bold'
    },
    artDesc:{
      padding:'10px 15px'
    },
    closeIcon:{
      position:'absolute',
      right:'0px',
      top:'0px',
      width:'30px',
      height:'30px',
      // backgroundColor:'blue',
      zIndex:'10',
      backgroundImage:`url(${CloseImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      cursor:'pointer' 
    },
    cardContainer:{
        width:'220px',
        height:'285px',
        backgroundColor:'white',
        borderRadius:'10px',
        border:'1px solid #eaeaea',
        cursor:'pointer'
    },
    imageWrapper:{
        width:'220px',
        height:'220px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // backgroundColor:'red',
        // border:'10px'
        borderTopLeftRadius:'10px',
        borderTopRightRadius:'10px'
    },
    artistName:{
        // textAlign:'center'
        marginTop:'20px',
        padding:'0px 20px',
        fontWeight:'bold',
        color:'#208BEB',
        fontSize:'15px'
    }
  });
const GuestGallery = (props) => {
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    const [successMessage,setSuccessMessage]=useState('');
    const [failureMessage,setFailureMessage]=useState('');
    const [pageNumber, setPageNumber] = useState(1)
    const classes = useStyles();
    const [showImageDialog,setShowImageDialog] = useState(false)
    const [chosenRow,setChosenRow] = useState(null)

    async function fetchData(inputPageNumber){
        await api().get(`/art?page=${inputPageNumber}&size=12`)
          .then(res=>{
              const data = res.data
              props.setDisplayArt(data.data)
              props.setPageArts({page:inputPageNumber,data:data.data})
              // setSuccessOpen(true)
              // setSuccessMessage(data.message)
              // setTimeout(()=>{
              //     setSuccessOpen(false)
              // },1500)                
          })
          .catch(err=>{
            if(
              err && 
              err.response &&
              err.response.data && 
              err.response.data.message  
            ){
                setFailureMessage(err.response.data.message)
            }else{
                setFailureMessage('An error occured')
            }
            setFailureOpen(true)
            setTimeout(()=>{
                setFailureOpen(false)
            },3000)
          })
    }
    useEffect( ()=>{
        
            setPageNumber(1)
            fetchData(1);
            // props.setDisplayArt(props.pageArts["1"])
            // console.log("props.pageArts",props.pageArts)
            // console.log("will not fetch")
        
        // console.log("props.pageArts",props.pageArts)
        return () => {
            // alert('text')
            props.setLoaderFlag(false)
            console.log("in calllll")
            // props.clearSessionStorage()
        }
    },[]) 
    const handleSeeDetailsClick = (clickedRow)=>{
        setChosenRow(clickedRow)
        setShowImageDialog(true)
    }
    const pageNumberClicked = async (clickValue,clickEvent) =>{
      setPageNumber(clickValue)
      // console.log("clickEvent, clickValue",clickEvent, clickValue)
      await fetchData(clickValue)
    }
    const imageGuard=(inputImage)=>{
      if(
        // inputImage.includes(".png")||inputImage.includes(".jpeg")
        inputImage.match(/\.(jpeg|jpg|gif|png)$/) != null 
        ){
        return inputImage
      }else{
        return "https://via.placeholder.com/500"
      }
    }
    return (
        <div>
        <div className="row">
            <div className="column small-12" style={{color:'black',fontWeight:'600',marginBottom:'25px',fontSize:'30px'}}>
                Gallery
            </div>

            {props.displayArts.map((artObject,index)=>{
                return (
                    <div className="column small-3" style={{marginBottom:'40px'}} key={artObject._id} >
                        <div className={classes.cardContainer} onClick={()=>{handleSeeDetailsClick(artObject)}} >
                            <div className={classes.imageWrapper} style={{backgroundImage:"url(" + imageGuard(artObject.picture) + ")"}}></div>
                            <div className={classes.artistName}>{artObject.artist}</div>
                        </div>
                    </div>
                )
            })}
            <div className="column small-12">
              <div class="row align-center">
                <div className="column shrink">
                  <Pagination onChange={(event, value)=>{pageNumberClicked((event, value))}}  count={10} variant="outlined" shape="rounded" />
                </div>
              </div>
            </div>
            <Dialog
                open={showImageDialog}
                BackdropProps={{
                classes: {
                    root: classes.backDrop,
                },
                }}
                onClose={() => {}}
            >     
            {chosenRow?
                    <div className={classes.singleImageContainer}>
                    <div 
                        className={classes.singleImageWrapper}
                        style={{backgroundImage:"url(" + imageGuard(chosenRow.picture) + ")"}}
                    ></div>
                    <div className={classes.artistTitle}>{chosenRow.artist}</div>
                    <div className={classes.artDesc}>{chosenRow.description}</div>
                    <div onClick={()=>{setShowImageDialog(false)}} className={classes.closeIcon}></div>
                    </div>
                :""}
                
            </Dialog>

        </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user_info:state.session.user_info,
      displayArts:state.art.displayArts,
      pageArts:state.art.pageArts
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        setDisplayArt: (value) => dispatch(setDisplayArt(value)),
        setPageArts:(value)=>dispatch(setPageArts(value)),
        setLoaderFlag:(v)=>dispatch(setLoaderFlag(v))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GuestGallery);
