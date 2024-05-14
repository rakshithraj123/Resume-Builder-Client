import React, { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap'; // Import Bootstrap Table and Pagination
import { toast } from "react-toastify";
import Button from 'react-bootstrap/Button';


// ListView component to display search results with pagination
const ListView = ({ data, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

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
            <th>Phone No</th>
            <th>Designation</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(result => (
            <tr key={result.id} onClick={() => handleRowClick(result.id)} style={{ cursor: 'pointer' }}>
              <td>{result.name}</td>
              <td>{result.phoneno}</td>
              <td>{result.designation}</td>
              <td>{result.resume}</td>
              <td>
                {/* Add View button for each row */}
                <Button variant="primary" onClick={() => handleViewClick(result.id)}>View</Button>
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

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    { id: 1, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 2, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 3, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 4, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 5, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 6, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 7, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 8, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 9, name: 'kumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 10, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 11, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 12, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 13, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 14, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 15, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 16, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 17, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 18, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 19, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 20, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 21, name: 'ram', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 22, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 23, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    { id: 24, name: 'Shivakumar', phoneno: '9738950886',designation: 'software engineer',resume: 'abcd' },
    // Add more data objects as needed
  ];

  const itemsPerPage = 10; // Number of items to display per page

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search logic here
    const results = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phoneno.toLowerCase().includes(searchTerm.toLowerCase())||
      item.designation.toLowerCase().includes(searchTerm.toLowerCase())||
      item.resume.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1); // Reset to the first page when new search results are fetched
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="search-results">
        <h2>Search Results</h2>
        {/* Render ListView component with searchResults, itemsPerPage, and onPageChange */}
        <ListView
          data={searchResults}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
