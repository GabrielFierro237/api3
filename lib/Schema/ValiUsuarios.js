const joi = require(`joi`);

const nombreUsuario = joi.object({
    primer_nombre: joi.string().min(2).max(50).empty().required(),
    segundo_nombre: joi.string().min(2).max(50).empty().required(),
    primer_apellido: joi.string().min(2).max(50).empty().required(),
    segundo_apellido: joi.string().min(2).max(50).empty().required(),
    rol: joi.string().min(2).max(50).empty().required()
})

const ValidarUsuario = joi.object({
    _id: joi.string().required(),
})

module.exports = {
    nombreUsuario,
    ValidarUsuario,
}