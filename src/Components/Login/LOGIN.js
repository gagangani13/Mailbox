import { useRef,useState } from "react";
import { Form, NavLink, Button, FloatingLabel,Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route,Redirect } from "react-router-dom";
import { authAction } from "../Store/authSlice";
const LOGIN = () => {
  const dispatch=useDispatch()
  const loginState=useSelector((state)=>state.authenticate.login)
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [login, setLogin] = useState(true);

  function setLoginHandler() {
    if (login) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  }

  async function addData(e) {
    e.preventDefault();
    if(!login){
      if (passwordRef.current.value === confirmRef.current.value) {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8`,
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
            emailRef.current.value=''
            passwordRef.current.value=''
            confirmRef.current.value=''
            alert("User added");
            setLogin(true)
          } else {
            throw new Error();
          }
        } catch (error) {
          alert(data.error.message);
        }
      } else {
        alert("Password not matching");
      }
    }
    else{
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXPzqlI6fvUIQX7LiIqUK-vdC_dfWQ0q8`,
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
          emailRef.current.value=''
          passwordRef.current.value=''
          const token=localStorage.setItem('idToken',data.idToken)
          const userId=localStorage.setItem('userId',data.localId)
          dispatch(authAction.loginHandler())
          dispatch(authAction.setToken(token))
          dispatch(authAction.setUserId(userId))
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
        backgroundColor: "#48d9cf3b",
        width: "50%",
        left: "25%",
        borderStyle: 'solid'
      }}
    >
      <h1 style={{     backgroundColor: '#000000b5',
    color: 'aqua'}} className="text-center mb-4">
        {login ? "LOGIN" : "SIGN UP"}
      </h1>
      <div className="container">
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
          <FloatingLabel 
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
          </FloatingLabel>
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
          <Button className="m-3 p-3" variant="primary" type="submit">
            {login ? "LOGIN" : "SIGN UP"}
          </Button>
          <Card body style={{backgroundColor: '#d8d8e761',margin: '0 10rem'}} >
          <div className="d-flex justify-content-center">
            {login ? "Don't have an account?" : "Already have an account?"}
            <NavLink onClick={setLoginHandler} style={{fontWeight:'bold',color:'blue'}}>
              {!login ? "LOGIN" : "SIGN UP"}
            </NavLink>
          </div>
            </Card>;
        </Form>
        {loginState&&<Route>
          <Redirect to="/WELCOME"/></Route>}
      </div>
    </div>
  );
};

export default LOGIN;
