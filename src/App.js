import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './firebase-config';

import { UserContext } from './store/UserContext';

import HomePage from './pages/HomePage';
import RequestAutopartForm from './pages/RequestAutopartForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mainnav from './menu/Mainnav';
import MyRequests from './pages/MyRequests';
import GetUserData from './store/GetUserData';
import MyOrders from './pages/MyOrders';

export default function App() {
  const [user,setUser] = useState(false);
  const [currentUserData, setCurrentUserData] = useState([])

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
      <UserContext.Provider value={currentUserData}>

      {user != false && <GetUserData setUserData={(user)=>setCurrentUserData(user)}/>}
      <Mainnav/>
      {console.log("email :",currentUserData.email)}
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/requestAutopartForm" element={user!=false ? <RequestAutopartForm/> : <Login/>}/>
          <Route path="/myRequests" element={user!=false ? <MyRequests/> : <Login/>}/>
          <Route path="/myOrders" element={user!=false ? <MyOrders/> : <Login/>}/>
        </Routes>
      </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
