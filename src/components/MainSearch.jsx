import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Job from "./Job";
import { Button } from "react-bootstrap";
import { FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToListAction } from "../redux/actions";

const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const buttonLabel = useSelector((state) => {
    return state.favoriteslist.content.length;
  });

  const baseEndpoint =
    "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
            <>
              <Job key={jobData._id} data={jobData} />
              {username ? (
                <Button
                  onClick={() => {
                    console.log("AGGIUNGI LAVORO");
                    dispatch(addToListAction(jobData));
                  }}
                >
                  aggiungi alla lista
                </Button>
              ) : (
                <div>
                  <span className="not-logged-in">
                    effettua l'accesso per aggiungere il lavoro alla lista
                  </span>
                </div>
              )}
            </>
          ))}
        </Col>
      </Row>
      <div className="d-flex justify-content-end my-4">
        <Button
          onClick={() => navigate("/src/components/favorites")}
          className="d-flex align-items-center"
        >
          <FaListAlt />
          <span className="ms-2">{buttonLabel}</span>
        </Button>
      </div>
    </Container>
  );
};

export default MainSearch;
