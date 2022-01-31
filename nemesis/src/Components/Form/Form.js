import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import "./Form.css";
import axios from "../../api/axios";
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
  p: 4,
};

function FormData({ setUsers }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(username, email, mobile, address);
    //validations
    let checkUsername = /^[a-z0-9]+$/i.test(username);
    let checkMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile);
    let checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);

    if (!checkUsername) {
      setUsernameError("Only Alpha-numeric characters");
    } else {
      setUsernameError("");
    }

    if (!checkEmail) {
      setEmailError("Enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!checkMobile) {
      setMobileError("Please enter a valid mobile number");
    } else {
      setMobileError("");
    }

    if (checkMobile && checkUsername && address !== "") {
      await axios
        .post("/api/data/data-post", { username, email, mobile, address })
        .then((res) => {
          setUsers((prev) => [...prev, { username, email, mobile, address }]);
          setUsername("");
          setEmail("");
          setMobile("");
          setAddress("");
          setOpen(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    setValidated(true);
  };

  return (
    <div className={"form"}>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        {usernameError && <p className={"formData-error"}>{usernameError}</p>}
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="example@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Row>
        {emailError && <p className={"formData-error"}>{emailError}</p>}
        <Row className="mb-3">
          <InputGroup>
            <InputGroup.Text>Address</InputGroup.Text>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputGroup>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="+019027XXXXXX"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Form.Group>
        </Row>
        {mobileError && <p className={"formData-error"}>{mobileError}</p>}
        <Button type="submit" className={"formData-btn"}>
          Submit form
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
            <h3 className={"formData-popup"}>User Added Successfully!</h3>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default FormData;
