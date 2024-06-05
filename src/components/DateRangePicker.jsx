import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const DateRangePicker = (props) => {
  
  
  return (


      <Row className="mb-md-2">
        <Form.Group as={Col} md={4} xs={4} controlId="">
          <FloatingLabel controlId="" label="Start Date" className="mb-3">
            <Form.Control type="date" placeholder=""
             name='startDate'
             value={props.startDate}
             onChange={props.handleDateChange} 
             required
            />
          </FloatingLabel>
        </Form.Group>
        {
          props.present?(
           <></>
          ):      
          (
            <Form.Group as={Col} md={4} xs={4} controlId="">
            <FloatingLabel controlId="" label="End Date" className="mb-3">
              <Form.Control type="date" placeholder=""
                name='endDate'
                value={props.endDate}
                onChange={props.handleDateChange} 
                required
               />
            </FloatingLabel>
          </Form.Group>
          )
        }
   
        
        <Form.Group as={Col} md={3} xs={3} controlId="" >
          <FloatingLabel controlId="" className="mb-3">
            <Form.Check type="checkbox" placeholder=""
             className="custom-checkbox" 
               name="present"
               label="present"
               checked={props.present}
               onChange={props.handleDateChange} 
             />
          </FloatingLabel>
        </Form.Group>
      </Row>
     
  );
};

export default DateRangePicker;
