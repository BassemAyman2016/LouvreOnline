
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
import RegisterPage from "./pages/RegisterPage"
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
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
  const classes = useStyles();
  const flag = false
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
      
      {/* <div>Count: {props.count}</div>

      <button onClick={() => props.increaseCounter()}>Increase Count</button>

      <button onClick={() => props.decreaseCounter()}>Decrease Count</button> */}
      <Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/guests">
            <GuestsPage />
          </Route>
          <Route path="/admins">
            <AdminsPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    displayFlag: state.loader.displayLoader,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCounter: () => dispatch(increaseCounter()),

    decreaseCounter: () => dispatch(decreaseCounter()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)