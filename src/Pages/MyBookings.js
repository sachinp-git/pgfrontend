import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { getUserBookingDetails } from "../Actions/appointment.js";
import jstz from "jstz";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    width: "75%",
    marginTop: theme.spacing.unit * 1,
    overflowX: "auto",
    marginLeft: "auto",
    marginRight: "auto"
  },
  table: {
    minWidth: 100
  }
});

class MyBookings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timezone: sessionStorage.getItem("timezone") || jstz.determine().name(),
      username: sessionStorage.getItem("username"),
      dataLoaded: false
    };
  }

  render() {
    const { classes } = this.props;
    if (!this.state.dataLoaded) {
      console.log("DATA is loading");
      return <h1>LOADING</h1>;
    }

    return (
      <Paper className={classes.root}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography
            variant="headline"
            color="inherit"
            className={classes.caption}
            align="left"
          >
            Appointments For {this.state.username}
          </Typography>
          <Typography
            variant="headline"
            color="inherit"
            className={classes.caption}
            align="right"
          >
            {this.state.timezone}
          </Typography>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Appoinment With</TableCell>
              <TableCell>Day</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.appointMentData.map((d, it) => {
              return (
                <TableRow key={it}>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.day}</TableCell>
                  <TableCell>{d.time}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
  componentDidMount() {
    if (!this.state.username) {
      this.props.history.push("/");
    } else {
      const { username, timezone } = this.state;
      getUserBookingDetails(username, timezone)
        .then(res => {
          this.setState({
            appointMentData: [...res],
            dataLoaded: true
          });
        })
        .catch(error => {
          console.log(error, "error");
          this.setState({
            errorMessage: "Could Not Load Data",
            dataLoaded: true
          });
        });
    }
  }
}

export default withStyles(styles)(MyBookings);
