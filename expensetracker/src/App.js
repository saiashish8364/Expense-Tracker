import "./App.css";

//import { useContext } from "react";
//import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Navig from "./Components/Navigation/Navig";

//import Context from "./Components/Context/context";

function App() {
  //const ctx = useContext(Context);
  // const history = useHistory();
  // if (ctx.isLoggenIn) {
  //   history.push("/Home");
  // }
  return (
    <>
      <Navig />
    </>
  );
}

export default App;
