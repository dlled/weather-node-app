require('dotenv').config()
const {leerInput, inquirerMenu, inquirerPause, listPlaces} = require('./helpers/inquirer');

const Search = require('./models/search');

const main = async() => {

    let opt = -1

    const search = new Search();
    do {

        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // We have to ask the user what city do you want to search
                /* 1º Show the message
                   2º Search the places
                   3º Select the place
                   4º Get the weather
                   5º Show results 
                */
                const lugar = await leerInput('Ciudad: ');

                const search_results = await search.city(lugar);

                const election = await listPlaces(search_results);

                const selectedPlace = search_results.filter((place) => place.id === election)[0];

                const data = await search.weather(selectedPlace.lat, selectedPlace.lng);


                console.log('\nInformación de la ciudad\n'.blue);
                console.log('Ciudad: '.green + `${selectedPlace.name}`);
                console.log('Lat: '.cyan, selectedPlace.lat);
                console.log('Lng: '.cyan, selectedPlace.lng);
                console.log('Description: '.red , data.weather)
                console.log('Temperature'.yellow, data.temp);
                console.log('Mínima: '.blue, data.min);
                console.log('Máxima: '.red, data.max);
                console.log('Humedad: '.blue, data.humidity)



                break;
            case 2:
                console.log('Historial');
                break;
            case 0:
                console.log('Salir de la aplicación');
                break;
        }
        await inquirerPause();

    } while(opt !== 0)

}
main();