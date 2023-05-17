import React,{useState} from 'react'
import { Card, Col,Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { loadFromFirebaseThunk } from '../Store/welcomeSlice';
const Mails = (props) => {
    const[message,setMessage]=useState(null)
    const option=useSelector((state)=>state.welcomeReducer.options)
    const sentByEmail=localStorage.getItem('senderEmailId').replace(/[@.]/g,"")
    const dispatch=useDispatch()
    async function showMessage(e) {
        const Id=e.target.parentElement.parentElement.id
        const setUnread=e.target.id
        if(message===Id){
            setMessage(null)
        }else{
            setMessage(Id)
        }
        if(option==='inbox' && setUnread==='true' ){
            const response=await fetch(`https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/${option}/${Id}.json`,{
                method:'PATCH',
                body:JSON.stringify({unread:'false'})
            })
            const data=await response.json()
            console.log(data)
            try {
                dispatch(loadFromFirebaseThunk(sentByEmail,option))
            } catch (error) {
                alert(data.error.message)
            }
        }
    }
    async function deleteMail(e) {
        const Id=e.target.parentElement.parentElement.id
        const response=await fetch(`https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/${option}/${Id}.json`,{
                method:'DELETE',
            })
            const data=await response.json()
            try {
                if(response.ok){
                    dispatch(loadFromFirebaseThunk(sentByEmail,option))
                }else{
                    throw new Error()
                }
            } catch (error) {
                alert(data.error.message)
            }
    }
  return (
    <>
    {props.mails!==null&&props.mails.map((item)=>{
        return(<Card style={{ color: "black", fontSize: "larger", textAlign: "center" ,backgroundColor:message===item.Id?'#d9c9c9':'white'}}  >
        <Card.Body >
            <Row className='align-items-center' id={item.Id}>
                {option==='inbox'&&item.unread==='true'&&<Col className="fa-solid fa-envelope col-1 " ></Col>}
                <Col className='col-2'>{item.who} : </Col>
                <Col>{item.email}</Col>
                <Col style={{fontWeight:'bold'}}>{item.subject}</Col>
                {/* <Col>{item.date}</Col> */}
                <Col className='col-1'><button class={`fa-solid fa-circle-chevron-down ${message===item.Id?'fa-rotate-180':''} m-2 p-2`} onClick={showMessage} id={item.unread}></button></Col>
                <Col className='col-1'><button class="fa-solid fa-trash-can m-2 p-2" style={{color:'red'}} onClick={deleteMail} ></button></Col>
            </Row>
        </Card.Body>
        {message===item.Id&&<Card.Body>
            <Row>Subject : {item.subject}</Row>
            <hr/>
            <Row>{item.message}</Row>
        </Card.Body>}
      </Card>)
    })}
    {props.mails===null&&<Card style={{ color: "black", fontSize: "larger", textAlign: "center" }}>
      <Card.Body>{props.empty}</Card.Body>
    </Card>}
    </>
  )
}

export default Mails
