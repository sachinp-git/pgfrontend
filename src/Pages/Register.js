import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import jstz from 'jstz';
import './Login.css';
import {signup} from '../Actions/loginAction.js'

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width:"100%",
    },
    formControl: {
      width:"50%",
      margin:"auto",
      fontSize:"20px"
    },
    Loginbutton:{
        width:"55%",
        margin:"auto",
        marginTop:"50px",
        borderRadius:"15px"
    },
    Registerbutton:{
        width:"75%",
        margin:"auto",
    },
    caption:{
        marginTop:"50px"
    }
  });
  

class Register extends Component {
    constructor(props){
        super(props);
        const timezone = jstz.determine();
        
        this.state={
            fullName:"Sachin Pandey",
            emailId:"sachin.reaper94@gmail.com",
            passwordError:false,
            emailError:false,
            nameError:false,
            timezone:timezone.name()
        }
    }

    handleChange = event => {
        switch(event.target.id){
            case "name":
            this.setState({ fullName: event.target.value })
               break;
            case "email":
            this.setState({ email: event.target.value })
               break;
            case "password":
            this.setState({ password: event.target.value })
               break;
        }
      };

      handleSubmit = event => {
        let credentials={
            email:this.state.email,
            password:this.state.password,
            name:this.state.fullName
        }  
        signup(credentials).then((res)=>{
          console.log(res)
         if(res==200){
           alert("Successfully registered")
          this.props.history.push('/') 
        }
        }).catch(error=>{
          this.setState({
            passwordError:true,
            emailError:true,
            nameError:true,
          })
        })
        console.log(event.target,"$$$")
      };

  render() {
   
    const { classes } = this.props;

    return (
      <div className="register">
      <Typography variant="display3" color="inherit">
            Register With Us
          </Typography>
         <FormControl className={classes.formControl}>
         {this.state.nameError ?
         <TextField
         error
         id="fullName"
         label=" Invalid Full Name!! Type again"
         className={classes.textField}
         onChange={this.handleChange}
         margin="normal"
       />    
        :<TextField
          id="name"
          label="Full Name"
          className={classes.textField}
          onChange={this.handleChange}
          margin="normal"
        />}
         {this.state.emailError ? 
          <TextField
          error
          id="email"
          label="Invalid Email!! Type again"
          className={classes.textField}
          onChange={this.handleChange}
          margin="normal"/> :
          <TextField
            id="email"
            label="Email Id"
            className={classes.textField}
            onChange={this.handleChange}
            margin="normal"/>
        }
       {(this.state.passwordError || this.state.emailError) ? 
        <TextField
        error
        id="password"
        label="Invalid Password!! Type again"
        defaultValue=""
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        onChange={this.handleChange}
        margin="normal" /> :
        <TextField
          id="password"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          onChange={this.handleChange}
          margin="normal"
        />
        }
        <Typography variant="headline" color="inherit" className={classes.caption}>
            Detected Timezone is {this.state.timezone}
          </Typography>
         <Button variant="raised" size="large" color="primary" className={classes.Loginbutton} onClick={this.handleSubmit}>
          Sign Up
        </Button>
        </FormControl>

      </div>
    );
  }
}

export default withStyles(styles)(Register);
