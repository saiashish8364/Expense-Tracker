import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <>
      <h1> Welcome to Expense Tracker</h1>
      <p>
        your profile is incomplete.<NavLink to="/Profile">complete now</NavLink>
      </p>
    </>
  );
};
export default Home;
