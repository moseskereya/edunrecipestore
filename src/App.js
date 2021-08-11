import './App.css';
import Home from "./components/Home"
import {BrowserRouter as Router, Route, Switch}  from "react-router-dom"
import DetailsPage from './DetailsPage';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/DetailsPage/:id" component={DetailsPage} />
            </Switch>
      </Router>
   
  );
}

export default App;
