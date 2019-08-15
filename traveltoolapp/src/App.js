import React from 'react';
import List from './components/List';
import CountryPage from './components/CountryPage';
import { BrowserRouter as Router, Route, /*Link*/ } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={List}/>
        <Route path={`/:name`} component={CountryPage}/>
      </Router>
    </div>
  );
}

export default App;
