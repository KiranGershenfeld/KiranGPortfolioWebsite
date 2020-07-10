var closestBodyData = "Retrieving Data..."

var today = new Date()
var tomorrow
var monthFromToday
var yearFromToday
async function generateDates()
{
  tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow = tomorrow.toISOString().substring(0, 10)
  //Get date for one month from today
  monthFromToday = new Date(tomorrow)
  monthFromToday.setMonth(monthFromToday.getMonth()+1)
  monthFromToday = monthFromToday.toISOString().substring(0,10)
  //Get date for one year from today
  yearFromToday = new Date(tomorrow)
  yearFromToday.setYear(yearFromToday.getFullYear()+1)
  yearFromToday = yearFromToday.toISOString().substring(0,10)

}
//Get date for tomorrow

//var api_key = "KJiRJ4YNyuuOfEhDLqHJ5FLJe2FKBhrXPf4pSZTi"

var queryData = function(url)
{
  document.getElementById("data").classList.remove('fade-in')
  document.getElementById("data").classList.add('hidden')
  $.getJSON(url, function(data) {
    try
    {
      var closest = data.data[0]
      var name = closest[0]
      var date = closest[3]
      var distanceAU = closest[4]
      var distanceLD = (distanceAU*389.17037554435).toFixed(2).toString()
      var approachVelocity = (closest[7]*1).toFixed(2).toString()
      var jplURL = "https://ssd.jpl.nasa.gov/sbdb.cgi?sstr=" + makeStringURLSafe(name) + ";old=0;orb=1;cov=0;log=0;cad=0#orb"
      var closestBodyString = "The asteroid <span class=colored><a href=" + jplURL + " target=_blank>" + name + "</a></span> will be <span class=colored>" + distanceLD + "</span> lunar distances away from Earth on <span class=colored>" + createUseableDate(date) + "</span> going <span class=colored>" + approachVelocity + "km/s."
      //var closestBodyData = "Asteroid Name: " + <span class="name">name</span> + "<br>Time of Closest Approach: " + date + "<br>Distance at Closest Apprach in LD: " + distanceLD + "<br>Apprach Velocity: " + approachVelocity + "<br>"
      document.getElementById("data").innerHTML=closestBodyString;

    }
    catch (error){
      document.getElementById("data").innerHTML="The earth is safe in this timeframe";

      console.log(error)
    }
    document.getElementById("data").classList.add('fade-in')
    document.getElementById("data").classList.remove('hidden')
  });

}

function createUseableDate(string)
{
  var split = string.split(/[ -]/) //split according to regex (every space or dash)
  var timeSplit = split[3].split(":")
  var hour = parseFloat(timeSplit[0])
  var minutes = timeSplit[1]
  if(hour > 12)
  {
    hour -=12;
    minutes+="pm"
  }else{minutes+="am"}
  var formattedTime = hour + ":" + minutes
  var formattedDate = split[1] + " " + split[2] + ", " + split[0] + " at " + formattedTime
  return formattedDate
}
function makeStringURLSafe(string) //Adds "%20" to any space in a string to make it work inside a url
{
  var split = string.split(" ")
  var urlString = ""
  for (var i = 0; i < split.length; i++){
    urlString+=split[i]
    if(i != split.length-1){urlString+="%20"}
  }
  return urlString
}
