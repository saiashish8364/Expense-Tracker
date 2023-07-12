import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <>
      <div
        style={{ justifyContent: "center", display: "flex", marginTop: "20px" }}
      >
        <h1> Welcome to Expense Tracker!</h1>
      </div>
      <section
        style={{
          justifyContent: "space-evenly",
          display: "flex",
          fontSize: "1.10rem",
          marginTop: "50px",
        }}
      >
        <p>
          your profile is incomplete.
          <NavLink to="/Profile">complete now</NavLink>
        </p>
      </section>
    </>
  );
};
export default Home;
