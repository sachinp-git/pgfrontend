import {converToUtc,convertToLocalTimezone} from '../utils/ConvertToLocalTimezone.js'
import axios from 'axios'
import {apiconfig} from '../APIS/apiconfig.js'
import jstz from 'jstz';
const moment = require('moment');



export function bookAppointment(slots,appointmentWith){
  let utcTimeSlots=converToUtc(slots)
  var username = sessionStorage.getItem('username');
  if(!username){
    username="Anonymus"
  }
  let url=apiconfig.basepath+apiconfig.bookappointment;
  let postData={
      utcTimeSlots,
      appointmentWith,
      username
  }
  axios.post(url,postData)
  .then((res)=>{
    console.log(res,"response form bookappointment api")
  }).catch((err)=>{
    console.log(err)
  })
}

export function getUserSlots(username){
    let url=apiconfig.basepath+apiconfig.getUserAppointmentSlots;
    let postData={
        username
    } 
    axios.post(url,postData).then(res=>{
        console.log(res)
        let currTimeZone=sessionStorage.getItem('timezone') ||  jstz.determine().name();
    })
}