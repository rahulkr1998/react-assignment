import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';

export default function Dashboard() {

  const navigate=useNavigate();
  const goToDashBoard=()=>{
    navigate('/')
  }

    // function handleAdminLogin(){
    //     console.log("admin login");
    // }
    // function handleVendorLogin(){
    //     console.log("vendor login");
    // }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          onClick={goToDashBoard}
          >
           Login Dashboard
          </Typography>
         
          
        </Toolbar>
      </AppBar>
      {/* <Link to="/adminlogin">
          <Button color="inherit" onClick={handleAdminLogin}>Admin</Button>
          </Link>
          <Link to="/vendorlogin">
          <Button color="inherit" onClick={handleVendorLogin}>Vendor</Button>
          </Link> */}
    </Box>
  );
}