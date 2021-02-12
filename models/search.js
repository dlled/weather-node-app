const axios = require('axios');



class Search {

    mockHist = ['Madrid', 'Barcelona', 'Navarra'];

    constructor(){
        // TODO: cargar DB si existe 
    }

    get paramsMapbox(){
        return {
            'access_token': 'pk.eyJ1IjoiZGxsZWQiLCJhIjoiY2tsMWhnNWR1MGhxNzMwbzQzdm1xd3hhcyJ9.wxF6Z8YGYHy1R5DwrN-4Ww',
            'limit': 5,
            'language': 'es'

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
    
            console.log(resp.data);
    
            return [];
            
        } catch (error) {
            
            return [];
            
        }
    }

}

module.exports = Search;