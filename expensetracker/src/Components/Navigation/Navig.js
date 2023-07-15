import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Suspense } from "react";
import Home from "../HomePage/Home";
import Profile from "../ProfilePage/Profile";
import PassReset from "../PasswordReset/PassReset";
import Expenses from "../Expenses/Expenses";
import SignUp from "../SignUpPage/SignUp";
import LogIn from "../LoginPage/LogIn";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthSlice";
import { themeActions } from "../Store/ThemeReducer";
import themeIcn from "../../Theme/theme.jpg";

const Navig = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const total = useSelector((state) => state.expense.total);
  let isTot = false;
  if (total > 10000) {
    isTot = true;
  }
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(authActions.logout());
    history.push("/Login");
  };
  const themeChangeHandler = () => {
    dispatch(themeActions.changeTheme());
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
          {isAuth && (
            <button
              onClick={themeChangeHandler}
              style={{
                height: "35px",
                width: "25",
                marginTop: "20px",
                borderRadius: "5px",
                fontWeight: "bolder",
                marginLeft: "-30px",
              }}
            >
              <img
                style={{ height: "22.5px", width: "22.5px" }}
                src={themeIcn}
                alt="T"
              />
            </button>
          )}
          <h1>Expense Tracker</h1>
          <NavLink to="/Home">
            <p style={{ color: "white" }}>Home</p>
          </NavLink>
          <NavLink to="/Expenses">
            <p style={{ color: "white" }}>Expenses</p>
          </NavLink>

          <p>About Us</p>

          {isAuth && (
            <button
              onClick={logoutHandler}
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "black",
                backgroundColor: "white",
                height: "30px",
                marginTop: "20px",
                borderRadius: "10px",
                width: "80px",
              }}
            >
              Logout
            </button>
          )}
          {isAuth && isTot && (
            <button
              style={{
                fontWeight: "bold",
                fontSize: "0.85rem",
                color: "black",
                backgroundColor: "gold",
                height: "45px",
                marginTop: "15px",
                borderRadius: "10px",
                width: "90px",
              }}
            >
              Activate Premium
            </button>
          )}
        </div>
      </nav>
      <main>
        <Suspense>
          <Switch>
            <Route path="/Home" exact>
              {isAuth && <Home />}
              {!isAuth && <LogIn />}
            </Route>
            <Route path="/" exact>
              {!isAuth && <SignUp />}
              {isAuth && <Home />}
            </Route>
            <Route path="/Login" exact>
              {<LogIn />}
            </Route>
            <Route path="/Profile" exact>
              {isAuth && <Profile />}
              {!isAuth && <LogIn />}
            </Route>
            <Route path="/PassReset" exact>
              <PassReset />
            </Route>
            <Route path="/Expenses" exact>
              {isAuth && <Expenses />}
              {!isAuth && <LogIn />}
            </Route>
          </Switch>
        </Suspense>
      </main>
    </>
  );
};
export default Navig;
