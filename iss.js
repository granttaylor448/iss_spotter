// It will contain most of the logic for fetching the data from each API endpoint.
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) return callback(error, null);

      fetchISSFlyOverTimes(loc, (error, output) => {
        if (error)  return callback(error, null);

        callback(null, output)
      })
    })
  });

}

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coords for IP: ${body}`), null);
      
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;
    
    callback(null, { latitude, longitude });
  });

}

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching next ISS flyby: ${body}`), null);
      
      return;
    }
    const output = JSON.parse(body).response;
    
    callback(null, output);
  })  
};

// "response": [
  // {"risetime": TIMESTAMP, "duration": DURATION},
  // ...
// ]

module.exports = { nextISSTimesForMyLocation
};

// module.exports = { fetchMyIP };