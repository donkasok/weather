const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/8611611fa262f6b6a85652a161edb5ba/${latitude},${longitude}`
    request({url, json:true},(error, {body}={}) => {
        if(error){
            callback('Unable to connect to server from geocode', undefined);
        } else if(body.error){
            callback('Invalid location details', undefined)
        } else {
            callback(undefined, {
                summary : body.daily.data[0].summary,
                temp : body.currently.temperature,
                wind: body.currently.windSpeed,
                rain: body.currently.precipProbability


            })
        }
    })

}

module.exports = forecast