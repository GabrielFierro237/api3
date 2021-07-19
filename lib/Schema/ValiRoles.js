const joi = require(`joi`);
const { Schema } = require("joi");

const Roles = joi.object({
    nombre_rol: joi.string().min(2).max(50).empty().required(),
    permisos_ids: joi.array()
})

const ValidarRoles = joi.object({
    nombre_rol: joi.string().required(),
})

module.exports = {
    Roles,
    ValidarRoles,
}