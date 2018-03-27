import {converToUtc,convertToLocalTimezone} from '../utils/ConvertToLocalTimezone.js'
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
    console.log(res,"response form bookappointment api")
  }).catch((err)=>{
    console.log(err)
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
              console.log("fetch",res)
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
        /*axios.post(url,postData).then(res=>{
            if(res.status==200){
                
            }
        }).catch(err=>{
            console.log(err)
            reject(err)
        })*/
    })
    
}