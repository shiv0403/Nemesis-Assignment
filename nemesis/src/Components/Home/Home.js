import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Users from "../Users/Users";
import "./Home.css";
import FormData from "../Form/Form";
import { Tab, Row, Nav, Col } from "react-bootstrap";

function Home(props) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);
  const loading = useSelector((state) => state.user.loading);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={"home"}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item className={"nav-item"}>
                <Nav.Link eventKey="first">Form</Nav.Link>
              </Nav.Item>
              <Nav.Item className={"nav-item"}>
                <Nav.Link eventKey="second">Users</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <FormData setUsers={setUsers} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Users users={users} setUsers={setUsers} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Home;
