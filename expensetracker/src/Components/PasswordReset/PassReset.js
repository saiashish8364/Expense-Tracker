import { useRef } from "react";

function PassReset() {
  const emailInputRef = useRef();
  const resetHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBCCfgwCyOwJVyOt98XoUeYffa0QBCV_Yk",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailInputRef.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        alert("Reset link sent to mail");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        style={{
          marginTop: "10%",
          justifyContent: "center",
          marginLeft: "33%",
          fontSize: "1.15rem",
        }}
      >
        <label>Email:</label>
        <input style={{ marginLeft: "10px" }} ref={emailInputRef} />
        <br />
        <br />
        <button
          style={{
            marginLeft: "13.5%",
            height: "30px",
            width: "17.5%",
            fontSize: "1rem",
            backgroundColor: "black",
            color: "white",
            borderRadius: "25px",
          }}
          onClick={resetHandler}
        >
          Submit
        </button>
      </form>
    </>
  );
}
export default PassReset;
