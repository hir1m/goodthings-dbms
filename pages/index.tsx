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
                <Card.Header>Manage Contract</Card.Header>
                <Card.Body>
                  <ul className={styles.card_list}>
                    <li>
                      <Button variant="link" href="/view/contract/detailed">
                        View All Contracts With Details
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" href="/view/contract/completed">
                        View All Completed Contracts
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="link"
                        href="/input/search/contract/valueof"
                      >
                        Search Value of a Contract
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" href="/view/contract/valueofall">
                        View Value of All Contracts
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" href="/input/delete/contract">
                        Delete a Contract
                      </Button>
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
                      <Button
                        variant="link"
                        href="/input/update/avaliable_item"
                      >
                        Update an Item
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" href="/input/delete/soldout_item">
                        Delete an Item
                      </Button>
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
                      <Button variant="link" href="/input/update/member">
                        Update Member Contact
                      </Button>
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
                        <Button
                          variant="link"
                          href="/input/search/employee/belongtostore"
                        >
                          Get Number of Employee of Branch
                        </Button>
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
                    <Card.Header>Manage Branch</Card.Header>
                    <Card.Body>
                      <ul className={styles.card_list}>
                        <li>
                          <Button variant="link" href="view/inventory/branched">
                            Show Inventory of Each Branch
                          </Button>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>

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
