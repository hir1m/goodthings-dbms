import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
} from "react";
import {
  Row,
  Container,
  Button,
  Form,
  Alert,
  Col,
  Modal,
} from "react-bootstrap";
import Navigation from "../../../components/navigation";
import styles from "../../../styles/Form.module.scss";
import { jwtFetch, isInteger, isFloat } from "../../../lib/utils";
import { relative_path } from "../../../lib/config";
import cookies from "next-cookies";
import Cookies from "universal-cookie";
import { NextPage } from "next";
import { UserData } from "../../../types/user";
import Router from "next/router";

interface FormData {
  id: string;
  number: string;
  e_pid: string;
  m_pid: string;
  pid: string;
}

interface Props {
  userdata: UserData;
}

const InsertContract: NextPage<Props> = ({ userdata }) => {
  const [formData, setFormData]: [
    FormData,
    Dispatch<SetStateAction<FormData>>
  ] = useState({
    id: "",
    number: "",
    e_pid: "",
    m_pid: "",
    pid: "",
  });

  const [errorMsg, setErrorMsg]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");

  const [ok, setOk]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(
    false
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((s: FormData) => ({
      ...s,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (_: MouseEvent<HTMLButtonElement>) => {
    const { number } = formData;
    const cookies = new Cookies();
    const jwt_token = cookies.get("jwt_token");

    for (const [key, value] of Object.entries(formData)) {
      if (value.length < 1) {
        setErrorMsg(`Error: ${key} cannot be empty`);
        return;
      }
    }

    if (number.length >= 1 && !isInteger(number)) {
      setErrorMsg("Error: number has to be a integer");
      return;
    }

    try {
      const res = await jwtFetch(
        "/api/insert/contract",
        jwt_token,
        {
          "Content-Type": "application/json",
        },
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const res_json = await res.json();
      if (res.ok) {
        setOk(true);
      } else {
        setErrorMsg(`Error: ${res_json.message}`);
      }
    } catch (err) {
      if (err.message) {
        setErrorMsg(`Error: ${err.message}`);
      } else {
        setErrorMsg("Error: unexpected server error");
      }
    }
  };

  return (
    <div>
      <Modal show={ok} centered>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>New contract is added</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(_) => {
              Router.push("/");
            }}
          >
            Return to Homepage
          </Button>
        </Modal.Footer>
      </Modal>

      <Navigation userdata={userdata} />
      <Container>
        <Row
          className={`${styles.form_title} justify-content-center justify-content-md-start`}
        >
          <h3 className="text-center text-md-left">Add a new contract </h3>
        </Row>
      </Container>

      <Container>
        <Form>
          <Form.Group className={styles.form_group} as={Row} controlId="id">
            <Form.Label column xs="3">
              &nbsp;Contract ID
            </Form.Label>
            <Col xs="9">
              <Form.Control type="text" onChange={handleChange} required />
            </Col>
          </Form.Group>

          <Form.Group className={styles.form_group} as={Row} controlId="number">
            <Form.Label column xs="3">
              &nbsp;Contract number
            </Form.Label>
            <Col xs="9">
              <Form.Control type="text" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group className={styles.form_group} as={Row} controlId="e_pid">
            <Form.Label column xs="3">
              &nbsp;Emplpoyee ID
            </Form.Label>
            <Col xs="9">
              <Form.Control type="text" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group className={styles.form_group} as={Row} controlId="m_pid">
            <Form.Label column xs="3">
              &nbsp;Member ID
            </Form.Label>
            <Col xs="9">
              <Form.Control type="text" onChange={handleChange} />
            </Col>
          </Form.Group>

          <Form.Group className={styles.form_group} as={Row} controlId="pid">
            <Form.Label column xs="3">
              &nbsp;Platform ID
            </Form.Label>
            <Col xs="9">
              <Form.Control type="text" onChange={handleChange} />
            </Col>
          </Form.Group>

          {errorMsg.length > 0 ? (
            <Alert variant="danger">{errorMsg}</Alert>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          <br />
          <Row className={styles.form_group}>
            <Button
              className="d-none d-md-block"
              onClick={handleClick}
              variant="primary"
              size="lg"
            >
              Submit
            </Button>
            <Button
              className="d-block d-md-none"
              onClick={handleClick}
              variant="primary"
              size="lg"
              block
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

InsertContract.getInitialProps = async (ctx) => {
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

export default InsertContract;
