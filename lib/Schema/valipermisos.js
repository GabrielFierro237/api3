const joi = require(`joi`);

const nombrePermiso = joi.object({
    nombre: joi.string().min(2).max(50).empty().required(),
})

const ValidarNomPermisos = joi.object({
    nombre: joi.string().required()
})

module.exports = {
    nombrePermiso,
    ValidarNomPermisos,
}