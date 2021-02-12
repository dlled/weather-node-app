const fs = require('fs');
const axios = require('axios');



class Search {

    historial = [];
    dbPath = './db/db.json'

    constructor(){
        try {
            this.loadDB();
            
        } catch (error) {
            console.log(error);
        }
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'

        }
    }

    paramsWeather(long, lat){
        return {
            'lat': lat,
            'lon': long,
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es',
        }
    }

    async city( place = '' ) {
        try {
            //peticioón http
            const instanc = await axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: this.paramsMapbox
            });
            const resp = await instanc.get();
    
            const myData = resp.data.features.map((result) => {
                return {
                    id: result.id,
                    name: result.place_name,
                    lng: result.center[0],
                    lat: result.center[1]
                };
            });
    
            return myData;
            
        } catch (error) {
            
            return [];
            
        }
    }

    async weather(lat, lng) {
        try {
            const apiInstance = await axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: this.paramsWeather(lng, lat),
            })

            const resp = await apiInstance.get();
            const myData = {
                weather: resp.data.weather[0].main,
                temp: resp.data.main.temp,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                humidity: resp.data.main.humidity
            }

            return myData;
        } catch (error) {
            return 'hola';
        }
    }

    makeHistorial( place = ''){

        if(!this.historial.includes(place)){
            this.historial.unshift(place);
        }

        this.saveDB();
    }

    saveDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    loadDB(){
        const data = JSON.parse(fs.readFileSync(this.dbPath, {encoding: 'utf-8'}));
        this.historial = data.historial
    }

}

module.exports = Search;