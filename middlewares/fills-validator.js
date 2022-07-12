const { response } = require('express');
const { validationResult } = require('express-validator');
const fill_validator = (req, res = response, next) => {

    //Manejo de errores
    const errors = validationResult( req );
    if(!errors.isEmpty()) { //Si hay errores...
        return res.status(400).json({ // 401 = Bad Request
            ok: false,
            errors: errors.mapped()
        });
    } 


    next(); //No hay errores en un middleware, se pasa al siguiente hasta que no hayan más
}

module.exports = {
    fill_validator
}