import { Row, Container, Button } from "react-bootstrap";
import styles from "../styles/Home.module.scss";

const Home: React.FC = () => {
  return (
    <div>
      <Container fluid className={styles.title}>
        <Row className={`d-none d-md-block ${styles.title}`}></Row>

        <Row className="justify-content-center">
          <h4 className="display-4 text-center">Good Things Employee Portal</h4>
        </Row>
        <Row className={`d-none d-md-block ${styles.title}`}></Row>
      </Container>

      <Container>
        <Row className={styles.content}>
          <h4>Please Login to Continue</h4>
        </Row>
        <Row className={styles.content}>
          <Button
            href="/auth/login"
            className="d-none d-md-block"
            variant="primary"
            size="lg"
          >
            Login
          </Button>
          <Button
            href="/auth/login"
            className="d-block d-md-none"
            variant="primary"
            size="lg"
            block
          >
            Login
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
