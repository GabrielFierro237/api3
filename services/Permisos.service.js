const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
const { MongoConnection } = require(`../lib/Mongo`);
// Collection
const COLLECTION = "permisos";

const FindPermisos = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      // Inicializacion mongoclient para que me retorne la
      //configuracion de la db
      const DB = await MongoConnection();
      // obtenemos la collection
      const permi = DB.collection(COLLECTION);
      const PermiList = await permi.find({}).toArray();
      if(id != undefined){
        var filterResult = PermiList.filter((estu) => estu._id == id);
        resolve(filterResult);
      }
      resolve(PermiList);
    } catch (error) {
      reject(error);
    }
  });

const createPermisos = (user) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.insertOne(user);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
const UpdatePermisos = (id, nombre) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.findOneAndUpdate(
        { "_id": ObjectId(id)},
        {
          $set: {
            nombre: nombre,
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
const DeletePermisos = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const permi = DB.collection(COLLECTION);
      const result = await permi.deleteOne({ "_id": ObjectId(id) });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  FindPermisos,
  createPermisos,
  UpdatePermisos,
  DeletePermisos,
};
