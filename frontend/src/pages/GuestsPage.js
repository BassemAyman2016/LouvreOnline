import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GuestGallery from "../components/GuestGallery"
import { useHistory } from 'react-router';
import { connect } from "react-redux"
import {clearSessionStorage} from "../redux/actions/session.actions"
import { clearArts } from '../redux/actions/art.actions';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor:'white'
    },
    appBarShift: {
     transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    imageIcon: {
      height: '100%'
    },
    iconRoot: {
      textAlign: 'center'
    }
}));

const GuestsPage = (props) => {
    const history = useHistory();
    const classes = useStyles();
    // const theme = useTheme();
    const open = false;

    const handleLogout = () =>{
        props.clearSessionStorage()
        props.clearArts()
        sessionStorage.clear()
        history.push('/')
      }
    return (
        <div>
            <CssBaseline />
            <AppBar  position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap style={{color:'black',fontWeight:'600'}}>
                        Louvre
                    </Typography>
                    <div className={classes.content} />
                    <Typography  noWrap style={{color:'black', cursor:'pointer'}} title="Logout" onClick={()=>handleLogout()}>
                        <span style={{fontWeight:'bold',fontSize:'16px'}}>{props.user_info.user_name}</span>
                        <br />
                        <span style={{fontSize:'11px'}}>Guest</span>
                    </Typography>
                </Toolbar>
            </AppBar>
      
            <main className={classes.content}>
        <div className={classes.toolbar} />
        <GuestGallery/>
      </main>
        </div>
    )
}
const mapStateToProps = state => {
    return {
      user_info:state.session.user_info
    }
  }
  
const mapDispatchToProps = dispatch => {
  return {
    clearSessionStorage: () => dispatch(clearSessionStorage()),
    clearArts: () => dispatch(clearArts())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(GuestsPage)
// export default GuestsPage
