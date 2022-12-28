
const request = require('request')

const forecast = (lat, long, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=68e50f7055a31609b26fe9e12d51bf93&query=${lat},${long}&units=m`


    request({url:url, json:true}, (err, {body})=>{
        if(err)
        {
            callback("Unable to connect to weather service", undefined)
        }
        else if(body.error)
        {
            callback("Unable to find the coordinates", undefined)
        }
        else
        {
            const {temperature, feelslike} = body.current
            callback(undefined, `The temperature ${temperature} and it feels like ${feelslike}`)
        }
    })
}

module.exports = forecast