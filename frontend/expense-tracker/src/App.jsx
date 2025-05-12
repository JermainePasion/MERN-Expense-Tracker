
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/userContext';
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {Toaster} from "react-hot-toast"

import Login from './screens/Auth/Login';
import SignUp from './screens/Auth/SignUp'; 
import Home from './screens/DashBoard/Home';
import Income from './screens/DashBoard/Income';
import Expense from './screens/DashBoard/Expense';
import UserProvider from './context/userContext';
import Logout from './screens/Auth/Logout';
import { useUserAuth } from './hooks/useUserAuth';
import userAuthInitializer from './hooks/userAuthInitializer';

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
        <Toaster 
          toastOptions={{
            className: "",
            style: { fontSize: "12px" }
          }}
        />
      </Router>
    </UserProvider>
  );
}

const AppRoutes = () => {
  const { user } = useContext(UserContext);
  useUserAuth();

  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
      <Route path="/expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
    </Routes>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />;
};

export default App;
