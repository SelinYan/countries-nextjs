import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import './Auth.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const login = () => {
    loginWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/countries");
  }, [user, loading, navigate]);

  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="auth-card">
            <Card.Body>
              <h1 className="text-center">Login</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={login} className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;