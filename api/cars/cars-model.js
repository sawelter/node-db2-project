const knex = require('knex');
const db = require('../../data/db-config');

const getAll = () => {
  console.log('going through "GET ALL"');
  return db('cars');
}

const getById = (id) => {
  return db('cars').where('id', id).first();
}

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id);
}


module.exports = {
  getAll,
  getById,
  create
}