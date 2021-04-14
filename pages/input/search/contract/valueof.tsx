import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
} from "react";
import { Row, Container, Button, Form, Alert, Col } from "react-bootstrap";
import Navigation from "../../../../components/navigation";
import styles from "../../../../styles/Form.module.scss";
import { jwtFetch } from "../../../../lib/utils";
import { relative_path } from "../../../../lib/config";
import cookies from "next-cookies";
import { NextPage } from "next";
import { UserData } from "../../../../types/user";
import Router from "next/router";

interface FormData {
  id: string;
}

interface Props {
  userdata: UserData;
}

const SearchContractValueOf: NextPage<Props> = ({ userdata }) => {
  const [formData, setFormData]: [
    FormData,
    Dispatch<SetStateAction<FormData>>
  ] = useState({
    id: "",
  });

  const [errorMsg, setErrorMsg]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((s: FormData) => ({
      ...s,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (_: MouseEvent<HTMLButtonElement>) => {
    const { id } = formData;

    if (id.length < 1) {
      setErrorMsg("Error: id cannot be empty");
      return;
    }
    Router.push(`/view/contract/valueof?id=${id}`);
  };

  return (
    <div>
      <Navigation userdata={userdata} />
      <Container>
        <Row
          className={`${styles.form_title} justify-content-center justify-content-md-start`}
        >
          <h3 className="text-center text-md-left">
            Get total value of all the items sold in a contract
          </h3>
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
              Search
            </Button>
            <Button
              className="d-block d-md-none"
              onClick={handleClick}
              variant="primary"
              size="lg"
              block
            >
              Search
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

SearchContractValueOf.getInitialProps = async (ctx) => {
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

export default SearchContractValueOf;
