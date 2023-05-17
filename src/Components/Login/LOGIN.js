import { useRef, useState } from "react";
import { Form, NavLink, Button, FloatingLabel, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { authAction } from "../Store/authSlice";
const LOGIN = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.authenticate.login);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [login, setLogin] = useState(true);
  const [newPassword, setNewPassword] = useState(false);
  function setPasswordHandler() {
    if (newPassword) {
      setNewPassword(false);
    } else {
      setNewPassword(true);
    }
  }
  function setLoginHandler() {
    if (login) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }

  async function addData(e) {
    e.preventDefault();
    if (!login) {
      if (passwordRef.current.value === confirmRef.current.value) {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCmmeJgXKnKHIweaNdNZLYPtiHk4wtGRlE`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
          }
        );
        const data = await response.json();
        try {
          if (response.ok) {
            emailRef.current.value = "";
            passwordRef.current.value = "";
            confirmRef.current.value = "";
            alert("User added");
            setLogin(true);
          } else {
            throw new Error();
          }
        } catch (error) {
          alert(data.error.message);
        }
      } else {
        alert("Password not matching");
      }
    } else if (login && newPassword) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCmmeJgXKnKHIweaNdNZLYPtiHk4wtGRlE`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
        }
      );
      const data = await response.json();
      try {
        if (response.ok) {
          alert("Email sent");
          setNewPassword(false);
          emailRef.current.value = "";
        } else {
          throw new Error();
        }
      } catch (error) {
        alert(data.error.message);
      }
    } else {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmmeJgXKnKHIweaNdNZLYPtiHk4wtGRlE`,
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      try {
        if (response.ok) {
          emailRef.current.value = "";
          passwordRef.current.value = "";
          const token = localStorage.setItem("idToken", data.idToken);
          const senderEmailId=localStorage.setItem('senderEmailId',data.email)
          dispatch(authAction.loginHandler(senderEmailId));
          dispatch(authAction.setToken(token));
        } else {
          throw new Error();
        }
      } catch (error) {
        alert(data.error.message);
      }
    }
  }
  return (
    <div
      style={{
        top: "8rem",
        position: "absolute",
        backgroundColor: "rgb(22 24 24 / 87%)",
        width: "50%",
        left: "25%",
        borderStyle: "solid",
        fontSize:'larger'
      }}
    >
      <h1
        style={{ backgroundColor: "#000000b5", color: "aqua" }}
        className="text-center mb-4"
      >
        {!newPassword&&(login ? "LOGIN" : "SIGN UP")}
        {newPassword&&"CHANGE PASSWORD"}
      </h1>
      <div className="container">
      {newPassword&&<span style={{fontWeight:'bold',color:'white'}}>Enter the registered Email</span>}
        <Form className="d-grid" onSubmit={addData}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              required
            />
          </FloatingLabel>
          {!newPassword&&<FloatingLabel 
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Enter password"
              ref={passwordRef}
              required
            />
          </FloatingLabel>}
          {!login && (
            <FloatingLabel
              controlId="floatingInput"
              label="Confirm Password"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Enter password"
                ref={confirmRef}
                required
              />
            </FloatingLabel>
          )}
          {!newPassword&&<Button className="m-3 p-3" variant="primary" type="submit">
            {login ? "LOGIN" : "SIGN UP"}
          </Button>}
          {!newPassword&&login&&
          <NavLink style={{fontWeight:'bold',color:'blue'}} className="d-flex justify-content-center mb-3"  onClick={setPasswordHandler}>
              Forgot Password ?
            </NavLink>
          }
          {newPassword&&<Button className="mb-3" variant="primary" type="submit">SEND LINK</Button>}
          <Card
            body
            style={{ backgroundColor: "rgb(216 216 231 / 58%)", margin: "0 8rem" }}
          >
            <div className="d-flex justify-content-center">
              {!newPassword&&login ? "Don't have an account?" : "Already have an account?"}
              <NavLink
                onClick={setLoginHandler}
                style={{ fontWeight: "bold", color: "blue" }}
              >
                {!newPassword&&(!login ? "LOGIN" : "SIGN UP")}
              </NavLink>
              {newPassword&&<NavLink style={{fontWeight:'bold',color:'blue'}} onClick={setPasswordHandler}>
              LOGIN
            </NavLink>}
            </div>
          </Card>
          ;
        </Form>
        {loginState!==null && (
          <Route>
            <Redirect to="/WELCOME" />
          </Route>
        )}
      </div>
    </div>
  );
};

export default LOGIN;
