import { useRef } from "react";

const LogIn = () => {
  const mailInputRef = useRef();
  const passwordInputRef = useRef();
  const conformInputRef = useRef();
  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      String(passwordInputRef.current.value === conformInputRef.current.value)
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
        console.log(error);
      }
    } else {
      alert("Password does not match!!");
    }
  };
  return (
    <>
      <h1
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "4rem",
          color: "black",
        }}
      >
        Sign Up
      </h1>
      <section
        style={{
          justifyContent: "center",
          display: "flex",
          marginTop: "2.5rem",
        }}
      >
        <form onSubmit={loginSubmitHandler}>
          <label>E-Mail:</label>
          <br />
          <input type="text" ref={mailInputRef} />
          <br />
          <label>Password:</label>
          <br />
          <input type="password" ref={passwordInputRef} />
          <br />
          <label>Conform password:</label>
          <br />
          <input type="password" ref={conformInputRef} />
          <br />
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </>
  );
};
export default LogIn;
