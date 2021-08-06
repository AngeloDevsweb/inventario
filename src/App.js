import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navegacion from './components/Navegacion'
import AlmacenUno from './components/AlmacenUno'
import AlmacenDos from "./components/AlmacenDos";
import AlmacenTres from "./components/AlmacenTres";

function App() {
  return (
    <Router>
    <Navegacion/>
    <Route path="/" exact component={AlmacenUno} />
    <Route path="/almacendos" component={AlmacenDos} />
    <Route path="/almacentres" component={AlmacenTres} />
    <ToastContainer />
  </Router>
  );
}

export default App;
