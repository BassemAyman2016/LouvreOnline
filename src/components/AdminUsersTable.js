import React, {useEffect,useState} from 'react'
import { connect } from "react-redux"
// import  {setDisplayArt,setPageArts,clearArts,setSingleArt} from "../redux/actions/art.actions"
import {setLoaderFlag} from "../redux/actions/loader.actions"
import { withStyles, makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiAlert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import Snackbar from '@material-ui/core/Snackbar';

import api from "../api/api.js"
import {setDisplayUsers, setPageUsers, clearUsers } from "../redux/actions/user.actions.js"
// setDisplayUsers: (value) => dispatch(setDisplayUsers(value)),
//         setPageUsers:(value)=>dispatch(setPageUsers(value)),
//         clearUsers:()=>dispatch(clearUsers()

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#F7F7FC',
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
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      cursor:'pointer' 
    }
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AdminUsersTable = (props) => {
    const classes = useStyles();
    // const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    // const [successMessage,setSuccessMessage]=useState('');
    const [failureMessage,setFailureMessage]=useState('');
    const [pageNumber, setPageNumber] = useState(1)
    async function fetchData(inputPageNumber){
        await api().get(`/users?page=${inputPageNumber}&size=5`)
          .then(res=>{
              const responseData = res.data
              props.setDisplayUsers(responseData.data)
              props.setPageUsers({page:inputPageNumber,data:responseData.data})      
                   
          })
          .catch(err=>{
            console.log("err",err)
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
          props.setLoaderFlag(false)
          // alert('text')
          // props.setLoaderFlag(false)
          // console.log("in calllll")
          // props.clearSessionStorage()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 
    
    const pageNumberClicked = async (clickValue,clickEvent) =>{
      setPageNumber(clickValue)
      // console.log("clickEvent, clickValue",clickEvent, clickValue)
      await fetchData(clickValue)
    }
    return (
        <div>
            <Typography variant="h6" noWrap style={{color:'black',fontWeight:'600',marginBottom:'15px'}}>
              Users
            </Typography>
            <TableContainer style={{padding:'25px 15px'}} component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell style={{width:'10%', fontWeight:'bold'}}>ID</StyledTableCell>
                    <StyledTableCell style={{width:'30%', fontWeight:'bold'}}>Username</StyledTableCell>
                    <StyledTableCell style={{width:'60' , fontWeight:'bold'}}>Phone Number</StyledTableCell>
                    {/* <StyledTableCell style={{width:'40%'}}>Description</StyledTableCell>
                    <StyledTableCell style={{width:'10%'}}>Action</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.displayUsers.map((userObject,index) => (
                  <StyledTableRow key={userObject._id}>
                      
                      <td style={{height:'100%'}} >
                        <div style={{height:'100%',display:'inline'}}>
                        {((pageNumber-1)*5+index)<9?<span>0</span>:""}
                        
                        {(pageNumber-1)*5+index+1}</div>
                      </td>
                      <td style={{height:'100%'}} >
                        <div style={{height:'100%',display:'inline'}}>{userObject.user_name}</div>
                      </td>
                      <td style={{height:'100%'}} >
                        <div style={{height:'100%',display:'inline'}}>{userObject.phone_number}</div>
                      </td>
                      
                      
                        {/* {artObject.description} */}
                      
                  </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <div class="row align-center">
                <div className="column shrink">
                  <Pagination onChange={(event, value)=>{pageNumberClicked((event, value))}}  count={10} variant="outlined" shape="rounded" />
                </div>
              </div>
              
            </TableContainer>
            {/* <Snackbar open={successOpen} autoHideDuration={6000} >
                <Alert severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>   */}
            <Snackbar open={failureOpen} autoHideDuration={6000} >
                <Alert severity="error">
                    {failureMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user_info:state.session.user_info,
      displayUsers:state.user.displayUsers,
      pageArts:state.art.pageArts,
      user:state.user
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        setDisplayUsers: (value) => dispatch(setDisplayUsers(value)),
        setPageUsers:(value)=>dispatch(setPageUsers(value)),
        clearUsers:()=>dispatch(clearUsers()),
        setLoaderFlag:(value)=>{dispatch(setLoaderFlag(value))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersTable)
