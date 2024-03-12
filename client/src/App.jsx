import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from '../pages/Home';
import CreateRecipe from '../pages/CreateRecipe';
import SavedRecipes from '../pages/savedRecipes';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Navbar from './components/Navvbar';


const App=() =>{
  return (
    <div className="App">
      <Router>
       <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create-recipe" element={<CreateRecipe/>} />
          <Route path="/saved-recipes" element={<SavedRecipes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;