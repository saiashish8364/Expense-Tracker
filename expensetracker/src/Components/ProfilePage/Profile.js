import { useRef } from "react";

const Profile = () => {
  const nameInputRef = useRef();
  const urlInputRef = useRef();
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
      <h2>Contact Details:</h2>
      <section>
        <form onSubmit={updateSubmitHandler}>
          <label>Full Name:</label>
          <input type="text" ref={nameInputRef} />
          <label>Profile Photo URL:</label>
          <input type="text" ref={urlInputRef} />
          <br />
          <button type="submit">Update</button>
        </form>
      </section>
    </>
  );
};
export default Profile;
