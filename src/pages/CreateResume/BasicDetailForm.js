import React from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'

const BasicDetailForm = ({ formData, handleChange,nextStep}) => {
  return (
    <Form onSubmit={nextStep}>
      <Form.Label style={{ fontSize: '25px' }}><strong>Basic Detail</strong></Form.Label>
      <br /><br />
      <Row>
        <Col>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <Form.Group controlId="email"  >
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />
      <Form.Group controlId="phoneNumber" >
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />
      <Form.Group controlId="objective">
        <Form.Label>Objective</Form.Label>
        <Form.Control
          type="text"
          name="objective"
          as="textarea"
          rows={3}
          value={formData.objective}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <br />

      {/* <Row className="justify-content-between">
        <Col xs="auto">
          <Button variant="primary" disabled>
            Previous
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Col>
      </Row> */}
    </Form>
  )
}

export default BasicDetailForm
