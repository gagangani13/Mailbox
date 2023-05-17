import React from "react";
import { Card } from "react-bootstrap";
const NoMails = (props) => {
  return (
    <Card style={{ color: "black", fontSize: "larger", textAlign: "center" }}>
      <Card.Body>{props.option}</Card.Body>
    </Card>
  );
};

export default NoMails;
