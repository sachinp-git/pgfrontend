import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import TextField from "material-ui/TextField";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { login } from "../Actions/loginAction.js";
import "./Login.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  formControl: {
    width: "50%",
    margin: "auto",
    fontSize: "20px"
  },
  Loginbutton: {
    width: "55%",
    margin: "auto",
    marginTop: "50px",
    borderRadius: "15px"
  },
  Registerbutton: {
    width: "55%",
    margin: "auto",
    borderRadius: "15px"
  },
  caption: {
    marginTop: "50px"
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      passwordError: false
    };
  }

  handleChange = event => {
    switch (event.target.id) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
    }
  };
  handleSubmit = event => {
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };
    login(credentials)
      .then(res => {
        sessionStorage.setItem("username", res.userName);
        sessionStorage.setItem("timezone", res.timezone);
        this.props.history.push("/mybookings");
      })
      .catch(error => {
        console.log("ERROR", error);
        switch (error.code) {
          case 402:
            this.setState({
              passwordError: true,
              emailError: false
            });
            break;
          case 401:
          case 400:
            this.setState({
              passwordError: true,
              emailError: true
            });
            break;
        }
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="login">
        <Typography variant="display3" color="inherit">
          LOGIN
        </Typography>
        <FormControl className={classes.formControl}>
          {this.state.emailError ? (
            <TextField
              error
              id="email"
              label="Invalid Email"
              className={classes.textField}
              //value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
          ) : (
            <TextField
              id="email"
              label="Email Id"
              className={classes.textField}
              // value={this.state.email}
              onChange={this.handleChange}
              margin="normal"
            />
          )}
          {this.state.passwordError || this.state.emailError ? (
            <TextField
              error
              id="password"
              label="Invalid Password"
              defaultValue=""
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              margin="normal"
            />
          ) : (
            <TextField
              id="password"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              onChange={this.handleChange}
              margin="normal"
            />
          )}

          <Button
            variant="raised"
            size="large"
            color="primary"
            className={classes.Loginbutton}
            onClick={this.handleSubmit}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            color="inherit"
            className={classes.caption}
          >
            Don't have an account yet?
          </Typography>
          <Button
            variant="raised"
            size="large"
            color="primary"
            className={classes.Registerbutton}
            component={Link}
            to="/register"
          >
            Register
          </Button>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
