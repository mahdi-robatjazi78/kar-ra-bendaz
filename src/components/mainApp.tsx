import React, { useContext, useState } from "react";
import ThemeContext from "../context/colorModeContext";
import Header from "./header";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Main = (props) => {
  const { isDarkMode, setIsDarkMode } = props;

  const theme = useContext(ThemeContext);
  console.log(">>theme", theme);

  const [userSignupData, setUserSignupData] = useState<ISignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  return (
    <main
      style={{
        transition: "background .4s ease",
        backgroundColor: theme.background,
        height: "89vh",
        width: "100%",
        overflow:"hidden"
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="signup"
            element={
              <Signup
                userSignupData={userSignupData}
                setUserSignupData={setUserSignupData}
              />
            }
          />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* <h1 style={{color:theme.foreground , margin:0}}>hay this is main</h1> */}
    </main>
  );
};

export default Main;
