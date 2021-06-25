import React, {useEffect,useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import api from "../api/api.js"
import  {clearSessionStorage} from "../redux/actions/session.actions"
import  {setDisplayArt,setPageArts,clearArts,setSingleArt} from "../redux/actions/art.actions"
import { connect } from "react-redux"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Dialog, DialogContent, Theme, DialogTitle,DialogContentText,DialogActions } from "@material-ui/core";
import CloseImage from '../assets/close.png'
import Button from '@material-ui/core/Button';
import Pagination from '@material-ui/lab/Pagination';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#fafafa',
    color: 'black',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'white',
    },
    borderBottom:'0.5px solid #fafafa'
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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
    backgroundRepeat: 'no-repeat'
    // backgroundColor:'red'
  },
  artistTitle:{
    color:'blue',
    padding:'10px 15px'
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
  }
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AdminArtsTable = (props)=> {
  const [successOpen, setSuccessOpen] = useState(false);
  const [failureOpen, setFailureOpen] = useState(false);
  const [successMessage,setSuccessMessage]=useState('');
  const [failureMessage,setFailureMessage]=useState('');
  const classes = useStyles();
  const [showImageDialog,setShowImageDialog] = useState(false)
  const [chosenRow,setChosenRow] = useState(null)
  const [showDeleteDialog,setShowDeleteDialog]= useState(false)
  // const []
  async function fetchData(){
    await api().get(`/art?page=1&size=10`)
      .then(res=>{
          const data = res.data
          props.setDisplayArt(data.data)
          props.setPageArts({page:1,data:data.data})
          setSuccessOpen(true)
          setSuccessMessage(data.message)
          setTimeout(()=>{
              setSuccessOpen(false)
          },1500)                
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
        
        if(!props.pageArts[1]){
            fetchData();
        }else{
            props.setDisplayArt(props.pageArts["1"])
            // console.log("props.pageArts",props.pageArts)
            // console.log("will not fetch")
        }
        // console.log("props.pageArts",props.pageArts)
        
    
  },[])  
  const handleSeeDetailsClick = (clickedRow)=>{
    setChosenRow(clickedRow)
    setShowImageDialog(true)
  }
  const handleCloseDeleteDialog = ()=>{
    setShowDeleteDialog(false)
  }
  const deleteButtonClicked = (obj)=>{
    setChosenRow(obj)
    setShowDeleteDialog(true)
  }
  const deleteDialogHandler = async (chosenValue) => {
    if(chosenValue===2){
      setShowDeleteDialog(false)
      setChosenRow(null)
    }
    if(chosenValue===1){
      await api().delete(`/art?id=${chosenRow._id}`)
      .then(async (res)=>{
          const data = res.data
          // props.setDisplayArt(data.data)
          // props.setPageArts({page:1,data:data.data})
          setSuccessOpen(true)
          setSuccessMessage(data.message)
          setTimeout(()=>{
              setSuccessOpen(false)
          },1500)
          setShowDeleteDialog(false)
          setChosenRow(null)   
          await fetchData()             
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
  }
  return (
    <div>
        <Typography variant="h6" noWrap style={{color:'black',fontWeight:'600',marginBottom:'15px'}}>
            Art Pieces
          </Typography>
        <TableContainer style={{padding:'25px 15px'}} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{width:'10%'}}>Item</StyledTableCell>
                <StyledTableCell style={{width:'20%'}}>Name</StyledTableCell>
                <StyledTableCell style={{width:'20'}}>Artist</StyledTableCell>
                <StyledTableCell style={{width:'40%'}}>Description</StyledTableCell>
                <StyledTableCell style={{width:'10%'}}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {props.displayArts.map((artObject) => (
            <StyledTableRow key={artObject._id}>
                <td component="th" scope="artObject">
                  {/* {artObject.picture} */}
                  <div className={classes.imageContainer} style={{backgroundImage:"url(" + artObject.picture + ")"}}></div>
                </td>
                <td style={{height:'100%'}} >
                  <div style={{height:'100%',display:'inline'}}>{artObject.name}</div>
                  {/* {artObject.name} */}
                </td>
                <td align="left">
                {artObject.artist}</td>
                <td >
                {artObject.description.length > 150 ?
                `${artObject.description.substring(0, 150)}...` : artObject.description}
                {/* <br /> */}
                <div  style={{marginTop:'5px'}}>
                  <span 
                  className={classes.seeDetails} 
                  onClick={()=>{
                    handleSeeDetailsClick(artObject)}}>See Details</span>
                  </div>
                  {/* {artObject.description} */}
                </td>
                <td >
                  <div className={classes.deleteButton} 
                  onClick={()=>{deleteButtonClicked(artObject)}}>
                    Delete
                  </div>
                </td>
            </StyledTableRow>
            ))}
          </TableBody>
          </Table>
          <div class="row align-center">
            <div className="column shrink">
              <Pagination onClick={(value)=>{console.log(value)}} count={10} variant="outlined" shape="rounded" />
            </div>
          </div>
          
        </TableContainer>
      <Snackbar open={successOpen} autoHideDuration={6000} >
          <Alert severity="success">
              {successMessage}
          </Alert>
      </Snackbar>  
      <Snackbar open={failureOpen} autoHideDuration={6000} >
          <Alert severity="error">
              {failureMessage}
          </Alert>
      </Snackbar> 
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
                style={{backgroundImage:"url(" + chosenRow.picture + ")"}}
              ></div>
              <div className={classes.artistTitle}>{chosenRow.artist}</div>
              <div className={classes.artDesc}>{chosenRow.description}</div>
              <div onClick={()=>{setShowImageDialog(false)}} className={classes.closeIcon}></div>
            </div>
        :""}
        
      </Dialog>
      <Dialog
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      {chosenRow?
        <DialogTitle id="alert-dialog-title1">{`Are you sure you want to delete ${chosenRow.name} ?`}</DialogTitle>:""}
        <DialogActions>
          <Button onClick={()=>{deleteDialogHandler(1)}} color="primary">
            Delete
          </Button>
          <Button onClick={()=>{deleteDialogHandler(2)}} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>

  );
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
        // setSingleArt:(value)=>{dispatch}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminArtsTable);
