import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Body from "./layout/Body";
import Frontpage from './pages/Frontpage';
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { ApiContextProvider } from './context/apiContext'

function App() {
  return (
    <ApiContextProvider>
      <Routes>
        <Route path="/" element={<Navigate to='/Slackapp/Login' replace={true}/>}/>
        <Route path="/Slackapp" element={<Frontpage/>}>
          <Route path="Login" element={<LoginForm/>}/>
          <Route path="Signup" element={<SignUpForm/>}/>
        </Route>
        <Route path="/Slackapp/Home" element={<Body/>}/>
        <Route path='*' element={<Navigate to='/Slackapp/Login' replace={true}/>}/>
      </Routes>
    </ApiContextProvider>
  );
}

export default App;