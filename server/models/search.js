var request = require('request');

var reArrange = function(body) {
  //modify the body, store it in newBody
  /*
    For client-side convenience, upon request, request body is being modified to emulate the following format: 
  First into this: 

    var newBody = {
      3120085: {
        id: 3120085, 
        url: "http://www.something.com", 
        name: "society", 
        city: "silver-spring", 
        region: "MD", 
      country: "USA", 
      lat: 38.9, 
      long: 39.4, 
      events: [
          {
            b_event_id: 112121, 
            url: "http:", 
            datetime: "addsad", 
            artists: ["a", "b", "c"]
          }
        ]
      }
    }

  Then into an array-like format, arranged by venue id with the same above-mentioned format (in essence, each represents an object in the array)

  */
  var newBody = {};
  for (var i = 0; i < body.length; i++) {
    if (!newBody[body[i].venue.id]) {
      newBody[body[i].venue.id] = body[i].venue;
      newBody[body[i]].venue.id].events = [];
    }
    newBody[body[i].venue.id].events.push({
      b_event_id: body[i].id,
      url: body[i].url,
      datetime: body[i].dateTime,
      artists: body[i].artists
    })
  }

  var actualBody = [];
  for (var key in newBody) {
    actualBody.push(newBody[key]);
  }
  return actualBody;
};

module.exports = function(data, callback) {
  request('http://api.bandsintown.com/events/search?location=' + data.city + ',' + data.state + '&radius=10&format=json&date=' + data.fromDate + ',' + data.toDate + '(inclusive range)&app_id=mapit', function(error, resp, body) {
    if (err) {
      throw err;
    }

    if (!error && response.statusCode == 200) {
      var newBody = reArrange(body);
      //resp.send(newBody);
      callback(newBody);
    }
  })
}
