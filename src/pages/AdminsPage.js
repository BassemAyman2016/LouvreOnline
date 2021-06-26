import React, {useState} from 'react'
import  {clearSessionStorage} from "../redux/actions/session.actions"
import { clearArts} from "../redux/actions/art.actions"
import { connect } from "react-redux"
// import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
// import PublishIcon from '@material-ui/icons/Publish';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as ArtUnselected } from "../assets/artSel.svg";
import { ReactComponent as ArtSelected } from "../assets/artUnsel.svg";
import { ReactComponent as UserSelected } from "../assets/user4.svg";
import { ReactComponent as UserUnselected } from "../assets/user2.svg";
import AdminArtsTable from '../components/AdminArtsTable';
import AdminUsersTable from '../components/AdminUsersTable';
import { useHistory } from 'react-router';
import { clearUsers } from '../redux/actions/user.actions';
const drawerWidth = 240;

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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
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

const AdminsPage = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [sideBarIcons,setSideBarIcons] = useState([
    {
      selected:true,
      selectedIcon:'art2',
      unSelectedIcon:'art2'
    },
    {
      selected:false,
      selectedIcon:'user2',
      unSelectedIcon:'user2'
    },
    
  ])
  const [selectedDisplay,setSelectedDisplay]=useState('art')
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const iconCLicked = (clickedIndex)=>{
    let newArray = sideBarIcons.map((icon,index)=>{
      if(clickedIndex===index){
        icon.selected=true;
      }else{
        icon.selected=false;
      }
      return icon
    })
    if(clickedIndex===0){
      setSelectedDisplay('art')
    }else{
      setSelectedDisplay('user')
    }
    setSideBarIcons(newArray)
  }
  const handleLogout = () =>{
    props.clearSessionStorage()
    props.clearArts()
    props.clearUsers()
    sessionStorage.clear()
    history.push('/')
  }
  const getIconComponent = (currentIndex) =>{
    switch(currentIndex){
      case 0:break;
      case 1:break;
      case 2:break;
      default:break;
    }
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
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
            <span style={{fontWeight:'bold',fontSize:'16px'}}>{props.user_info&&props.user_info.user_name?props.user_info.user_name:''}</span>
            <br />
            <span style={{fontSize:'11px'}}>Admin</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List disablePadding="true">
          {sideBarIcons.map((singleObject, index) => (
            <ListItem style={{backgroundColor:singleObject.selected?'#5C33F6':''}} button onClick={()=>{iconCLicked(index)}}  key={singleObject.selectedIcon}>
            {index===0? 
              <SvgIcon>
                {singleObject.selected?<ArtSelected />:<ArtUnselected />}
              </SvgIcon>
            :<SvgIcon>
                {singleObject.selected?<UserSelected />:<UserUnselected />}
              </SvgIcon>
            
            }
            </ListItem>     
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {selectedDisplay==='art'?
        <AdminArtsTable/>:
        <AdminUsersTable/>
        }
          
      </main>
    </div>
  );
}

// const AdminsPage = (props) => {
//     useEffect(() => {
//         console.log("tokennn",props.token)
//         console.log("user_info",props.user_info)
//         // returned function will be called on component unmount 
//         return () => {
//           alert('text')
//           props.clearSessionStorage()
//         }
//       }, [])
//     return (
//         <div>
//             AdminsPage
//         </div>
//     )
// }
const mapStateToProps = state => {
    return {
      user_info:state.session.user_info
    }
  }
  
const mapDispatchToProps = dispatch => {
  return {
    clearSessionStorage: () => dispatch(clearSessionStorage()),
    clearArts: () => dispatch(clearArts()),
    clearUsers:()=>dispatch(clearUsers())
  }
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(AdminsPage)
  // export default AdminsPage