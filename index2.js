// const { fetchMyIP } = require('./iss_promised')
// const { fetchCoordsByIP } = require('./iss_promised')
const { nextISSTimesForMyLocation } = require('./iss_promised')



nextISSTimesForMyLocation()
  .then((passTimes) => {
    comingSoon(passTimes)
  })
  .catch((error) =>{
    console.log("It didn't work: ", error.message)
  })
  const comingSoon = function (passTimes) {
  
    for (nextPass of passTimes) {
      const realtime = new Date(0);//credit help at end of page
      realtime.setUTCSeconds(nextPass.risetime);
      const minutes = Math.round(nextPass.duration / 60)
     
      console.log(`The next pass will rise at ${realtime} and last ${minutes} minutes. SO GUTCHA POPCORN READY!`)  
    }
  
  }
  
  // .then(fetchMyIP)
  // .then(fetchCoordsByIP)
  // .then(fetchISSFlyOverTimes)
  // .then(output => console.log(output));






