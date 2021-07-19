const { MongoClient } = require("mongodb");
const { MongoConnection } = require(`../lib/Mongo`);
// Collection
const COLLECTION = "clients";

const FindUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      // Inicializacion mongoclient para que me retorne la
      //configuracion de la db
      const DB = await MongoConnection();
      // obtenemos la collection
      const clients = DB.collection(COLLECTION);
      const ClientsList = await clients.find({}).toArray();
      resolve(ClientsList);
    } catch (error) {
      reject(error);
    }
  });

const createUser = (user) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const clients = DB.collection(COLLECTION);
      const result = await clients.insertOne(user);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
  const Updateuser = (id, name, lastname) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const clients = DB.collection(COLLECTION);
      const result = await clients.findOneAndUpdate(
        {nombre: id},
        {
          $set: {
            nombre: name,
            apellido: lastname
          }
        },
        {
          upsert: true
        }
        );
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
  const DeleteUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const DB = await MongoConnection();
      const clients = DB.collection(COLLECTION);
      const result = await clients.deleteOne({nombre: id});
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
module.exports = {
  FindUser,
  createUser,
  Updateuser,
  DeleteUser,
};
