import {converToUtc,convertToLocalTimezone,convertAppointmentDetails} from '../utils/ConvertToLocalTimezone.js'
import axios from 'axios'
import {apiconfig} from '../APIS/apiconfig.js'
import jstz from 'jstz';
const moment = require('moment');



export function bookAppointment(slots,appointmentWith){
  let utcTimeSlots=converToUtc(slots)
  var username = sessionStorage.getItem('username');
  if(!username){
    username="Anonymous"
  }
  let url=apiconfig.basePath+apiconfig.bookappointment;
  let postData={
      utcTimeSlots,
      appointmentWith,
      username
  }
  axios.post(url,postData)
  .then((res)=>{
    if(res.data==200){
        alert("Successfully Booked Slot")
        document.location.reload()
    }
    else{
        alert("Could Not book Slot")
        document.location.reload()
    }
  }).catch((err)=>{
    alert("Could Not book Slot")
  })
}

export function getUserSlots(username){
    return new Promise((resolve,reject)=>{
        let url=apiconfig.basePath+apiconfig.getUserAppointmentSlots;
        const timezone = jstz.determine().name();
        let postData={
            username
        } 
       fetch(url, {
            body: JSON.stringify(postData),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
          })
          .then(response => response.json())
          .then(res=>{
            if(res.bookedDates){
            let localDateTime=convertToLocalTimezone(res.bookedDates,timezone)
            resolve(localDateTime)
           }
            else{
                reject(res)
            }
          }).catch(error=>{
              reject(error)
          })
    })
    
}

export function getUserBookingDetails(username,timezone){
    return new Promise((resolve,reject)=>{
        let url=apiconfig.basePath+apiconfig.getUserBookingDetails;
        let postData={
            username
        } 
       fetch(url, {
            body: JSON.stringify(postData),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
          })
          .then(response => response.json())
          .then(res=>{
              console.log(res,"fetch")
              if(res.bookedDates){
                let details=convertAppointmentDetails(res.bookedDates,timezone)
                console.log(details,"details");
                resolve(details)
              }
          }).catch(error=>{
              reject(error)
          })
    })
}