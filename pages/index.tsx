import { Row, Container, Button, Col, Card } from "react-bootstrap";
import styles from "../styles/Home.module.scss";
import Navigation from "../components/navigation";
import { NextPage } from "next";
import { jwtFetch } from "../lib/utils";
import { relative_path } from "../lib/config";
import { UserData } from "../types/user";
import cookies from "next-cookies";

import React from "react";

interface Props {
  userdata: UserData;
}

const Home: NextPage<Props> = ({ userdata }) => {
  const guest_display = (
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
  );

  return (
    <div>
      <Navigation userdata={userdata} />

      <Container fluid className={styles.title}>
        <Row className={`d-none d-md-block ${styles.title}`}></Row>

        <Row className="justify-content-center">
          <h4 className="display-4 text-center">Good Things Employee Portal</h4>
        </Row>
        <Row className={`d-none d-md-block ${styles.title}`}></Row>
      </Container>

      {userdata ? (
        <Container>
          <Row className="justify-content-start">
            <Col xs={12} md={6} lg={4} className={styles.card}>
              <Card border="primary">
                <Card.Header>Test View</Card.Header>
                <Card.Body>
                  <ul className={styles.card_list}>
                    <li>
                      <Button variant="link" href="/view/test/small">
                        Small
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" href="/view/test/medium">
                        Medium
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" href="/view/test/large">
                        Large
                      </Button>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4} className={styles.card}>
              <Card border="primary">
                <Card.Header>Manage Contract</Card.Header>
                <Card.Body>
                  <ul className={styles.card_list}>
                    <li>
                      <Button variant="link">Sign Contract</Button>
                    </li>
                    <li>
                      <Button variant="link">Find Contract</Button>
                    </li>
                    <li>
                      <Button variant="link">Edit Contract</Button>
                    </li>
                    <li>
                      <Button variant="link">Manage Contract Payment</Button>
                    </li>
                    <li>
                      <Button variant="link">Delete Contract</Button>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4} className={styles.card}>
              <Card border="primary">
                <Card.Header>Manage Item</Card.Header>
                <Card.Body>
                  <ul className={styles.card_list}>
                    <li>
                      <Button variant="link">Add Item</Button>
                    </li>
                    <li>
                      <Button variant="link">Find Item</Button>
                    </li>
                    <li>
                      <Button variant="link">Edit Item</Button>
                    </li>
                    <li>
                      <Button variant="link">Delete Item</Button>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={4} className={styles.card}>
              <Card border="primary">
                <Card.Header>Manage Member</Card.Header>
                <Card.Body>
                  <ul className={styles.card_list}>
                    <li>
                      <Button variant="link">Add Member</Button>
                    </li>
                    <li>
                      <Button variant="link">Find Member</Button>
                    </li>
                    <li>
                      <Button variant="link">Find Contracts of Member</Button>
                    </li>
                    <li>
                      <Button variant="link">Edit Member</Button>
                    </li>
                    <li>
                      <Button variant="link">Delete Member</Button>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {userdata.level >= 3 ? (
              <Col xs={12} md={6} lg={4} className={styles.card}>
                <Card border="primary">
                  <Card.Header>Manage Employee</Card.Header>
                  <Card.Body>
                    <ul className={styles.card_list}>
                      <li>
                        <Button variant="link">Add Employee</Button>
                      </li>
                      <li>
                        <Button variant="link">Find Employee</Button>
                      </li>
                      <li>
                        <Button variant="link">Edit Employee</Button>
                      </li>
                      <li>
                        <Button variant="link">Delete Employee</Button>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <></>
            )}

            {userdata.level >= 5 ? (
              <React.Fragment>
                <Col xs={12} md={6} lg={4} className={styles.card}>
                  <Card border="primary">
                    <Card.Header>Manage Platform</Card.Header>
                    <Card.Body>
                      <ul className={styles.card_list}>
                        <li>
                          <Button variant="link">Add Platform</Button>
                        </li>
                        <li>
                          <Button variant="link">Find Platform</Button>
                        </li>
                        <li>
                          <Button variant="link">Edit Platform</Button>
                        </li>
                        <li>
                          <Button variant="link">Delete Platform</Button>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>

                <Col xs={12} md={6} lg={4} className={styles.card}>
                  <Card border="primary">
                    <Card.Header>Manage Branch</Card.Header>
                    <Card.Body>
                      <ul className={styles.card_list}>
                        <li>
                          <Button variant="link">Add Branch</Button>
                        </li>
                        <li>
                          <Button variant="link">Find Branch</Button>
                        </li>
                        <li>
                          <Button variant="link">
                            Find Employee of Branch
                          </Button>
                        </li>
                        <li>
                          <Button variant="link">Edit Branch</Button>
                        </li>
                        <li>
                          <Button variant="link">Delete Branch</Button>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </React.Fragment>
            ) : (
              <></>
            )}
          </Row>
        </Container>
      ) : (
        guest_display
      )}
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const { jwt_token } = cookies(ctx);
  // console.log(ctx);

  var userdata: UserData;
  try {
    const res = await jwtFetch(`${relative_path}/api/get/userdata`, jwt_token);
    const res_json = await res.json();
    // console.log(res_json);

    if (!res.ok) {
      userdata = null;
    } else {
      userdata = res_json.data.userdata;
    }
  } catch (err) {
    console.error(err);
    userdata = null;
  }

  return {
    userdata: userdata,
  };
};

export default Home;
