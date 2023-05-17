import React from 'react'
import {Navbar,Container, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { welcomeAction } from './Store/welcomeSlice'
import { authAction } from './Store/authSlice'
import { Route,Redirect } from 'react-router-dom'
const Header = () => {
    const dispatch=useDispatch()
    const option=useSelector((state)=>state.welcomeReducer.options)
    const loggingOut=useSelector((state)=>state.authenticate.login)
    function setOption(e) {
        dispatch(welcomeAction.setOptions(e.target.value))
    }
    function logoutHandler(){
        dispatch(authAction.loginHandler(null))
        localStorage.removeItem('idToken')
        localStorage.removeItem('senderEmailId')
    }
  return (
    <div style={{position:'fixed'}}>
    <Navbar bg="dark" style={{width:'100vw'}}>
        <Container>
          <Navbar.Brand >
            <h1 className="fa-solid fa-envelope fa-lg" style={{color: '#f1f2f4'}}> WELCOME   TO   MAILBOX</h1>
          </Navbar.Brand>
            <Button variant='danger' onClick={logoutHandler}>LOGOUT</Button>
        </Container>
    </Navbar>
    <Navbar bg="dark" style={{width:'10vw',height:'70vh',top:'10vh'}}>
        <Container className='d-grid justify-content-center' style={{rowGap:'8rem'}}>
            <Button variant={(option==='compose')?'warning':'light'} value='compose' onClick={setOption}>COMPOSE</Button>
            <Button variant={(option==='inbox')?'warning':'light'}  value='inbox' onClick={setOption}>INBOX</Button>
            <Button variant={(option==='sent')?'warning':'light'}  value='sent' onClick={setOption}>SENT</Button>
        </Container>
    </Navbar>
    {!loggingOut&&<Route><Redirect to='/'/></Route>}
    </div>
  )
}

export default Header
