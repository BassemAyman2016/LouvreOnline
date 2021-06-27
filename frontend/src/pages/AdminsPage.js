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
import PublishIcon from '@material-ui/icons/Publish';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as ArtUnselected } from "../assets/artSel.svg";
import { ReactComponent as ArtSelected } from "../assets/artUnsel.svg";
import { ReactComponent as UserSelected } from "../assets/user4.svg";
import { ReactComponent as UserUnselected } from "../assets/user2.svg";
import AdminArtsTable from '../components/AdminArtsTable';
import AdminUsersTable from '../components/AdminUsersTable';
import { useHistory } from 'react-router';
import { clearUsers } from '../redux/actions/user.actions';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArtAddComponent from '../components/ArtAddComponent';
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
      iconKey:'art',
    },
    {
      selected:false,
      iconKey:'user',
    },
    {
      selected:false,
      iconKey:'upload',
    }
    
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
    switch(clickedIndex){
      case 0:setSelectedDisplay('art');break;
      case 1:setSelectedDisplay('user');break;
      case 2:setSelectedDisplay('upload');break;
      default:setSelectedDisplay('art');break;
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
  const getDisplayComponent = (displayLabel) =>{
    switch(displayLabel){
      case 'art': return (<AdminArtsTable/>) ; 
      case 'user': return (<AdminUsersTable/>); 
      case 'upload' : return (<ArtAddComponent/>); 
      default: return (<AdminArtsTable/>); 
    }
  }
  const getIconComponent = (iconObject,currentIndex) =>{
    switch(currentIndex){
        case 0: 
          return (<SvgIcon>
                    {iconObject.selected?<ArtSelected />:<ArtUnselected />}
                  </SvgIcon>)
        case 1:
          return (<SvgIcon>
                  {iconObject.selected?<UserSelected />:<UserUnselected />}
                </SvgIcon>)
        case 2:
          return  (<ListItemIcon> <PublishIcon style={{color:iconObject.selected?'white':''}} /> </ListItemIcon>)
        default:
          return (<SvgIcon>
                    {iconObject.selected?<ArtSelected />:<ArtUnselected />}
                  </SvgIcon>)
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
            <ListItem style={{backgroundColor:singleObject.selected?'#5C33F6':''}} button onClick={()=>{iconCLicked(index)}}  key={singleObject.iconKey}>
              {getIconComponent(singleObject, index)}
            </ListItem>     
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* {selectedDisplay==='art'?
        <AdminArtsTable/>:
        <AdminUsersTable/>
        } */}
          {getDisplayComponent(selectedDisplay)}
          
      </main>
    </div>
  );
}


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