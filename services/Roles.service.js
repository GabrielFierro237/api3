const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
const { MongoConnection } = require(`../lib/Mongo`);
// Collection
const COLLECTION = "Roles";

const FindRoles = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Inicializacion mongoclient para que me retorne la
      //configuracion de la db
      const DB = await MongoConnection();
      // obtenemos la collection
      const rol = DB.collection(COLLECTION);
      const rolList = await rol.find({}).toArray();
      resolve(rolList);
    } catch (error) {
      reject(error);
    }
  });

const createRoles = (nombre_rol, permisos_ids) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const rol = DB.collection(COLLECTION);
      const result = await rol.insertOne({
        nombre_rol: nombre_rol, 
        permisos_ids: permisos_ids
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
  const UpdateRoles = (id, nombre_rol, permisos_ids) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const rol = DB.collection(COLLECTION);
      const result = await rol.findOneAndUpdate(

        {"_id": ObjectId(id)},
        {
          $set: {
            nombre_rol: nombre_rol,
            permisos_ids: permisos_ids,
          }
        }
        );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
  const DeleteRoles = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.deleteOne({"_id": ObjectId(id)});
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  FindRoles,
  createRoles,
  UpdateRoles,
  DeleteRoles,
};