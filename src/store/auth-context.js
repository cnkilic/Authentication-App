/* Örnek Context */
import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, deadLine) => {
    localStorage.setItem("token", token);
    localStorage.setItem("deadLine", deadLine);
    console.log(deadLine);
    logoutTimer = setTimeout(logoutHandler, deadLine - Date.now());
    console.log(logoutTimer);

    setToken(token);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("deadLine");
    clearTimeout(logoutTimer);
  }, []);

  //USeEffect son 60000ms içerisinde eğer user sayfayı refreshlerse userı direk logout yapmamı sağlıyor
  useEffect(() => {
    if (token) {
      let timeLeft = localStorage.getItem("deadLine") - Date.now();
      if (timeLeft < 6000) logoutHandler();
      else logoutTimer = setTimeout(logoutHandler, timeLeft);
    }
  }, [token, logoutHandler]);

  const contexValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contexValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
