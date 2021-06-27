import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import BackImage from "../assets/bg.png";
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux"
import {setLoaderFlag} from "../redux/actions/loader.actions"
import api from "../api/api"
import {setToken, setUserInfo} from "../redux/actions/session.actions"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// import {useState} from "React"
const useStyles = makeStyles({      
    'login-container':{
        width:'100vw',
        height:'100vh',
        // backgroundColor:'lightblue',
        backgroundImage: `url(${BackImage})`,
        position:'relative',
        backgroundSize:'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition:'center'
    },
    root: {
        position:'absolute',
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
        width:'75vh'
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
    },
    registerLink:{
        color:'#5C33F6',
        textDecoration:'underline',
        '&:hover':{
            color:'blue',
            cursor:'pointer',
        }
    }
});

//   <button onClick={()=>{history.push("/admins");}}>Go To Admins</button>
//   <button onClick={()=>{history.push("/guests");}}>Go To Guests</button>
const mapStateToProps = state => {
    return {
      displayFlag: state.loader.displayLoader,
      token:state.session.token,
    //   user_info:state.session.user_info
    }
  }
const mapDispatchToProps = dispatch => {
return {
    setLoaderFlag: v => dispatch(setLoaderFlag(v)),
    setToken: v =>{ return dispatch(setToken(v))},
    setUserInfo: v => dispatch(setUserInfo(v))
    // decreaseCounter: () => dispatch(decreaseCounter()),
}
}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const RegisterPage = (props) => {
    
    const history = useHistory();
    const classes = useStyles();
    const [userNameField,setUserName] = useState('')
    const [passwordField,setPassword] = useState('')
    const [repeatedPasswordField,setRepeatedPassword] = useState('')
    const [phoneNumber,setphoneNumber] = useState('')
    const [userRole,setUserRole] = useState('')
    const [successOpen, setSuccessOpen] = useState(false);
    const [failureOpen, setFailureOpen] = useState(false);
    const [failureMessage,setFailureMessage]=useState('');
    // return ;
    const signupClicked = async () => {
        if(userNameField!==''&& passwordField!=='' && repeatedPasswordField!=='' && phoneNumber!=='' && userRole!==''){
            if(passwordField===repeatedPasswordField){
                if(userRole==='ADMIN'||userRole==='GUEST'){
                    await api().post('/user',
                    {
                        user_name:userNameField,
                        password:passwordField,
                        user_role: userRole,
                        phone_number: phoneNumber
                    })
                    .then(res=>{
                        console.log("res",res)
                        // props.setToken(data.token)
                        // sessionStorage.setItem("accessToken", data.token);
                        // props.setUserInfo(data.info)
                        setSuccessOpen(true)
                        // const userRole = data.info.type
                        setTimeout(()=>{
                            setSuccessOpen(false)
                            reroute()
                            // switch(userRole){
                            //     case "ADMIN": history.push('/admins');break;
                            //     case "GUEST": history.push('/guests');break;
                            //     default: ;
                            // }
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
                }else{
                    let returnMessage = "Invalid user type"
                    setFailureMessage(returnMessage)
                    setFailureOpen(true)
                    setTimeout(()=>{
                        setFailureOpen(false)
                    },1500)
                    }
                    
            }else{
                let returnMessage = "Password and repeated password don't match"
                setFailureMessage(returnMessage)
                setFailureOpen(true)
                setTimeout(()=>{
                    setFailureOpen(false)
                },1500)
            }
        }else{
            let returnMessage = 'Fields missing'
            if(userNameField==='') returnMessage = 'User name not entered';
            if(passwordField==='') returnMessage = 'Password not entered';
            if(repeatedPasswordField==='') returnMessage = 'Repeated password not entered';
            if(phoneNumber==='') returnMessage = 'Phone number not entered';
            if(userRole==='') returnMessage = 'User role not entered';
            setFailureMessage(returnMessage)
            setFailureOpen(true)
            setTimeout(()=>{
                setFailureOpen(false)
            },1500)
        }
        
    }
    const onKeyHandler = async (e)=>{
        if(e.code==='Enter')
            await signupClicked()
    }
    const reroute = () =>{
        history.push('/')
    }
    return (
        <div className={classes['login-container']}>
            <Card className={classes.root}>
                <div className={` row align-center ${classes['title-area']}`}>
                    <div className="column small-6">
                    <div className="row align-center" style={{position:'relative'}}>
                        <div className="column small-12" style={{textAlign:'center',padding:'20px'}}>Register</div>
                        <div className={`column small-12 ${classes.borderBottom}`}></div>
                    </div>
                        
                    </div>
                </div>                
                <Divider variant="middle" />
                <div className="row" style={{margin:'10px 50px 20px 50px'}}>
                    <div className="column small-12">
                        <div className="row expanded" >
                            <div className="column small-12" style={{fontWeight:'bold'}}>
                                Username
                            </div>
                            <div className="column small-12" style={{}}>
                                <TextField onChange={e => setUserName(e.target.value)} fullWidth id="outlined-basic" placeholder="input your username in here" variant="outlined" />
                            </div>
                            <div className="column small-12" style={{fontWeight:'bold'}}>
                                Password
                            </div>
                            <div className="column small-12">
                                <TextField  onChange={e => setPassword(e.target.value)} fullWidth id="outlined-basic" type="password" placeholder="input your password in here" variant="outlined" />
                            </div>
                            <div className="column small-12" style={{fontWeight:'bold'}}>
                                Repeat Password
                            </div>
                            <div className="column small-12">
                                <TextField  onChange={e => setRepeatedPassword(e.target.value)} fullWidth id="outlined-basic" type="password" placeholder="input your password in here" variant="outlined" />
                            </div>
                            <div className="column small-12" style={{fontWeight:'bold'}}>
                                Phone Number
                            </div>
                            <div className="column small-12">
                                <TextField  onChange={e => setphoneNumber(e.target.value)} fullWidth id="outlined-basic"  placeholder="input your password in here" variant="outlined" />
                            </div>
                            <div className="column small-12" style={{fontWeight:'bold'}}>
                                Type ("ADMIN" or "GUEST")
                            </div>
                            <div className="column small-12">
                                <TextField onKeyUp={e=>{onKeyHandler(e)}} onChange={e => setUserRole(e.target.value)} fullWidth id="outlined-basic"  placeholder="input your password in here" variant="outlined" />
                            </div>
                        </div>
                    </div>
                    
                </div>
                
                <div className="row " style={{margin:'30px 50px 50px 50px'}} >
                    <div className="column small-12">
                        <button onClick={()=>{signupClicked()}} className={classes.buttonStyle}>Signup</button>
                    </div>
                </div>
            </Card>  
            <Snackbar open={successOpen} autoHideDuration={6000} >
                <Alert severity="success">
                    Signup successful !! Please login
                </Alert>
            </Snackbar>  
            <Snackbar open={failureOpen} autoHideDuration={6000} >
                <Alert severity="error">
                    {failureMessage}
                </Alert>
            </Snackbar>         
        </div>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
