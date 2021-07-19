var express = require("express");
var router = express.Router();
const {
  ValidarNomPermisos,
  nombrePermiso,
} = require(`../lib/Schema/valipermisos`);
const {
  DataValidatorPermisos,
} = require(`../middlewares/DataValidatorPermisos`);
const {
  FindPermisos,
  createPermisos,
  UpdatePermisos,
  DeletePermisos,
} = require(`../services/Permisos.service`); // Servicio de permisos

// Permisos CRUD
//aun no configurado
router
  .get("/", async function (req, res, next) {
    try {
      const {
        query: { id },
      } = req;
      const users = await FindPermisos(id);
      res.status(200).json({
        msg: "Lista de Permisos",
        body: users,
      });
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .post(
    `/`,
    DataValidatorPermisos("body", ValidarNomPermisos),
    async (req, res) => {
      try {
        let { body: user } = req;
        const result = await createPermisos(user);
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
    }
  )
  .put(
    `/:id`,
    DataValidatorPermisos("body", ValidarNomPermisos),
    async (req, res) => {
      try {
        const {
          params: { id },
        } = req;
        let { nombre } = req.body;
        const result = await UpdatePermisos(id, nombre);
        res.status(200).json({
          msg: "permiso Actualizado",
          body: result,
        });
      } catch (error) {
        console.log(error + "Aqui estoy");
        res.status(500).json({
          msg: "internal server error",
        });
      }
    }
  )
  .delete(`/:id`, async (req, res) => {
    try {
      const {
        params: { id },
      } = req;
      const result = await DeletePermisos(id);
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
  });

module.exports = router;
