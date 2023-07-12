import React, { useEffect, useState } from "react";
const Context = React.createContext({
  isLoggenIn: false,
  setLogin: () => {},
});

export const ContextProvider = (props) => {
  const [token, setToken] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(true);
    }
  }, []);
  function setLoginCalled() {
    setToken(true);
  }
  const loginState = {
    isLoggenIn: token,
    setLogin: setLoginCalled,
  };
  return (
    <Context.Provider value={loginState}>{props.children}</Context.Provider>
  );
};

export default Context;
