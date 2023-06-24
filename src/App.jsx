import React from "react";

import Home from "./pages/Home";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css'


function App() {
  return (
    <div className="app">
      <ToastContainer autoClose={1300} />
      <Header />
      <main className="main">
        <Home />
      </main>
    </div>
  );
}

export default App;
