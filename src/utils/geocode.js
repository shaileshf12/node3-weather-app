
const request = require('request')

const geocode = (location, callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=68e50f7055a31609b26fe9e12d51bf93&query=${location}&units=m`

    request({url:url, json:true}, (err, {body})=>{
        if(err)
        {
            callback("Unable to connect to weather service", undefined)
        }
        else if(body.error)
        {
            callback("Unable to find the location", undefined)
        }
        else
        {
            // console.log(res.body)
            const {lat, lon} = body.location
            callback(undefined, {lat, lon})
        }
    })
}

module.exports = geocode