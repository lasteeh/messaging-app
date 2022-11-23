import React from "react";
import { Routes, Route } from "react-router-dom";
import Body from "./layout/Body";
import Login from './pages/Login';
import { ApiContextProvider } from './context/apiContext'

function App() {
  return (
    <ApiContextProvider>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Home" element={<Body/>}/>
      </Routes>
    </ApiContextProvider>
  );
}

export default App;