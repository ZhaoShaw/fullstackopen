import axios from "axios"
const baseUrl = '/api/persons'

const getAll = () => {
  return axios
          .get(baseUrl)
          .then(repsonse => repsonse.data)
}

const create = newObject => {
    return axios
            .post(baseUrl, newObject)
            .then(repsonse => repsonse.data)
}

const update = (id, newObject) => {
    return axios
            .put(`${baseUrl}/${id}`, newObject)
            .then(response => response.data)
}

const deletePerson = id => {
    return axios
            .delete(`${baseUrl}/${id}`)
            .then(response => response.data)
}


export default { getAll, create, update, deletePerson }