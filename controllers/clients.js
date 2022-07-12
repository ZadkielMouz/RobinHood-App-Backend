const { response } = require('express');
const Cliente = require('../models/Cliente-model');


const getClientes = async(req, res = response) => {

    const clientes = await Cliente.find();


    res.json({
        ok:true,
        clientes
    })
}

const crearCliente = async(req, res = response) => {

    const cliente = new Cliente( req.body );

    /* VALIDAR QUE LA CEDULA SEA UNICA
    **********************************
    */

    try {
        const clienteGuardado = await cliente.save();
        res.json({
            ok: true,
            cliente: clienteGuardado
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Por favor, comuniquese con el administrador.'
        });
    }

}

const actualizarCliente = async(req, res = response) => {

    const clienteId = req.params.id;

    try {

        const cliente = await Cliente.findById(clienteId);

        if( !cliente ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese Id'
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

    const nuevoCliente = req.body;

    const clienteActualizado = await Cliente.findByIdAndUpdate(clienteId, nuevoCliente, {new: true});
    //Si se deja el argumento "new" en true, retornará es el cliente actualizado, no la versión antes de actualizar
    res.json({
        ok: true,
        clienteActualizado
    });


}

const eliminarCliente = async(req, res = response) => {

    const clienteId = req.params.id;

    try {

        const cliente = await Cliente.findById(clienteId);

        if( !cliente ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con ese Id'
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }

    const clienteEliminado = await Cliente.findByIdAndDelete(clienteId);



    res.json({
        ok: true,
        msg: `Cliente Id: ${clienteEliminado.id} eliminado satisfactoriamente.`
    });

}


module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}