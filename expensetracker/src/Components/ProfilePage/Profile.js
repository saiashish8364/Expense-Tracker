import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const nameInputRef = useRef();
  const urlInputRef = useRef();
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
        nameInputRef.current.value = String(data.users[0].displayName);
        urlInputRef.current.value = data.users[0].photoUrl;
      }
    } catch (error) {
      alert(error);
    }
  }
  useEffect(() => {
    fetchOnLoad();
  }, []);
  async function updateSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBCCfgwCyOwJVyOt98XoUeYffa0QBCV_Yk",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("token"),
            displayName: nameInputRef.current.value,
            photoUrl: urlInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("updated.");
      } else {
        console.log("failed");
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <div
        style={{ backgroundColor: theme ? "grey" : "white", height: "750px" }}
      >
        <h2 style={{ marginLeft: "30px" }}>Contact Details:</h2>
        <section
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginLeft: "10%",
            fontSize: "1.15rem",
          }}
        >
          <form onSubmit={updateSubmitHandler}>
            <label>Full Name:</label>
            <br />
            <input
              type="text"
              ref={nameInputRef}
              style={{ width: "125%", height: "12%" }}
            />
            <br />
            <br />
            <label>Profile Photo URL:</label>
            <br />
            <input
              type="text"
              ref={urlInputRef}
              style={{ width: "125%", height: "12%" }}
            />
            <br />
            <br />
            <button
              type="submit"
              style={{
                width: "65%",
                height: "20%",
                fontSize: "1rem",
                marginLeft: "30%",
                backgroundColor: "black",
                color: "white",
                borderRadius: "25px",
              }}
            >
              Update
            </button>
          </form>
        </section>
      </div>
    </>
  );
};
export default Profile;
