import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './firebase-config';

import './App.css';

import HomePage from './pages/HomePage';
import RequestAutopartForm from './pages/RequestAutopartForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mainnav from './menu/Mainnav';
import MyRequests from './pages/requests/MyRequests';

export default function App() {
  const [user,setUser] = useState(false);

  useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
          if(authUser) {
              setUser(authUser);
              console.log("current user is: ", authUser);
          } else {
              console.log("no user logged in");
              setUser(false);
          }
      })
  }, [])  

  return (
      <BrowserRouter>
      <Mainnav/>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/requestAutopartForm" element={user!=false ? <RequestAutopartForm/> : <Login/>}/>
          <Route path="/myRequests" element={user!=false ? <MyRequests/> : <Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
