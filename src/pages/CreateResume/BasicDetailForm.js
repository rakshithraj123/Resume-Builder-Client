import React, { forwardRef } from 'react'
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const BasicDetailForm = forwardRef((props, ref)  => {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    // Add your form submission logic here
  };
  const { formData, handleChange, nextStep } = props;

  return (
    // { formData, handleChange, nextStep }
    
    <>
      <div className="p-md-5 p-3">

        <h3 className="mb-0">Let’s start with your Details</h3>
        <p className="small text-muted mb-5">Include your full name and at least one way for employers to reach you.</p>

        <Form ref={ref} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <FloatingLabel controlId="" label="First Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                </FloatingLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <FloatingLabel controlId="" label="Last Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Form.Group controlId="email"  >
          <FloatingLabel controlId="" label="Email" className="mb-3">       
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
             </FloatingLabel>
          </Form.Group>
          <br />
          <Form.Group controlId="phoneNumber" >
          <FloatingLabel controlId="" label="Phone Number" className="mb-3">       
            <Form.Control
              type='tel'
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            </FloatingLabel>
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

         
        </Form>

      </div>
    </>








  )
});

export default BasicDetailForm
