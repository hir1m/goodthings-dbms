import { Navbar, Nav, Button } from "react-bootstrap";
import { UserData } from "../types/user";
import { jwtFetch } from "../lib/utils";
import { useEffect, useState, MouseEvent } from "react";
import Cookies from "universal-cookie";
import Router from "next/router";

const Navigation: React.FC = () => {
  const [userdata, setUserdata] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await jwtFetch("/api/get/userdata");
        const res_json = await res.json();
        var userdata: UserData;

        // console.log(res_full);
        userdata = res_json.data.userdata;
        setUserdata(userdata);
      } catch (err) {
        setUserdata(undefined);
      }
    };

    fetchData();
  }, []);

  const handleClick = async (_: MouseEvent<HTMLButtonElement>) => {
    const cookies = new Cookies();
    cookies.remove("jwt_token", { path: "/" });
    Router.push("/");
    Router.reload();
  };

  return (
    <Navbar expand="md" variant="light" bg="light" sticky="top">
      <Navbar.Brand href="/">Good Things</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="mr-auto"></Nav>
        <Nav>
          {userdata ? (
            <Navbar.Text className="text-center">
              Hello, <b>{userdata.username}</b>
            </Navbar.Text>
          ) : (
            <Navbar.Text className="text-center">
              Welcome, <b>Guest</b>
            </Navbar.Text>
          )}

          {userdata ? (
            <Button variant="link" onClick={handleClick}>
              Logout
            </Button>
          ) : (
            <Button variant="link" href="/auth/login">
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
