import React, { useState, useEffect  } from 'react';
import { Table, Pagination } from 'react-bootstrap'; // Import Bootstrap Table and Pagination
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import { useLocation } from "react-router-dom";

import { adminService } from "../../services/admin.service";
import Results from "./Results";


// ListView component to display search results with pagination
const ListView = ({ data, isLoading, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  if (isLoading) {
    return <div><h4>Loading...</h4></div>; // Render loading animation
  }
  
  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice data array based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleRowClick = (id) => {
    // Handle row click event here, e.g., navigate to details page
    console.log(`Clicked on row with id ${id}`);
    toast(`Clicked on row with id ${id}`);
  };

   const handleViewClick = (id) => {
    // Handle view button click event here
    console.log(`View button clicked for row with id ${id}`);
    toast(`Clicked on View button with id ${id}`);
  };

  return (
    <div className="list-view">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((result, index) => (
            <tr key={result._id} onClick={() => handleRowClick(index+1)} style={{ cursor: 'pointer' }}>
              <td>{index + 1}</td>
              <td>{result.firstName+" "+result.firstName}</td>
              <td>{result.designation}</td>
              <td>
                {/* Add View button for each row */}
                <Button variant="primary" onClick={() => handleViewClick(index+1)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {/* Render pagination buttons */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
          <Pagination.Item
            key={page}
            active={currentPage === page}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};
const itemsPerPage = 10; // Number of items to display per page


function App() {
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    // event.preventDefault();
    setIsLoading(true)
    adminService
    .userList()
    .then((response) => {
      if (!response.code==401) {
        toast("Unable to fetch data!",response.message);      
        return null
      }       
      setIsLoading(false)
      setData(response);
      console.log("data ", data);
    })
    .catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsLoading(false)
    })
  },[]);
  const handleSubmit = async (event) => {
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  return (
    <div className="App">     
      {<ListView data={data}
      itemsPerPage={itemsPerPage}
      onPageChange={handlePageChange}
      isLoading={isLoading} />}
    </div>
  );
}

export default App;
