import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Body from "./layout/Body";
import Frontpage from './pages/Frontpage';
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import { ApiContextProvider } from './context/apiContext'
import { QueryClient, QueryClientProvider } from "react-query";

function App() {

  const queryClient = new QueryClient

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;