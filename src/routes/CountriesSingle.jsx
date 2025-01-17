import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  console.log("Weather: ", weather);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=5d162dad58ffa39544422393f6d5273f`
        );
        setWeather(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    const fetchImage = async () => {
      const apiKey = "0HPFTXkYknfKK5tZ1yg0DEPRZN7gqwcHRaWWUsAsu8COngiy9v9XnF7m"; 
      const query = country.name.common;
      const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: apiKey,
          },
        });

        if (response.data.photos.length > 0) {
          setImageUrl(response.data.photos[0].src.large);
        } else {
          console.log("No images found");
        }
      } catch (error) {
        console.error("Error fetching image from Pexels:", error);
      }
    };

    fetchWeather();
    fetchImage();
  }, [country.capital, country.name.common]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  const styles = {
    container: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#f8f9fa", // light background for container
      borderRadius: "10px",
    },
    image: {
      maxWidth: "100%",
      borderRadius: "10px",
    },
    heading: {
      color: "#007bff",
    },
    weatherInfo: {
      fontSize: "1.2rem",
      marginTop: "10px",
    },
    spinner: {
      display: "block",
      margin: "0 auto",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
  };

  return (
    <Container style={styles.container}>
      <Row className="m-5">
        <Col>
          {imageUrl && (
            <Image
              thumbnail
              src={imageUrl}
              alt={`${country.name.common} image`}
              style={styles.image}
            />
          )}
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capital {country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{weather.main.temp}</strong> degrees in{" "}
                {country.capital} and {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;