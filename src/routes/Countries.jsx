import { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavouritesFromSource } from "../auth/firebase";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites || []);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  useEffect(() => {}, [search]);
  const styles = {
    container: {
      padding: "20px",
      backgroundColor: "#f4f4f9",
    },
    searchInput: {
      width: "100%",
      maxWidth: "300px",
      borderRadius: "20px",
      padding: "10px",
      marginBottom: "20px",
      border: "1px solid #ced4da",
      fontSize: "1rem",
    },
    card: {
      border: "none",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      backgroundColor: "#fff",
    },
    cardImg: {
      objectFit: "cover",
      minHeight: "200px",
      maxHeight: "200px",
    },
    cardBody: {
      display: "flex",
      flexDirection: "column",
    },
    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    cardSubtitle: {
      marginBottom: "15px",
      color: "#6c757d",
    },
    listGroup: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
    },
    spinner: {
      display: "block",
      margin: "0 auto",
      color: "#007bff",
    },
  };
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

  return (
    <Container fluid style={styles.container}>
      <Row className="justify-content-center">
        <Form.Control
          style={{ width: "18rem" }}
          type="search"
          className="me-2 "
          placeholder="Search for countries"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100">
              {favourites.some(
  (favourite) => favourite === country.name?.common
) ? (
  <FavoriteIcon style={{ color: "red", cursor: "pointer" }}
    onClick={() => dispatch(removeFavourite(country.name.common))}
  />
) : (
  <FavoriteBorderIcon
    onClick={() => dispatch(addFavourite(country.name.common))}
  />
)}

                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}>
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end">
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
