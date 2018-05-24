function dateToString(date){
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var dateString  = date;

return dateString.toLocaleDateString("en-US",options);
}

module.exports = dateToString;