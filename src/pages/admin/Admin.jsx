import React, { useState, useEffect } from 'react';
import { adminService } from "../../services/admin.service";
import { toast } from "react-toastify";
import { Pagination } from 'react-bootstrap'; // Import Bootstrap Table and Pagination

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // Initial search term
  const [rowsPerPage, setRowsPerPage] = useState(10); // Initial rows per page

  const fetchData = async (startPage, endPage, rowsPerPage, searchTerm) => {
    setLoading(true);
    setError(null);
    const updatedFormData = {
      startPage: startPage,
      endPage: endPage,
      rowCount: rowsPerPage, // Convert rowCount to string
      searchTerm: searchTerm
    };

    adminService
      .userList(updatedFormData)
      .then((response) => {
        if (response.status) {
          setLoading(false);
          if (response.data.User.SearchResult) {
            setEmails(response.data.User.SearchResult);
            setTotalPages(response.data.User.totalPages);
          } else {
            setEmails([]);
            setTotalPages(1);
            toast("No data found.");
          }
        } else {
          setEmails([]);
          setTotalPages(1);
          toast("Unable to fetch data!", response.message);
        }
      })
      .catch((err) => {
        setEmails([]);
        setTotalPages(1);
        console.log("Error ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(currentPage, currentPage , rowsPerPage, searchTerm);
  }, [currentPage, rowsPerPage, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleRowsChange = (event) => {
    setRowsPerPage(parseInt(event.target.value)); // Convert dropdown value to integer
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search" />
      <select value={rowsPerPage} onChange={handleRowsChange}>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
      </select>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email ID</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email._id}>
              <td>{email.firstName} {email.lastName}</td>
              <td>{email.email}</td>
              <td>{email.phoneNumber}</td>
              <td>{/* Phone number is not provided in the data */}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <span>{`${(currentPage - 1) * rowsPerPage + 1} - ${Math.min(currentPage * rowsPerPage, totalPages * rowsPerPage)} of ${totalPages * rowsPerPage}`}</span>  {/* Update page range based on current page */}
        <button onClick={handleFirstPage}>&lt;&lt;</button>
        <button onClick={handlePreviousPage}>&lt;</button>
        <button onClick={handleNextPage}>&gt;</button>
        <button onClick={handleLastPage}>&gt;&gt;</button>
      </div>
    </div>
  );
}

export default EmailList;
