
let data=[{appointMentWith:'Mr x',
          utcTime:'2018-03-27T10:00'},
          {appointMentWith:'Mr y',
          utcTime:'2018-03-27T12:00'},
          {appointMentWith:'Mr z',
          utcTime:'2018-03-27T17:00'}]

var moment = require('moment-timezone');
var momentn= require('moment')

export function convertToLocalTimezone(data,timezone){
    let dateTimeObject=data.reduce(function(LocalDateTime,data){
         let date=moment(data.utcTime).tz(timezone).format('YYYY-MM-DD');
         let time=moment(data.utcTime).tz(timezone).format('HH');
         if (!LocalDateTime[date]) {
          console.log("inside if")
          LocalDateTime[date]=[]
          }
          LocalDateTime[date].push(parseInt(time))
         return LocalDateTime
    },{})
    console.log(dateTimeObject)   
}
   
export function converToUtc(dateArray){
   return dateArray.map((date)=>{
       return moment(date).utc().format()
   })
}