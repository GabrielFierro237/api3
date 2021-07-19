var express = require("express");
var router = express.Router();
const { Roles, ValidarRoles } = require(`../lib/Schema/ValiRoles`);
const {DataValidatorRoles}= require(`../middlewares/DataValidatorRoles`);
const {FindRoles, createRoles, UpdateRoles, DeleteRoles} = require(`../services/Roles.service`); // Servicio de Roles

router.get("/", async function (req, res, next) {
    try {
      const users = await FindRoles();
      res.status(200).json({
        msg: "Lista de Roles",
        body: users,
      });
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .post(`/`,DataValidatorRoles("body", Roles),  async (req, res) => {
    try {
      let { body } = req;
      const result = await createRoles(body.nombre_rol, body.permisos_ids);
      res.status(200).json({
        msg: "Permiso Creado",
        body: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .put(`/:id`,DataValidatorRoles("body", Roles), async (req, res) => {
    try {
      const {params: {id}} = req;
      let { body } = req;
      const result = await UpdateRoles(id, body.nombre_rol, body.permisos_ids);
      res.status(200).json({
        msg: "Permiso Actualizado",
        body: result,
      });
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .delete(`/:id`, async (req, res) => {
    try {
      const {params: {id}} = req;
      const result = await DeleteRoles(id);
      res.status(200).json({
        msg: "Permiso Eliminado",
        body: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })


module.exports = router;