const properties = require("./json/properties.json");
const users = require("./json/users.json");

// import Pool from node-postgres
const { Pool } = require("pg");

// define connection to db
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  // define query
  const queryString = `SELECT *
      FROM users
      WHERE email = $1;`;

  // define values
  const values = [`${email}`];

  // query the db
  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows[0]) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  // define query
  const queryString = `SELECT *
      FROM users
      WHERE id = $1;`;

  // define values
  const values = [`${id}`];

  // query the db
  return pool
    .query(queryString, values)
    .then((result) => {
      if (!result.rows[0]) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  // define query
  const queryString = `INSERT INTO users(name,email,password) 
  VALUES ($1,$2,$3)
  RETURNING *;`;

  // define values
  const values = [`${user.name}`, `${user.email}`, `${user.password}`]; //TODO: clean up.

  // query the db
  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  //defire query
  const queryString = `SELECT reservations.*, properties.*, AVG(property_reviews.rating) as avarage_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date ASC
  LIMIT $2;`;

  //define values
  const values = [`${guest_id}`, `${limit}`];

  // query the db
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log("result.rows");
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  // define query
  const queryString = `SELECT * FROM properties LIMIT $1;`;

  // define values
  const values = [`${limit}`];

  // query the db
  return pool
    .query(queryString, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
