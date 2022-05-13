const client = require("./client");
const bcrypt = require('bcrypt');
// database functions

// user functions
const getUserByUsername = async (username) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE username = $1;
    `, [username]); //client.query

    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    } // else
      
  } catch (error) {
    console.error(error);
  } // catch
}; // getUserByUsername

const createUser = async ({ username, password }) => {
  try {
    const SALT_COUNT = 10;    
    const _user = await getUserByUsername(username);
    if (_user || password.length < 8 || !username || !password) {
      throw new Error('User already exists or invalid username or password');
    } else {
      const hashedPwd = await bcrypt.hash(password, SALT_COUNT);

      const { rows: [user] } = await client.query(`
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, hashedPwd]); //client.query

      if (user) {
        delete user.password;
        return user;
      } else {
        throw new Error('User not created');
      } // else

    } // else
  } catch (error) {
    console.error(error);
  } // catch
}; // createUser

const getUser = async ({ username, password }) => {
  try {
    const user = await getUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      delete user.password;
      return user;
    } else {
      return null;
    } // else    
  } catch (error) {
    console.error(error);
  } // catch
}; // getUser

const getUserById = async (userId) => {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE id = $1;
    `, [userId]); //client.query

    if (user) {
      delete user.password;
      return user;
    } else {
      return null;
    } // else
        
  } catch (error) {
    console.error(error);
  } // catch
}; // getUserById

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};