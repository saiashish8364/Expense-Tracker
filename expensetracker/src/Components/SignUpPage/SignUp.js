import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState(false);
  const [pass, setpass] = useState(false);
  const [con, setCon] = useState(false);
  const mailInputRef = useRef();
  const passwordInputRef = useRef();
  const conformInputRef = useRef();
  const history = useHistory();
  function mailChangeHandler() {
    setEmail(true);
  }
  function passChangeHandler() {
    setpass(true);
  }
  function conChangeHandler() {
    setCon(true);
  }
  function navToLogin() {
    history.push("/Login");
  }

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      String(passwordInputRef.current.value) ===
      String(conformInputRef.current.value)
    ) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCCfgwCyOwJVyOt98XoUeYffa0QBCV_Yk",
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
          console.log("user created successfully.");
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    } else {
      alert("Password does not match!!");
    }

    mailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    conformInputRef.current.value = "";
    setEmail(false);
    setpass(false);
    setCon(false);
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
              Sign Up
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
            <label>Conform password:</label>
            <br />
            <input
              type="password"
              ref={conformInputRef}
              onChange={conChangeHandler}
            />
            <br />
            <br />
            <button
              type="submit"
              disabled={email && pass && con ? false : true}
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "grey",
                color: "white",
                marginLeft: "5%",
              }}
            >
              Sign Up
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
            onClick={navToLogin}
          >
            Have an Account? Login
          </button>
        </form>
      </section>
    </>
  );
};
export default SignUp;
