import React from "react";
import LOGIN from "./Components/Login/LOGIN";
import { Switch,Route, Redirect,  } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Components/Store/store";
import WELCOME from "./Components/Welcome/WELCOME";
const App = () => {
  
  return (
    <>
    <div style={{zIndex:'-1'}}>
    <img src="bg.jpg" alt="background" style={{width:'100vw',position:'fixed'}}/>
    </div>
    <Provider store={store}>
        <Switch>
          <Route path="/" exact>
            <LOGIN/>
          </Route>
          <Route path="/WELCOME" exact>
            <WELCOME/>
          </Route>
          <Route path='*'>
            <Redirect to='/WELCOME'/>
          </Route>
        </Switch>
    </Provider>
    </>
  );
};

export default App;
