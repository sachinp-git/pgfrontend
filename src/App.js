import React, { Component } from 'react';
import Login from './Pages/Login.js'
import Register from './Pages/Register.js'
import Mybookings from './Pages/MyBookings.js'
import BookAppointment from './Pages/BookAppointment.js'
import { Switch, Route } from 'react-router-dom'
import './App.css';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
      <AppBar position="static">
        <Toolbar>
           <Typography variant="title" color="inherit">
           Appointment App
           </Typography>
        </Toolbar>
      </AppBar>
      <div className="appContainer">
        <Switch>
           <Route exact path='/' component={Login}/>
           <Route exact path='/register' component={Register}/>
           <Route exact path='/book/:appointmentWith' component={BookAppointment}/>
           <Route exact path='/mybookings' component={Mybookings}/>
        </Switch>
      </div>  
      </div>
    );
  }
}

export default App;
