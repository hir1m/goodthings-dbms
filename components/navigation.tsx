import { Navbar, Nav, Button } from "react-bootstrap";
import { UserData } from "../types/user";
import { MouseEvent } from "react";
import Cookies from "universal-cookie";
import Router from "next/router";

interface Props {
  userdata: UserData;
}

const Navigation: React.FC<Props> = ({ userdata }) => {
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
