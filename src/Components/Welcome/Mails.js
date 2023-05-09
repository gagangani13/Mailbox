import React,{useState} from 'react'
import { Card, Col,Row } from "react-bootstrap";
const Mails = (props) => {
    const[message,setMessage]=useState(false)
    function showMessage() {
        setMessage(!message)
    }
  return (
    <>
    {props.mails.map((item)=>{
        return(<Card style={{ color: "black", fontSize: "larger", textAlign: "center" ,backgroundColor:message?'#d9c9c9':'white'}} onClick={showMessage}>
        <Card.Body>
            <Row>
                <Col>{item.who} : </Col>
                <Col>{item.email}</Col>
                <Col style={{fontWeight:'bold'}}>{item.subject}</Col>
                <Col>{item.date}</Col>
            </Row>
        </Card.Body>
        {message&&<Card.Body>
            <Row>Subject : {item.subject}</Row>
            <hr/>
            <Row>{item.message}</Row>
        </Card.Body>}
      </Card>)
    })}
    </>
  )
}

export default Mails
