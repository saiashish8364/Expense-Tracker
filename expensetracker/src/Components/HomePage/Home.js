import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
const Home = () => {
  const [notVerify, setVerify] = useState(true);
  const theme = useSelector((state) => state.theme.themeShow);
  async function fetchOnLoad() {
    try {
      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBCCfgwCyOwJVyOt98XoUeYffa0QBCV_Yk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: String(localStorage.getItem("token")),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        const data = await resp.json();
        if (data.users[0].emailVerified) {
          setVerify(false);
        }
      }
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchOnLoad();
  }, []);
  const verifyMail = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBCCfgwCyOwJVyOt98XoUeYffa0QBCV_Yk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("token"),
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        //console.log(data);
        alert(`mail sent to ${data.email}`);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div style={{ backgroundColor: theme ? "grey" : "white", height: "750px" }}>
      <div
        style={{
          justifyContent: "center",
          display: "flex",
        }}
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
      <div>
        {notVerify && (
          <button
            onClick={verifyMail}
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "45%",
              marginTop: "5%",
              color: "white",
              backgroundColor: "black",
              width: "12.5%",
              height: "25px",
              borderRadius: "25px",
            }}
          >
            Verify E-Mail
          </button>
        )}
      </div>
    </div>
  );
};
export default Home;
