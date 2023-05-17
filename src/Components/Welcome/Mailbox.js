import { EditorState } from "draft-js";
import React, { useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { loadFromFirebaseThunk } from "../Store/welcomeSlice";
import { useSelector } from "react-redux";
const Mailbox = () => {
    const senderEmailId=localStorage.getItem('senderEmailId')
    const senderFirebaseId=senderEmailId.replace(/[@.]/g,"")
    const option=useSelector((state)=>state.welcomeReducer.options)
    const emailRef=useRef()
    const subjectRef=useRef()
    const dispatch=useDispatch()
    const[editorState,setEditorState]=useState(()=>EditorState.createEmpty())
    const editorHandler=(editorState)=>{
        setEditorState(editorState)
    }
    async function sendMail(e) {
        e.preventDefault()
        const receiverEmail=emailRef.current.value.replace(/[@.]/g,"")
        const details={subject:subjectRef.current.value,message:editorState.getCurrentContent().getPlainText(),senderEmailId:senderEmailId,receiverEmailId:emailRef.current.value,date:new Date(),unread:'true'}
        const sender=await fetch(`https://mailbox-6509c-default-rtdb.firebaseio.com/${senderFirebaseId}/sent.json`,{
            method:'POST',
            body:JSON.stringify(details)
        })
        const senderData=await sender.json()
        try {
            if(sender.ok){
                const receiver=await fetch(`https://mailbox-6509c-default-rtdb.firebaseio.com/${receiverEmail}/inbox.json`,{
                    method:'POST',
                    body:JSON.stringify(details)
                })
                const receiverData=await receiver.json()
                try {
                    if(receiver.ok){
                        alert('Email sent successfully')    
                        dispatch(loadFromFirebaseThunk(senderFirebaseId,option))
                        emailRef.current.value=''
                        subjectRef.current.value=''
                        setEditorState('')
                    }else{
                        throw new Error('ERROR')
                    }
                } catch (error) {
                    alert(receiverData.error.message)
                }
            }else{
                throw new Error('ERROR')
            }
        } catch (error) {
            console.log(senderData)
            alert(senderData.error.message)
        }
    }

  return (
    <>
      <h4>COMPOSE EMAIL</h4>
      <Form style={{
          backgroundColor: "white",
          color: "black",}} onSubmit={sendMail}>
        <Row style={{ display: " -webkit-box" }}>
          <Col className="m-auto">To:</Col>
          <Col className="col-11">
            <Form.Control type="email" required ref={emailRef} />
          </Col>
        </Row>
        <hr />
        <Row style={{ display: " -webkit-box" }}>
          <Col className="m-auto">Subject:</Col>
          <Col className="col-11">
            <Form.Control type="text" ref={subjectRef}/>
          </Col>
        </Row>
        <hr />
        <Editor
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          editorState={editorState}
          onEditorStateChange={editorHandler}
          placeholder="Type your message here..."
          required
          />
        <Button type='submit'className='m-2'>Send</Button>
      </Form>
      </>
  );
};

export default Mailbox;
