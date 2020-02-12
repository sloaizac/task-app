import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Principal from './components/Principal';
import Post from './components/Post'

class App extends React.Component {

  render() {
    return <div>
      <Router>
        <Route exact path='/' component={Principal} />
        <Route path='/post' component={Post} />
      </Router>
    </div>
  }
}


export default App;
