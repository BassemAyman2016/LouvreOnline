
import React from "react"
import "./App.css"
import { connect } from "react-redux"
import {
  increaseCounter,
  decreaseCounter,
} from "./redux/actions/counter.actions"
import LoginPage from "./pages/LoginPage"
import AdminsPage from "./pages/AdminsPage"
import GuestsPage from "./pages/GuestsPage"
// import RegisterPage from "./pages/RegisterPage"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { clearSessionStorage} from "./redux/actions/session.actions"
import {
  BrowserRouter as Router,
  Route  
  // Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import RegisterPage from "./pages/RegisterPage"

const useStyles = makeStyles({ 
  'spinner-container':{
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#707070',
    opacity: '0.5',
    zIndex: '20',
    position: 'fixed',
    right: 0,
    bottom: 0,
    margin: 0,
  },
  spinner:{
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    opacity:'2'
  }
})
function App(props) {

  // useEffect(() => {
  //   // returned function will be called on component unmount 
  //   return () => {
  //     // alert('text')
  //     // props.clearSessionStorage()
  //   }
  // }, [])
  const getComponent = (selectedRoute) =>{
    const isLogged = sessionStorage.getItem("accessToken")
    const userType = props.user_info&&props.user_info.type?props.user_info.type:null
    //RegisterPage
    switch(selectedRoute){
      case "/":
        if(isLogged){
          if(userType==="ADMIN"){
            return <Redirect to="/admins"/>
          }else{
            return <Redirect to="/guests"/>
          }
        }else{
          return <LoginPage/>
        }
      // break;
      case "/guests":
        if(isLogged){
          if(userType==="ADMIN"){
            return <Redirect to="/admins"/>
          }else{
            return <GuestsPage/>
          }
        }else{
          return <Redirect to="/"/>
        }
      // break;
      case "/admins":
        if(isLogged){
          if(userType==="ADMIN"){
            return <AdminsPage/>
          }else{
            return <Redirect to="/guests"/>
          }
        }else{
          return <Redirect to="/"/>
        }
      // break;
      case "/register":
        if(isLogged){
          if(userType==="ADMIN"){
            return <Redirect to="/admins"/>
          }else{
            return <Redirect to="/guests"/>
          }
        }else{  
          return <RegisterPage/>
        }
      default: return <LoginPage/>
    }
  }
  const classes = useStyles();
  return (
    <div className="App">
      
      {props.displayFlag?<div
        className={classes["spinner-container"]}
        
      >
        <div className={classes.spinner}>
          <CircularProgress  />
        </div>
      </div>:
      ""
      }
      <Router>
				<Route exact path="/" render={() => getComponent('/')} />
				<Route exact path="/guests" render={() => getComponent('/guests')} />
				<Route exact path="/admins" render={() => getComponent('/admins')} />
				<Route exact path="/register" render={() => getComponent('/register')} />
			</Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <Switch>
          <Route path="/guests">
            <GuestsPage />
          </Route>
          <Route path="/admins">
            <AdminsPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch> */}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    displayFlag: state.loader.displayLoader,
    token:state.session.token,
    user_info:state.session.user_info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
    clearSessionStorage: () => dispatch(clearSessionStorage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)