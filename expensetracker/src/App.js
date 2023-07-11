import "./App.css";
import SignUp from "./Components/SignUpPage/SignUp";

import Navig from "./Components/Navigation/Navig";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Suspense } from "react";
import LogIn from "../src/Components/LoginPage/LogIn";
import Home from "./Components/HomePage/Home";
import Profile from "./Components/ProfilePage/Profile";
function App() {
  return (
    <>
      <Navig />
      <main>
        <Suspense>
          <Switch>
            <Route path="/Home" exact>
              <Home />
            </Route>
            <Route path="/" exact>
              <SignUp />
            </Route>
            <Route path="/Login" exact>
              <LogIn />
            </Route>
            <Route path="/Profile" exact>
              <Profile />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
