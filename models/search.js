const axios = require('axios');



class Search {

    mockHist = ['Madrid', 'Barcelona', 'Navarra'];

    constructor(){
        // TODO: cargar DB si existe 
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

}

module.exports = Search;