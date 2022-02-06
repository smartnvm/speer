const { ObjectId } = require("bson");

//users collection
module.exports = [
   {
    _id: ObjectId('61ff81d20f7133dc693200e4'),
    name: "aj",
    username: "aj@smartnvm.com",
    hash: "$2b$10$p/CQ0qb5wN2WLMNvanxhV.kVg74c9xixlALRQpvY7cQCpr1TyLhhO",
    password: 'password'
  },
  {
    _id: ObjectId('61ff81d20f7133dc693200e5'),
    name: "Clement",
    username: "clement.shum@speer.io",
    hash: "$2b$10$p/CQ0qb5wN2WLMNvanxhV.kVg74c9xixlALRQpvY7cQCpr1TyLhhO",
    password: 'password'
  },

];
