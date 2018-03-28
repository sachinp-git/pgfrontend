var moment = require("moment-timezone");
var momentn = require("moment");

export function convertToLocalTimezone(data, timezone) {
  let localDateTime = data.map(function(date) {
    console.log(date, timezone);
    let hour = moment(date)
      .tz(timezone)
      .format("HH");
    let minute = moment(date)
      .tz(timezone)
      .format("mm");
    let day = moment(date)
      .tz(timezone)
      .format("YYYY-MM-DD");
    return day + "T" + hour + ":00";
  });
  console.log(localDateTime, "******");
  return localDateTime;
}

export function convertAppointmentDetails(data, timezone) {
  console.log(data, timezone, "convertAppointmentDetails");
  let localDateTime = data.map(function(details) {
    console.log(details, timezone);
    let time = moment(details.time)
      .tz(timezone)
      .format("HH:mm");
    let day = moment(details.time)
      .tz(timezone)
      .format("YYYY-MM-DD");
    return {
      name: details.name,
      day,
      time
    };
  });
  console.log(localDateTime, "******");
  return localDateTime;
}

export function converToUtc(dateArray) {
  return dateArray.map(date => {
    return moment(date)
      .utc()
      .format();
  });
}
