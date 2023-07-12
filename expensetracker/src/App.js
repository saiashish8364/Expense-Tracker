import "./App.css";
import SignUp from "./Components/SignUpPage/SignUp";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Navig from "./Components/Navigation/Navig";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Suspense } from "react";
import LogIn from "../src/Components/LoginPage/LogIn";
import Home from "./Components/HomePage/Home";
import Profile from "./Components/ProfilePage/Profile";
import PassReset from "./Components/PasswordReset/PassReset";
function App() {
  const history = useHistory();
  useEffect(() => {
    const log = localStorage.getItem("token");
    if (log) {
      history.push("/Home");
    }
  });
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
            <Route path="/PassReset" exact>
              <PassReset />
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
}

export default App;
