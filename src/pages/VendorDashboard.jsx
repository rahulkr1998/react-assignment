import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Dashboard from './Dashboard';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function VendorDashboard() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [category,setCategory]=useState("");
  const [description,setDescription]=useState("");
  const [isActiveUser,setIsActiveUser]=useState(false);
  // const [status,setStatus]=useState(false);

  const {vendorId} =useParams();
  console.log(vendorId);

  const fetchData = async (vendorId) => {
    try {
      const response = await fetch(`http://localhost:8000/vendors?id=${vendorId}`);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      // Process the fetched data
      const userData=data[0];
      setIsActiveUser(userData.isActive);
      console.log('Fetched data:', userData.name);
      // You can perform operations with the data here

      setData(userData); // Store fetched data in state
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Handle errors here as needed
    }
  };

  useEffect(() => {
    fetchData(vendorId); // Fetch data when the component mounts
  }, []); // Empty dependency array to run only on mount

  const handleCategoryChange=(e)=>{
    setCategory(e.target.value)
  }

  const handleDescriptionChange=(e)=>{
    setDescription(e.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
  
    try {
      const response = await fetch(`http://localhost:8000/vendors/${vendorId}`, {
        method: 'PATCH', // Assuming you use PUT method to update the vendor details
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: category,
          description: description,
          // Add any other fields you need to update
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update vendor details');
        
      }
      alert("Details updated sucessfully");
      // Assuming the API returns updated data, you can handle it accordingly
      const updatedData = await response.json();
      // console.log('Updated vendor data:', updatedData);
  
      // Handle success, maybe show a success message to the user
    } catch (error) {
      alert('There was a problem updating vendor details:');
      // Handle errors here as needed
    }
  };
  
  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const mainwrp = {
    maxWidth: "70%",
    margin: "50px auto"
    };

    const sorryDiv = {
      maxWidth: "70%",
      margin: "50px auto",
      textAlign: "center",
      fontWeight: "700"
      };

  if (isActiveUser === false) {
    return <>
    <Dashboard/>
    <div style={sorryDiv}>Sorry Your status is inActive, Contact Admin !</div>;
    </> // You can replace this with your preferred loading indicator
  }

  return (
    <>
    
    <Dashboard/>
    <div style={mainwrp}>
    <Div>{`Welcome ${data.name}, You can update your details`}</Div>
   <Box sx={{ minWidth: 80 }} onSubmit={handleSubmit}>
      <FormControl fullWidth>
      
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={"Grocery"}>Grocery</MenuItem>
          <MenuItem value={"Cosmetics"}>Cosmetics</MenuItem>
          <MenuItem value={"Electronics"}>Electronics</MenuItem>
        </Select>
        <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
              onChange={handleDescriptionChange}
            />
      </FormControl>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleDescriptionChange}/> */}
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
    </Box>
    </div>
    </>
 
  );
}