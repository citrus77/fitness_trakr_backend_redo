const client = require("./client")

// database functions

const getActivityById = async (id) => {
  try {
    const { rows: [activity] } = await client.query(`
      SELECT * FROM activities
      WHERE id = $1;
    `); //client.query

    if (activity) {
      return activity;
    } else {
      throw new Error('Activity not found');
    }; // else
    
  } catch (error) {
    console.error (error);
  } // catch  
}; // getActivityById

const getAllActivities = async () =>{
  try {
    
  } catch (error) {
    console.error (error);
  } // catch
}; // getAllActivities

const getActivityByName = async (name) => {
  try {
    
  } catch (error) {
    console.error (error);
  } // catch
}; // getActivityByName

const attachActivitiesToRoutines = async (routines) => {
  try {
    
  } catch (error) {
    console.error (error);
  } // catch
}; // attachActivitiesToRoutines

// select and return an array of all activities
const createActivity = async ({ name, description }) => {
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `, [ name, description ]); //client.query

    if (activity) {
      return activity;
    } else {
      throw new Error('Activity not created');
    } // else
  } catch (error) {
    console.error(error);
  } // catch
}; // createActivity

// return the new activity
const updateActivity = async ({ id, ...fields }) => {
  try {
    
  } catch (error) {
    console.error (error);
  } // catch
}; // updateActivity

// don't try to update the id
// do update the name and description
// return the updated activity
module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
