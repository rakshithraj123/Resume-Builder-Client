import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";
import { adminService } from "../../services/admin.service";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { CREATE_RESUME_MENU, PREVIEW_RESUME_MENU } from "../../constants";
import debounce from "lodash/debounce"; // Import debounce function from lodash
import { resumeAddService } from "../../services/resumeAdd.service";
import CustomPopupDialog from "../../components/CustomPopupDialog";

const tableHeaderStyle = {
  headCells: {
    style: {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
  },
};

const columns = (handleView, handleEdit) => [
  {
    name: "Name",
    selector: (row) => row.firstName + " " + row.lastName,
    sortable: true,
    style: {
      fontSize: "0.9rem",
      fontWeight: 500,
    },
  },
  {
    name: "Email ID",
    selector: (row) => row.email,
    sortable: true,
    style: {
      fontSize: "0.9rem",
    },
  },
  {
    name: "Designation",
    selector: (row) => row.designation,
    sortable: true,
    style: {
      fontSize: "0.9rem",
    },
  },
  {
    name: "Actions",
    conditionalCellStyles: [
      {
        when: (row) => true,
        style: {
          minWidth: "150px",
        },
      },
    ],
    cell: (row) =>
      row.resumeId != null ? (
        <>
          <Button
            style={{ width: "100px", marginRight: "10px" }}
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button style={{ width: "100px" }} onClick={() => handleView(row)}>
            View
          </Button>
        </>
      ) : (
        <>
          <Button
            style={{ width: "100px", marginRight: "10px" }}
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            style={{ width: "100px" }}
            onClick={() => handleView(row)}
            disabled
          >
            View
          </Button>
        </>
      ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

function Dashboard({ handleNavigation }) {
  const [records, setRecords] = useState([]);
  //const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [currntPage, setCurrntPage] = useState(1);
  const [searchContent, setSearchText] = useState("");
  var previousSearchContent = "";
  const [fetchedStartPage, setfetchedStartPage] = useState(0);
  const [fetchedLastPage, setFetchedLastPage] = useState(0);
  const [cachedRecords, setCachedRecords] = useState([]);
  const NUMBER_OF_PAGES_TO_FETCH = 4;
  const [loadingResumeData, setLoadingResumeData] = useState(false);
  const [showRetryPopup, setShowRetryPopup] = useState(false);

  useEffect(() => {
    if (searchContent != previousSearchContent) {
      //
      delayedSearch(searchContent);
    } else {
      fetchData(
        currntPage,
        currntPage + (NUMBER_OF_PAGES_TO_FETCH - 1),
        rowsPerPage,
        searchContent
      );
    }
  }, [searchContent, rowsPerPage]);

  const delayedSearch = debounce((term) => {
    console.log("Performing search for:", term);
    fetchData(
      currntPage,
      currntPage + (NUMBER_OF_PAGES_TO_FETCH - 1),
      rowsPerPage,
      searchContent
    );
  }, 1000); // 1000 milliseconds debounce delay

  /**
   * divide records into given number of parts
   * @param {*} array
   * @param {*} parts
   * @param {*} rowsToDisplay
   * @returns
   */
  const divideRecords = (array, parts, rowsToDisplay) => {
    if (array.length <= rowsToDisplay) {
      // if arraylength is less then rowsToDisplay then divide one part
      parts = 1;
    } else {
      // reduce the parts till each divide array gets (rowsToDisplay)number of items
      while (array.length < rowsToDisplay * (parts - 1)) {
        parts = parts - 1;
      }
    }

    const newArray = [...array];
    const dividedArrays = [];
    const chunkSize = rowsToDisplay;

    for (let i = 0; i < parts; i++) {
      dividedArrays.push(newArray.splice(0, chunkSize));
    }
    return dividedArrays;
  };

  const fetchData = async (startPage, endPage, rowCount, searchTerm) => {
    setLoading(true);
    const updatedFormData = {
      startPage: startPage,
      endPage: endPage,
      rowCount: rowCount, // Convert rowCount to string
      searchTerm: searchTerm,
    };

    adminService
      .userList(updatedFormData)
      .then((response) => {
        if (response.status) {
          setfetchedStartPage(startPage);
          setFetchedLastPage(endPage);

          //setRecords(response.data.User.SearchResult);
          let dividedRecords = divideRecords(
            response.data.User.SearchResult,
            NUMBER_OF_PAGES_TO_FETCH,
            rowsPerPage
          );
          setRecords(dividedRecords[0]);

          let clearCacheData = startPage == 1;
          if (clearCacheData) {
            setCachedRecords(dividedRecords);
            console.log(dividedRecords);
          } else {
            let updatedRecords = cachedRecords.concat(dividedRecords);
            setCachedRecords(updatedRecords);
            console.log(updatedRecords);
          }

          //setFilteredRecords(response.data.User.SearchResult);
          setTotalPages(response.data.User.totalPages);
        } else {
          setRecords([]);
          toast("No data found.");
        }
      })
      .catch((err) => {
        setRecords([]);
        if (err.message === "TIME_OUT") {
          setShowRetryPopup(true)
        } else {
          setShowRetryPopup(true)
        }
        console.log("Error ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * handle serach
   * @param {*} event
   */
  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    previousSearchContent = searchContent;
    delayedSearch.cancel();
    setCurrntPage(1);
    setSearchText(value);
  }

  function handleView(row) {
    if (row.resumeId != null) {
      handleNavigation(PREVIEW_RESUME_MENU, {
        resumeId: row.resumeId,
        userId: row._id,
      });
    }
  }

  function handleEdit(row) {
    if (row.resumeId != null) {
      setLoadingResumeData(true);
      resumeAddService
        .fetch(row.resumeId)
        .then((response) => {
          if (response.status) {
            handleNavigation(CREATE_RESUME_MENU, {
              resumeData: response.data.Resume.content,
              resumeId: row.resumeId,
              userId: row._id,
            });
          } else {
            toast("Fail to fetch resume");
          }
        })
        .catch((err) => {
          console.log(err);
          toast("Fail to fetch resume");
          if (err.message === "TIME_OUT") {
            toast("Request timeout to fetch resume. Please try again.");
          } else {
            toast("Failed to fetch resume. Please try again.");
          }
        })
        .finally(() => {
          setLoadingResumeData(false);
        });
    } else {
      handleNavigation(CREATE_RESUME_MENU, {
        resumeId: row.resumeId,
        userId: row._id,
      });
    }
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber != currntPage) {
      setCurrntPage(pageNumber);
      if (pageNumber <= fetchedLastPage) {
        setRecords(cachedRecords[pageNumber - 1]);
      } else {
        fetchData(
          pageNumber,
          pageNumber + (NUMBER_OF_PAGES_TO_FETCH - 1),
          rowsPerPage,
          searchContent
        );
      }
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage, currentPage) => {
    if (newRowsPerPage != rowsPerPage) {
      setCurrntPage(1);
      setRowsPerPage(newRowsPerPage);
    }
  };

  if (loadingResumeData)
    return (
      <div
        class="text-center"
        style={{
          height: "calc(97vh - 8px )",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    );

  return (
    <>
      <div className="p-5 bg-primary">
        <Container>
          <Row>
            <Col>
              <div className="py-5"></div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container
        className="bg-white rounded-top p-md-5 p-3 mt-n5 shadow"
        style={{
          height: "calc(100vh - 185px)",
          overflow: "auto",
          scrollbarWidth: "none",
        }}
      >
        <Row>
          <Col>
            <Row className="justify-content-end align-items-center mb-2">
              <Col>
                <h3 className="mb-md-0 mb-3">
                  <i className="bi bi-person"></i> Users
                </h3>
              </Col>
              <Col lg={4}>
                <FloatingLabel
                  controlId="search"
                  label="Search by Name/Email/Content"
                >
                  <Form.Control type="text" onChange={handleFilter} />
                </FloatingLabel>
              </Col>
            </Row>
            <DataTable
              columns={columns(handleView, handleEdit)}
              data={records}
              pagination
              paginationServer
              paginationTotalRows={totalPages * rowsPerPage}
              progressPending={loading}
              paginationRowsPerPageOptions={[10, 20, 30]}
              paginationPerPage={rowsPerPage}
              paginationDefaultPage={currntPage}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              paginationIconFirstPage={null}
              paginationIconLastPage={null}
              customStyles={tableHeaderStyle}
            />
          </Col>
        </Row>
        {showRetryPopup && (
          <CustomPopupDialog
            handleOkClick={() => {
              fetchData(
                currntPage,
                currntPage + (NUMBER_OF_PAGES_TO_FETCH - 1),
                rowsPerPage,
                searchContent
              );
              setShowRetryPopup(false);
            }}
            handleCancelClick={() => {
              setShowRetryPopup(false);
            }}
            title={"Resume Builder"}
            message={"An error occurred while loading the resume list. Please try again by clicking Retry."}
            okButtonTitle={"Retry"}
            cancelButtonTitle={"Cancel"}
          />
        )}
      </Container>
    </>
  );
}

export default Dashboard;
