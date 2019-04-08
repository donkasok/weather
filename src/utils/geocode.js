const request = require('request');

const geocode = (address, callback) => {
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiZG9ua2Fzb2siLCJhIjoiY2p1NWE5Z3k5MTZvcTN5cnZzbHAxdG9lbiJ9.gKzLqrkluhTv-JBrxIZrNg`;
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode