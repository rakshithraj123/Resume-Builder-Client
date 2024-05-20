import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Logo from '../../assets/img/logo-white.svg';
import Nav from 'react-bootstrap/Nav';


function Footer({ user }) {
  return (
    <>
      <footer className="bg-dark" data-bs-theme="dark">
        <Container>
          <Row>
            <Col>
              <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
                <p class="mb-0 text-body-secondary">© 2024 Resume Builder</p>

                <a href="/" class="mb-3 mb-md-0 link-body-emphasis">
                  <Image src={Logo} width={40} />
                </a>

                <Nav >
                  {
                    user ? (
                      <Nav.Item>
                        <Nav.Link href="/" className="text-body-secondary">Home</Nav.Link>
                      </Nav.Item>
                    ) : (
                      <>
                        <Nav.Item>
                          <Nav.Link href="/auth/login" className="text-body-secondary">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link href="/auth/signup" className="text-body-secondary">Signup</Nav.Link>
                        </Nav.Item>
                      </>
                    )
                  }
                </Nav>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Footer