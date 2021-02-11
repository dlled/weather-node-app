const {leerInput, inquirerMenu, inquirerPause} = require('./helpers/inquirer');

const main = async() => {

    let opt = -1

    do {

        opt = await inquirerMenu();

        switch(opt){
            case 1:
                console.log('Buscar ciudad');
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