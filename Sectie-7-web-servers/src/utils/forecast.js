const request = require("request");

const apiKey = '8a312423a48f47d9df851fe7d378e09b';

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if(error) callback("kan niet verbinden met de client", undefined);
        else if(body === undefined) callback("kan niet verbinden met de client", undefined);
        else {
            callback(undefined, `Het is momenteel ${body.current.weather_descriptions[0]}`);
        }
    })
}

module.exports = forecast;

