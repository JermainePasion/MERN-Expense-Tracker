import React from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp'; 
import Home from './screens/DashBoard/Home';
import Income from './screens/DashBoard/Income';
import Expense from './screens/DashBoard/Expense';
import UserProvider from './context/userContext';

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path = "/" element = {<Root/>} />
            <Route path = "/login" exact element = {<Login/>} />
            <Route path = "/signup" exact element = {<SignUp/>} />
            <Route path = "/home" exact element = {<Home/>} />
            <Route path = "/income" exact element = {<Income/>} />
            <Route path = "/expense" exact element = {<Expense/>} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App;

const Root = () => {

  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated  ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to = "/login" />
  );

};