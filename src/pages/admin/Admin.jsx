  import React, { useState, useEffect } from "react";
  import DataTable from 'react-data-table-component';
  import Header from "../../components/Header/Header";
  import Container from 'react-bootstrap/Container';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import FloatingLabel from 'react-bootstrap/FloatingLabel';
  import Form from 'react-bootstrap/Form';
  import 'bootstrap-icons/font/bootstrap-icons.css';
  import { adminService } from "../../services/admin.service";
  import { toast } from "react-toastify";
  import Button from 'react-bootstrap/Button';
  import { PREVIEW_RESUME_MENU } from "../../constants";

  const columns  = (handleView) => [
    {
      name: 'Name',
      selector: row => row.firstName+" "+row.lastName,
      sortable: true,
    },
    {
      name: 'Email ID',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (row.resumeId !=null)?<Button onClick={() => handleView(row)}>View</Button>:<></>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  function Dashboard({ handleNavigation }) {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const updatedFormData = {
          startPage: 1,
          endPage: 99999,
          rowCount: 10, // Convert rowCount to string
          searchTerm: ''
        };

        adminService
        .userList(updatedFormData)
        .then((response) => {
            setLoading(false);
            if (response.status) {
            setRecords(response.data.User.SearchResult);
            setFilteredRecords(response.data.User.SearchResult);
            setLoading(false);
            } else {
              setRecords([]);
              toast("No data found.");
            }
          
        })
        .catch((err) => {
          setRecords([]);        
          console.log("Error ", err);
        })
        .finally(() => {
          setLoading(false);
        });
      };

      fetchData();
    }, []);

    function handleFilter(event) {
      const value = event.target.value.toLowerCase();
      const filteredData = records.filter(row => 
        (row.firstName&&row.firstName.toLowerCase().includes(value))||
        (row.lastName&&row.lastName.toLowerCase().includes(value))||
        (row.email&&row.email.toLowerCase().includes(value))||
        (row.designation&&row.designation.toLowerCase().includes(value))
      );
      setFilteredRecords(filteredData);
    }
    function handleView(row) {
      console.log("View button clicked for:", row);
      // Add your view logic here, e.g., navigate to a detail page or show a modal with user details
      if (row.resumeId != null) {
        handleNavigation(PREVIEW_RESUME_MENU,row.resumeId)
      }
    }

    return (
      <>
        <Header />
        <div className="p-5 bg-primary">
          <Container>
            <Row>
              <Col>
                <div className="py-5"></div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="bg-white rounded-top p-md-5 p-3 mt-n5 shadow">
          <Row>
            <Col>
              <Row className="justify-content-end align-items-center mb-2">
                <Col>
                  <h3 className="mb-md-0 mb-3"><i className="bi bi-person"></i> Users</h3>
                </Col>
                <Col lg={4}>
                  <FloatingLabel controlId="search" label="Search">
                    <Form.Control type="text" onChange={handleFilter} />
                  </FloatingLabel>
                </Col>
              </Row>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <DataTable
                  columns={columns(handleView)}
                  data={filteredRecords}
                  pagination
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  export default Dashboard;