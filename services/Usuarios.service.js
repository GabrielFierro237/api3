const { string } = require("joi");
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
var randtoken = require("rand-token");
const { MongoConnection } = require(`../lib/Mongo`);
// Collection
const COLLECTION = "usuarios";

const FindUsuario = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      // Inicializacion mongoclient para que me retorne la
      //configuracion de la db
      const DB = await MongoConnection();
      // obtenemos la collection
      const permi = DB.collection(COLLECTION);
      const PermiList = await permi.find({}).toArray();
      if (id != undefined) {
        var filterResult = PermiList.filter((estu) => estu._id == id);
        resolve(filterResult);
      }
      resolve(PermiList);
    } catch (error) {
      reject(error);
    }
  });

const createUsuario = (
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  rol
) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      let cod = randtoken.generate(16);
      const result = await permi.insertOne({
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        codigo_accesso: cod,
        contraseña: cod,
        rol: rol,
        nuevo_usuario: true,
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
const UpdateUsuario = (
  id,
  primer_nombre,
  segundo_nombre,
  primer_apellido,
  segundo_apellido,
  rol
) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            primer_nombre: primer_nombre,
            segundo_nombre: segundo_nombre,
            primer_apellido: primer_apellido,
            segundo_apellido: segundo_apellido,
            rol: rol,
          },
        },
        {
          upsert: true,
        }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
const DeleteUsuario = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.deleteOne({ _id: ObjectId(id) });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
const UpdatePass = (id, new_password) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: {
            contraseña: new_password,
          },
        }
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  FindUsuario,
  createUsuario,
  UpdateUsuario,
  DeleteUsuario,
  UpdatePass,
};
