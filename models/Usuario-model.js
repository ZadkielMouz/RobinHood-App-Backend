const { Schema, model} = require('mongoose');

const UserSchema =  Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UserSchema); // De acá sale el nombre de la colección