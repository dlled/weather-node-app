require('dotenv').config()
const {leerInput, inquirerMenu, inquirerPause} = require('./helpers/inquirer');

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
                const lugar = await leerInput('En que ciudad quieres conocer el clima');

                await search.city(lugar);
                
                console.log(lugar);

                console.log('\n Información de la ciudad\n'.blue);
                console.log('Ciudad: '.green, );
                console.log('Lat: '.red);
                console.log('Lng: '.red);
                console.log('Temperature'.yellow, );
                console.log('Mínima: '.blue, );
                console.log('Máxima: '.red);


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