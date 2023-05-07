import React from "react";
import LOGIN from "./Components/Login/LOGIN";
import { Switch,Route,  } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Components/Store/store";
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
        </Switch>
    </Provider>
    </>
  );
};

export default App;
