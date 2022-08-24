import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Translate() {
  return (
    <div>
      <div className="app-header">
        <h1 className="header">Translator</h1>
      </div>
      <div className="app-body">
        <Form>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </Col>
            <Col>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col></Col>
            <Col>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Col>
            <Col></Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Button variant="info">Click to translate</Button>{" "}
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
