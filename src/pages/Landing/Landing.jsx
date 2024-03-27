// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
    </main>
  )

      // <Container>
    //   <Row className="justify-content-md-center">
    //     <Col xs lg="2">
    //       1 of 3
    //     </Col>
    //     <Col md="auto">Variable width content</Col>
    //     <Col xs lg="2">
    //       3 of 3
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col>1 of 3</Col>
    //     <Col md="auto">Variable width content</Col>
    //     <Col xs lg="2">
    //       3 of 3
    //     </Col>
    //   </Row>
    // </Container>
}

export default Landing
