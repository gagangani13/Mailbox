import React from "react";
import { Navbar, Container, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { welcomeAction } from "./Store/welcomeSlice";
import { authAction } from "./Store/authSlice";
import { Route, Redirect } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const option = useSelector((state) => state.welcomeReducer.options);
  const count = useSelector((state) => state.welcomeReducer.count);
  const mails = useSelector((state) => state.welcomeReducer.inbox);
  const loggingOut = useSelector((state) => state.authenticate.login);
  if (option === "inbox" && mails) {
    const counter = mails.reduce((acc, curr) => {
      if (curr.unread === "true") {
        return acc + 1;
      }
      return acc;
    }, 0);
    console.log(counter);
    dispatch(welcomeAction.updateCount(counter));
  }else if(option==='inbox'&&mails===null){
    dispatch(welcomeAction.updateCount(0))
  }
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
      {loggingOut===null && (
        <Route>
          <Redirect to="/" />
        </Route>
      )}
    </div>
  );
};

export default Header;
