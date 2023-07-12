import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Navig = () => {
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
      </div>
    </nav>
  );
};
export default Navig;
