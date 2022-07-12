/*
    Clients Routes
    /api/clients

*/

const { Router } = require('express');
const { check } = require('express-validator')
const { fill_validator } = require('../middlewares/fills-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');
const { getClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/clients');
const router = Router();

//Todas las rutas deben pasar por la validación del token
router.use(jwtValidator);

//Obtener clientes
router.get('/', getClientes);

//Crear un nuevo cliente
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('cedula', 'La cédula es obligatoria').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('tlf', 'El telefono es obligatorio').not().isEmpty(),
        fill_validator

    ],
    crearCliente
);

// Actualizar cliente
router.put(
    '/:id',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('cedula', 'La cédula es obligatoria').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('tlf', 'El telefono es obligatorio').not().isEmpty(),
        fill_validator
    ],
    actualizarCliente
);

//Eliminar cliente
router.delete('/:id', eliminarCliente)


module.exports = router;