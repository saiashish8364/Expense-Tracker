import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../Context/context";
import SignUp from "../SignUpPage/SignUp";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Suspense } from "react";
import LogIn from "../LoginPage/LogIn";
import Home from "../HomePage/Home";
import Profile from "../ProfilePage/Profile";
import PassReset from "../PasswordReset/PassReset";
import Expenses from "../Expenses/Expenses";

const Navig = () => {
  const ctx = useContext(Context);
  const [showLogout, setShowLogout] = useState(ctx.isLoggenIn);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setShowLogout(true);
    }
  }, [ctx.isLoggenIn]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    history.push("/Login");
    setShowLogout(false);
    ctx.isLoggenIn = false;
  };
  return (
    <>
      <nav
        style={{
          backgroundColor: "black",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginLeft: "3rem",
            marginRight: "3rem",
          }}
        >
          <h1>Expense Tracker</h1>
          <NavLink to="/Home">
            <p style={{ color: "white" }}>Home</p>
          </NavLink>
          <NavLink to="/Expenses">
            <p style={{ color: "white" }}>Expenses</p>
          </NavLink>

          <p>About Us</p>
          {showLogout && (
            <button
              onClick={logoutHandler}
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "black",
                backgroundColor: "white",
                height: "30px",
                marginTop: "2%",
                borderRadius: "10px",
                width: "80px",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      <main>
        <Suspense>
          <Switch>
            <Route path="/Home" exact>
              {ctx.isLoggenIn && <Home />}
              {!ctx.isLoggenIn && <LogIn />}
            </Route>
            <Route path="/" exact>
              {ctx.isLoggenIn && <Home />}
              {!ctx.isLoggenIn && <SignUp />}
            </Route>
            <Route path="/Login" exact>
              {ctx.isLoggenIn && <Home />}
              {!ctx.isLoggenIn && <LogIn />}
            </Route>
            <Route path="/Profile" exact>
              {ctx.isLoggenIn && <Profile />}
              {!ctx.isLoggenIn && <LogIn />}
            </Route>
            <Route path="/PassReset" exact>
              <PassReset />
            </Route>
            <Route path="/Expenses" exact>
              {ctx.isLoggenIn && <Expenses />}
              {!ctx.isLoggenIn && <LogIn />}
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
};
export default Navig;
