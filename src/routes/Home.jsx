import React from 'react';
import './Home.css'; 
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <video className="background-video" autoPlay loop muted>
        <source src="/video/earth-animation.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <h1>Welcome to Countries App</h1>
        <Link to="/countries">
        <Button variant="primary" size="lg">
          Explore the World
        </Button>
      </Link>
      </div>
    </div>
  );
};

export default Home;