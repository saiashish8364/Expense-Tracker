import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Context from "../Context/context";

const LogIn = () => {
  const [email, setEmail] = useState(false);
  const [pass, setpass] = useState(false);
  const mailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();
  const ctx = useContext(Context);

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
        ctx.setLogin();
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
  const forgotPasswordHandler = () => {
    history.push("/PassReset");
  };
  return (
    <>
      <section
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "2.5rem",
          marginLeft: "10rem",
          width: "60%",
          height: "60%",
        }}
      >
        <form
          onSubmit={loginSubmitHandler}
          style={{ width: "50%", justifyContent: "center", height: "100%" }}
        >
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
              style={{
                width: "90%",
              }}
            />
            <br />
            <label>Password:</label>
            <br />
            <input
              type="password"
              ref={passwordInputRef}
              onChange={passChangeHandler}
              style={{
                width: "90%",
              }}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={email && pass ? false : true}
              style={{
                width: "40%",
                height: "20%",
                justifyContent: "center",
                backgroundColor: "grey",
                color: "white",
                marginLeft: "30%",
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
      <button
        onClick={forgotPasswordHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          width: "30%",
          marginTop: "0.5rem",
          color: "blue",
          height: "10%",
          padding: "1px",
          border: "none",
          background: "none",
          marginLeft: "33%",
        }}
      >
        Forgot password
      </button>
    </>
  );
};
export default LogIn;
