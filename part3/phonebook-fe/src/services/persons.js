import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteUser = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

// Find user with same name, and update phone number

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson);
};

export default {
  getAll: getAll,
  create: create,
  deleteUser: deleteUser,
  update: update,
};
