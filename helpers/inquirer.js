const inquirer = require('inquirer')
require('colors');

const options = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name:  `${ '1.'.green } Buscar ciudad `
            },
            {
                value: 2,
                name:  `${ '2.'.green } Historial`
            },
            {
                value: 0,
                name:  `${ '0.'.green } Salir de aplicación `
            }
        ]
    }
]


const inquirerMenu = async() => {
    console.clear()

    console.log('==========================='.green);
    console.log('  Seleccione una opción'.green)
    console.log('==========================='.green);

    const {option} = await inquirer.prompt(
        options
    );
    return option;
}

const deleteMenu = async(tareas = []) => {
    const myChoices = tareas.map((tarea) => {
        return {
            value: tarea.id,
            name: tarea.desc
        }
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: myChoices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
};

const confirmDelete = async(id = '') => {

    const preguntas = [
        {
            type: 'confirm',
            name: 'id',
            message: 'Esta seguro de que desea borrar la tarea? ',
        }
    ]
    
    const confirm = await inquirer.prompt(preguntas);
    return confirm;
}

const completionList = async( tareas = []) => {
    const myChoices = tareas.map((tarea) => {
        return {
            value: tarea.id,
            name: tarea.desc,
            checked: tarea.completed
        }
    })
    const opciones = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione tareas para completarlas',
            choices: myChoices
        }
    ]
    const ids = await inquirer.prompt(opciones);


    return ids;
}


const inquirerPause = async() => {
    const entered = await inquirer.prompt([{
        type: 'input',
        name: 'entered',
        message: `PRESS ${'ENTER'.green} TO CONTINUE`
    }]);

    return entered;
}

const leerInput = async( message ) =>{
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0){
                    return 'Ingrese un valor válido'
                } else {
                    return true;
                }
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);

    return desc;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    leerInput,
    deleteMenu,
    confirmDelete,
    completionList
}
