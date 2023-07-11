import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState(false);
  const [pass, setpass] = useState(false);
  const mailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  function mailChangeHandler() {
    setEmail(true);
  }
  function passChangeHandler() {
    setpass(true);
  }
  function navToSignUp() {
    history.push("/");
  }

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCCfgwCyOwJVyOt98XoUeYffa0QBCV_Yk",
        {
          method: "POST",
          body: JSON.stringify({
            email: mailInputRef.current.value,
            password: passwordInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const res = await response.json();
        localStorage.setItem("token", res.idToken);
        history.push("/Home");
        console.log("user Logged in successfully.");
      } else {
        alert("Login failed!!!");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
    mailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    setEmail(false);
    setpass(false);
  };
  return (
    <>
      <section
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "2.5rem",
        }}
      >
        <form onSubmit={loginSubmitHandler}>
          <fieldset>
            <legend
              style={{
                justifyContent: "center",
                display: "flex",
                marginTop: "4rem",
                color: "black",
                fontSize: "2.25rem",
                fontWeight: "bold",
              }}
            >
              Log In
            </legend>
            <label>E-Mail:</label>
            <br />
            <input
              type="text"
              ref={mailInputRef}
              onChange={mailChangeHandler}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              ref={passwordInputRef}
              onChange={passChangeHandler}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={email && pass ? false : true}
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "grey",
                color: "white",
                marginLeft: "5%",
              }}
            >
              Log In
            </button>
          </fieldset>

          <button
            style={{
              width: "100%",
              marginTop: "1rem",
              backgroundColor: "lightgreen",
              color: "black",
              height: "10%",
            }}
            onClick={navToSignUp}
          >
            Don't Have an Account? SignUp
          </button>
        </form>
      </section>
    </>
  );
};
export default LogIn;
