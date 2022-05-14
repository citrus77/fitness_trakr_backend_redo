const client = require('./client');

const getRoutineById = aysnc (routineId) => {
  const { rows: [routine] } = await client.query(`
    SELECT * FROM routines
    WHERE id = $1;
  `, [ routineId ]); //client.query

  if (routine) {
    return routine;
  } else {
    throw new Error('Routine not found');
  } // else
}; // getRoutineById

async function getRoutinesWithoutActivities(){
}

async function getAllRoutines() {
}

async function getAllRoutinesByUser({username}) {
}

async function getPublicRoutinesByUser({username}) {
}

async function getAllPublicRoutines() {
}

async function getPublicRoutinesByActivity({id}) {
}

async function createRoutine({creatorId, isPublic, name, goal}) {
}

async function updateRoutine({id, ...fields}) {
}

async function destroyRoutine(id) {
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
}