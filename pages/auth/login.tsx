import fetch from "node-fetch";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
  useEffect,
} from "react";
import { Row, Container, Button, Form, Alert } from "react-bootstrap";
import Navigation from "../../components/navigation";
import styles from "../../styles/Form.module.scss";
import { jwtFetch } from "../../lib/utils";
import { relative_path } from "../../lib/config";
import cookies from "next-cookies";
import Cookies from "universal-cookie";
import { NextPage } from "next";
import { UserData } from "../../types/user";
import Router from "next/router";

interface FormData {
  username: string;
  password: string;
}

interface Props {
  userdata: UserData;
}

const Login: NextPage<Props> = ({ userdata }) => {
  const [formData, setFormData]: [
    FormData,
    Dispatch<SetStateAction<FormData>>
  ] = useState({
    username: "",
    password: "",
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
    const { username, password } = formData;

    if (username.length < 1) {
      setErrorMsg("Error: Username cannot be empty");
      return;
    } else if (password.length < 1) {
      setErrorMsg("Error: Password cannot be empty");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_json = await res.json();

      if (!res.ok) {
        return setErrorMsg(`Error: ${res_json.message}`);
      }

      // set jwt coockie
      const unicookies = new Cookies();
      const now = new Date();

      unicookies.set("jwt_token", res_json.data.jwt_token, {
        path: "/",
        expires: new Date(now.getTime() + 30 * 60000),
        sameSite: "lax",
      });
      Router.push("/");
    } catch (err) {
      console.error(err);
      setErrorMsg(`Error: ${err.message}`);
    }
  };

  // return to main page if already logged in
  useEffect(() => {
    if (userdata) {
      Router.push("/");
    }
  }, []);

  return (
    <div>
      <Navigation userdata={userdata} />
      <Container>
        <Row
          className={`${styles.form_title} justify-content-center justify-content-md-start`}
        >
          <h2 className="text-center text-md-left">Employee Portal</h2>
        </Row>
        <Row
          className={`${styles.form_subtitle} justify-content-center justify-content-md-start`}
        >
          <p className="text-center text-md-left text-muted">
            Sign in with your Good Things Employee username and password
          </p>
        </Row>
      </Container>
      <Container>
        <Form>
          <Form.Group
            className={styles.form_group}
            as={Row}
            controlId="username"
          >
            <Form.Label>&nbsp;Username</Form.Label>
            <Form.Control type="text" onChange={handleChange} required />
          </Form.Group>
          <Form.Group
            className={styles.form_group}
            as={Row}
            controlId="password"
          >
            <Form.Label>&nbsp;Password</Form.Label>
            <Form.Control type="password" onChange={handleChange} required />
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
              Sign In
            </Button>
            <Button
              className="d-block d-md-none"
              onClick={handleClick}
              variant="primary"
              size="lg"
              block
            >
              Sign In
            </Button>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

Login.getInitialProps = async (ctx) => {
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

export default Login;
