//will run our main fetch

// const { fetchMyIP } = require('./iss');
// const { fetchISSFlyOverTimes } =require('./iss')

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  comingSoon(passTimes);
});

const comingSoon = function (passTimes) {
  
  for (nextPass of passTimes) {
    const realtime = new Date(0);//credit help at end of page
    realtime.setUTCSeconds(nextPass.risetime);
    const minutes = Math.round(nextPass.duration / 60)
   
    console.log(`The next pass will rise at ${realtime} and last ${minutes} minutes. SO GUTCHA POPCORN READY!`)  
  }

}


// 
// const pretendCoords = { latitude: '49.26200', longitude: '-123.09230' };
// 
// fetchISSFlyOverTimes(pretendCoords , (error, output) => {
  // if (error) {
    // console.log("It didn't work!" , error);
    // return;
  // }
// 
  // console.log('It worked! Returned cords:' , output);
// });


// '162.245.144.188'