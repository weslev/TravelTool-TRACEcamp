import React from 'react';
import List from './components/List';
import CountryPage from './components/CountryPage';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="d-flex flex-column">
      <Router>
        <div id="page-content">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink class="navbar-brand" to="/">Home</NavLink>
            </nav>
        </div>
              
        <Route path="/" exact component={List}/>
        <Route path={`/:name`} component={CountryPage}/>
        <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
        <div class="container text-center">
          <small>Copyright &copy; Your Website</small>
        </div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
