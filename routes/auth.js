/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fill_validator } = require('../middlewares/fills-validator');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validator');


const router = Router();


router.post(
    '/new',
    [   //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fill_validator
    ],

    crearUsuario
); //Debe recibir información

router.post(
    '/',
    [ //Middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fill_validator
    ],

    loginUsuario); // Debe recibir información

router.get('/renew', jwtValidator, revalidarToken);


module.exports = router;