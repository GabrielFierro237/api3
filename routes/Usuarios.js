var express = require("express");
const { string } = require("joi");
var router = express.Router();
const { nombreUsuario, ValidarUsuario } = require(`../lib/Schema/ValiUsuarios`);
const { DataValidatorUsuario }=require(`../middlewares/DataValidatorUsuarios`)
const {createUsuario, UpdateUsuario, DeleteUsuario, FindUsuario, UpdatePass} = require(`../services/Usuarios.service`);

/* GET users listing. */
router.get(`/`,async function (req, res, next) {
    try {
      const {query: {id}} = req;
      const users = await FindUsuario(id);
      res.status(200).json({
        msg: "Usuarios",
        body: users,
      });
    } catch (error) {
      console.log(error +"hola aqui esta el error")
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .post(`/` ,DataValidatorUsuario("body", nombreUsuario),async (req, res) => {
    try {
      let {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, rol} = req.body;
      const result = await createUsuario(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, rol);
      res.status(200).json({
        msg: "Usuario creado",
        body: result,
      });
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .put(`/:id`,DataValidatorUsuario("body", nombreUsuario), async (req, res) => {
    try {
      const {params: {id}} = req;
      const {primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, rol} = req.body;
      const result = await UpdateUsuario(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, rol);
      res.status(200).json({
        msg: "Usuario Actualizado",
        body: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .delete(`/:id`, async (req, res) => {
    try {
      const {params: {id}} = req;
      const result = await DeleteUsuario(id);
      res.status(200).json({
        msg: "Usuario Eliminado",
        body: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
  .put(`/change-password/:id`, async (req, res) => {
    try {
      const {params: {id}} = req;
      let { body: new_password  } = req;
      let { body: repeat_password} = req;
      if (new_password === repeat_password){
        const result = await UpdatePass(id, new_password);
      res.status(200).json({
        msg: "Actualizacion de contraseña",
        body: result,
      });
      }else{
        res.status(200).json({
          msg: "Contraseñas no coiciden",
          body: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "internal server error",
      });
    }
  })
module.exports = router;