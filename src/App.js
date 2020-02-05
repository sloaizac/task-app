import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Principal from './components/Principal';
import Post from './components/Post'
import Navigation from './components/Navigation'

class App extends React.Component {

  render() {
    return <div>
      <Router>
        <Navigation />
        <Route exact path='/' component={Principal} />
        <Route path='/post' component={Post} />
      </Router>
    </div>
  }
}


export default App;
