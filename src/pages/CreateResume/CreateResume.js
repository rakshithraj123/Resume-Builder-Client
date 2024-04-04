import { Container, Card,Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react';

const CreateResume = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., send data to backend
    };
    return (<div >
        <Container >

            {/* <Card.Text style={{ textAlign: 'center' }} className="d-flex justify-content-center">
                CreateResume
            </Card.Text> */}
            <h1>Resume Builder</h1>
            <Form onSubmit={handleSubmit}>
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
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type="tel" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                    />
                </Form.Group>
                {/* Add more form fields as needed */}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    </div>)
}

export default CreateResume