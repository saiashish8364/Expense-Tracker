import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../Context/context";

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
    history.push("/Login");
    setShowLogout(false);
    ctx.isLoggenIn = false;
  };
  return (
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
        <p>Products</p>
        <p>About Us</p>
        {showLogout && (
          <button
            onClick={logoutHandler}
            style={{
              color: "black",
              backgroundColor: "white",
              height: "25px",
              marginTop: "3%",
              borderRadius: "10px",
              width: "10%",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navig;
