import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shop from './components/Shop';
import Header from './components/Header';
import Success from './components/Success';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Route 
} from 'react-router-dom';




class App extends Component{


  render () {
    return (
    <Router>
      <Header />

      <Route exact path="/shop">
      <Shop />
      </Route>

      <Route exact path="/success">
        <Success />
      </Route>
      
      <Footer />
    </Router>
      

    
    );
    
  }
}


export default App;
