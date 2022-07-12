const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario-model');
const { jwtGenerator } = require('../helpers/jwt')



const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email }); // Se busca el usuario en la DB
        if( usuario ) {
            return res.status(500).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo electrónico'
            })
        }

        usuario = new Usuario( req.body ); // acá se guardan los datos del usuario

        //Encriptando la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save(); //Acá se guarda en la base de datos

        //Generar Json Web Token
        const token = await jwtGenerator( usuario.id, usuario.name );


        res.status(201).json({ //201 = Creación Exitosa
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador.'
        })

    }
}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email }); // Se busca el usuario en la DB
        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email' // Poner esto más generico, no especificar si es correo o password
            })
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password);
        
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password Incorrecto'
            });
        }

        // Generar nuestro JWT

        const token = await jwtGenerator( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador.'
        })
    }

    // res.status(201).json({
    //     ok: true,
    //     msg: 'Login'
    // })
}

const revalidarToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await jwtGenerator( uid, name );
    
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}