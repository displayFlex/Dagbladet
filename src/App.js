import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListArticles from "./components/ListArticles"
import Titles from "./components/Titles"
import MyProvider from "./components/MyProvider"
import './App.css';


const App = () => {

  return (
    <MyProvider>
      <Router>
        <div className="container">

          <nav className="d-flex justify-content-center" >
            <ul>
              <li>
                <Link to="/">List of articles</Link>
              </li>
              <li>
                <Link to="/titles">List of titles</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <ListArticles />
            </Route>
            <Route exact path="/titles">
              <Titles />
            </Route>
          </Switch>

        </div>
      </Router>
    </MyProvider>
  );
}


export default App