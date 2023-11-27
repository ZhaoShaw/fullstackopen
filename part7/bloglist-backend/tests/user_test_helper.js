const User = require('../models/user')

const initialUsers = [
  {
    username: 'Alex',
    name: 'Alex',
    password: '123456'
  },
  {
    username: 'Kitty',
    name: 'Kitty',
    password: '234'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb
}
