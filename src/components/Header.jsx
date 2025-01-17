import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, logout, getNameOfUser } from "../auth/firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        console.log("User object:", user);
        try {
          const displayName = user.displayName;
          if (displayName) {
            console.log("Display Name:", displayName); // Debugging log
            setName(displayName);
          } else {
            console.log("Fetching user data for UID:", user.uid); // Debugging log
            const userName = await getNameOfUser(user);
            if (userName) {
              console.log("User Name:", userName); // Debugging log
              setName(userName);
            } else {
              console.log("No user data found");
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, [user]);

  useEffect(() => {
    console.log("Name state updated:", name); // Debugging log
  }, [name]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ marginRight: '1.5rem' }}>Countries App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ fontWeight: 'bold', marginLeft: 10 }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/countries" style={{ fontWeight: 'bold', marginLeft: 10 }}>Countries</Nav.Link>
            <Nav.Link as={Link} to="/favourites" style={{ fontWeight: 'bold', marginLeft: 10 }}>Favourites</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Navbar.Text className="me-2" style={{ fontWeight: 'bold' }}>Welcome, {name}</Navbar.Text>
                <Button variant="outline-danger" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className="ms-3" style={{ fontWeight: 'bold' }}>Register</Nav.Link>
                <Nav.Link as={Link} to="/login" style={{ fontWeight: 'bold' }}>Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;