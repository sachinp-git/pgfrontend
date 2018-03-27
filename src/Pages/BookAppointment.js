import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    FormHelperText,
  } from 'material-ui/Form';
  import Button from 'material-ui/Button';

  import Checkbox from 'material-ui/Checkbox';
  import { withStyles } from 'material-ui/styles'; 
 import TextField from 'material-ui/TextField';
 import bookAppointment from '../Actions/bookappointment.js'
const moment=require('moment')

const styles = theme => ({
    container: {
      textAlign:"center",
      display:"flex",
      flexDirection:"vertical"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    Loginbutton:{
        width:"75%",
        margin:"auto",
        marginTop:"30px",
        borderRadius:"15px"
    }
});

class BookAppointment extends Component {
    constructor(props){
        console.log(props)
        
        super(props);
        let today=moment().format('YYYY-MM-DD')
        this.state={
            dataLoaded:false,
            bookedDates:null,
            selectedDate:today,
            today,
            newSlots:[],
            appointmentWith:this.props.match.params.appointmentWith,
        }
    }
    handleCheckbox=(e)=>{
        console.log(this.state)
        let value = e.target.value
        if(e.target.checked){
           var newArray=this.state.newSlots.concat(value)
        }
        else{
           let removeIndex=this.state.newSlots.indexOf(value)
           this.state.newSlots.splice(removeIndex,1)
           var newArray=[...this.state.newSlots]
        } 
        this.setState({
         newSlots:newArray
        })
    }
    handleSubmit=e=>{
        if(this.state.newSlots.length<1){
            alert("Please Choose a Slot")
            return
        }
        else{
            let response=bookAppointment(this.state.newSlots,this.state.appointmentWith)
        }
    }

    handleDateChange=(e)=>{
        if(e.target.value!=this.state.selectedDate)      
        this.setState({
            newSlots:[],
            selectedDate:e.target.value,
        })
        console.log(e.target.value)
    }
     
    generateTimeCells=(bool,hourNow)=>{
        let cells=[]
       for(let i=hourNow;i<24;i++){
         let hourFormat = parseInt(i/10)==0 ? "0"+i+":00 " : i+":00 "
         
         let DateTimeFormat=this.state.selectedDate+"T"+hourFormat
           if(bool && this.state.bookedDates.indexOf(DateTimeFormat)){
              cells.push(
                <FormControlLabel
                control={
                  <Checkbox
                    disabled
                    color="primary"
                  />
                }
                label={hourFormat+" Not Available" }
              />
    
              )
           }
           else{
            cells.push(
                <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleCheckbox}
                    value={DateTimeFormat}
                    color="primary"
                  />
                }
                label={hourFormat}
              />
            )
           }
       }
       return cells
    }

    render() {
        console.log(this.state)
        if(!this.state.dataLoaded){
            return <h1>LOADING</h1>
        }
        const { classes } = this.props;
        let hourNow;
        if(this.state.selectedDate!=this.state.today){
            hourNow = 0
        }
        else{
            hourNow=parseInt(moment().add(1,'hour').format('HH'))
        }
        let cells=[];
        if(this.state.bookedDates[this.state.selectedDate]){
            cells=this.generateTimeCells(true,hourNow)
        }
        else{
            cells=this.generateTimeCells(false,hourNow)
        }  
        
      return (
        <div className="bookappointment">
          <form className={classes.container} noValidate>
           <TextField
             id="date"
             label="Select Date"
             type="date"
             defaultValue={this.state.today}
             className={classes.textField}
             onChange={this.handleDateChange}
             InputLabelProps={{
             shrink: true,
             }}
            />
         <FormControl component="fieldset">
            <FormLabel component="legend">Choose Time slot</FormLabel>
             <FormGroup> 
                 {cells}
             </FormGroup>
             <Button variant="raised" size="large" color="primary" className={classes.Loginbutton}  onClick={this.handleSubmit}>
               Book Appointment
             </Button>   
         </FormControl>
         </form>       
        </div>
      );
    }

    componentDidMount(){
        this.setState({
            bookedDates:[
               '2018-03-27T10:00',
                '2018-03-27T12:00',
                '2018-03-27T17:00'],
            dataLoaded:true
        })

    }
  }
  
  export default withStyles(styles)(BookAppointment);
  