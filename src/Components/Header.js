import React, {  } from "react";
import { Navbar, Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { welcomeAction } from "./Store/welcomeSlice";
import { authAction } from "./Store/authSlice";
import { Route, Redirect } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.welcomeReducer.options);
  const count = useSelector((state) => state.welcomeReducer.count);
  const loggingOut = useSelector((state) => state.authenticate.login);
  let sentByEmail;
  if(localStorage.getItem("senderEmailId")!==null){
    sentByEmail = localStorage.getItem("senderEmailId").replace(/[@.]/g, "");
  } 
  async function loadInbox(){
    const response = await fetch(
      `https://mailbox-6509c-default-rtdb.firebaseio.com/${sentByEmail}/inbox.json`
    );
    const data = await response.json();
    
    try {
      if(data !== null){
        if (response.ok) {
            let counter = 0;
            for (const item in data) {
                if (data[item].unread === "true") {
                    counter = counter + 1;
                }
            }
            dispatch(welcomeAction.updateCount(counter));
        } else {
            throw new Error("empty");
        }
      }else {
        throw new Error("empty");
      }
    } catch (error) {
      dispatch(welcomeAction.updateCount(0));
    }
    clearTimeout()
    
}
  setInterval(loadInbox,5000);

  function setOption(e) {
    dispatch(
      welcomeAction.setOptions(e.target.parentElement.value || e.target.value)
    );
  }
  function logoutHandler() {
    dispatch(authAction.loginHandler(null));
    localStorage.removeItem("idToken");
    localStorage.removeItem("senderEmailId");
  }
  return (
    <div style={{ position: "fixed" }}>
      <Navbar bg="dark" style={{ width: "100vw" }}>
        <Container>
          <Navbar.Brand>
            <h1
              className="fa-solid fa-envelope fa-lg"
              style={{ color: "#f1f2f4" }}
            >
              {" "}
              WELCOME TO MAILBOX
            </h1>
          </Navbar.Brand>
          <Button variant="danger" onClick={logoutHandler}>
            LOGOUT
          </Button>
        </Container>
      </Navbar>
      <Navbar bg="dark" style={{ width: "10vw", height: "70vh", top: "10vh" }}>
        <Container
          className="d-grid justify-content-center"
          style={{ rowGap: "8rem" }}
        >
          <Button
            variant={option === "compose" ? "warning" : "light"}
            value="compose"
            onClick={setOption}
          >
            COMPOSE
          </Button>
          <Button
            variant={option === "inbox" ? "warning" : "light"}
            value="inbox"
            onClick={setOption}
          >
            INBOX
            {count > 0 && <Badge bg="secondary">{count}</Badge>}
          </Button>
          <Button
            variant={option === "sent" ? "warning" : "light"}
            value="sent"
            onClick={setOption}
          >
            SENT
          </Button>
        </Container>
      </Navbar>
      {loggingOut === null && (
        <Route path='*'>
          <Redirect to="/" />
        </Route>
      )}
    </div>
  );
};

export default Header;
