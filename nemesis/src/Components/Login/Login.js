import React, { useEffect, useState } from "react";
import "./Login.css";
import { Button, Col, Form, Row } from "react-bootstrap";
import { login } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

function Login(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.user.id);
  const loading = useSelector((state) => state.user.loading);
  const errorObj = useSelector((state) => state.user.err);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [errors, setErrors] = useState({});
  const [canLogin, setCanLogin] = useState(false);

  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    let checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);

    if (!checkEmail) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }
    setErrors({});
    if (checkEmail) {
      dispatch(login({ email, password, setOpen, setErrors }));
    }

    setValidated(true);
  };

  return (
    <div className={"login"}>
      <h3 className={"login-heading"}>LOGIN</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Row>
        {emailError && <p className={"formData-error"}>{emailError}</p>}

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="test@123"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button type="submit" style={{ width: "100%", marginTop: "20px" }}>
          SUBMIT FORM
        </Button>
      </Form>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Invalid Credentials</h3>
            <p className={"login-error"}>{errors.email || errors.password}</p>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default Login;
