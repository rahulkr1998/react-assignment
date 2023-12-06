
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dashboard from './Dashboard';
import { useEffect,useState } from 'react';

export default function AdminDashboard() {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const [status,setStatus]=useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/vendors');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);



  if (data === null) {
    return <p>Loading...</p>; // You can replace this with your preferred loading indicator
  }

  // If there's an error, display the error message
  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleStatus=
    async (userId, currentStatus) => {
      try {
        const response = await fetch(`http://localhost:8000/vendors/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isActive: !currentStatus }),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
          
        }
       // Refresh data after status change
      const updatedUser = await response.json();
      console.log('Updated user:', updatedUser);

      // Refetch data to update the table
      const refreshedData = await (await fetch('http://localhost:8000/vendors')).json();
      setData(refreshedData);
    } catch (error) {
      alert('Error toggling isActive:', error);
    }
  
    };
  
  return (
    <>
    <Dashboard/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Description</TableCell>
            {/* <TableCell align="right">Edit Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow
              key={data.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => handleStatus(data.id,data.isActive)}
            >
              <TableCell component="th" scope="row">{data.name}</TableCell>
              <TableCell align="right">{data.id}</TableCell>
              <TableCell align="right">{data.category}</TableCell>
              <TableCell align="right">
                  {data.isActive ? (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Active
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      InActive
                    </Button>
                  )}
              </TableCell>
              <TableCell align="right">{data.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}