const { Schema, model} = require('mongoose');

const ClienteSchema =  Schema({

    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    tlf: {
        type: String,
        required: true
    }
});


ClienteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Cliente', ClienteSchema);