import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Navigation from './components/Navigation';
import Notes from './components/Notes';
import ProjectList from './components/ProjectList';

class App extends React.Component {

  render() {
    return <div >
      <Router>
        <Navigation />
        <Route exact path='/' component={Notes}/>
        <Route path='/projects' component={ProjectList}/>
      </Router>
    </div>
  }
}


export default App;
