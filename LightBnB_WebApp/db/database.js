// import Pool from node-postgres
const { Pool } = require("pg");

// define connection to db
const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/* --- Users --- */

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
  const values = [user.name, user.email, user.password];

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

/* --- Reservations --- */

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  //defire query
  const queryString = `SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date ASC
  LIMIT $2;`;

  //property_reviews.rating

  //define values
  const values = [guest_id, limit];

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

/* --- Properties --- */

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  //define query values
  const values = [];

  // define base query
  let queryString = `SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE 1=1`;

  //check if city option provided
  if (options.city) {
    // add option to the query values
    values.push(`%${options.city}%`);
    // add to the WHERE clause in the query string
    queryString += ` AND city LIKE $${values.length}`;
  }

  //check if owner_id option provided
  if (options.owner_id) {
    // add option to the query values
    values.push(`${options.owner_id}`);
    // add to the WHERE clause in the query string
    queryString += ` AND properties.owner_id = $${values.length}`;
  }

  // add GROUP BY and HAVING to the query string
  queryString += ` GROUP BY properties.id
  HAVING 1=1`;

  // check if minimum_rating option provided
  if (options.minimum_rating) {
    // add option to the query values
    values.push(`${options.minimum_rating}`);
    // add to the HAVING clause in the query string
    queryString += ` AND AVG(property_reviews.rating) >= $${values.length}`;
  }

  // check if minimum_price_per_night option provided
  if (options.minimum_price_per_night) {
    //convert cost from dollars to cents
    const minAmountInCents = options.minimum_price_per_night * 100;
    // add option to the query values
    values.push(`${minAmountInCents}`);
    // add to the HAVING clause in the query string
    queryString += ` AND properties.cost_per_night >= $${values.length}`;
  }

  // check if maximum_price_per_night option provided
  if (options.maximum_price_per_night) {
    //convert cost from dollars to cents
    const maxAmountInCents = options.maximum_price_per_night * 100;
    // add option to the query values
    values.push(`${maxAmountInCents}`);
    // add to the HAVING clause in the query string
    queryString += ` AND properties.cost_per_night <= $${values.length}`;
  }

  // add ORDER BY to the query string
  queryString += ` ORDER BY cost_per_night ASC`;

  // add LIMIT to the query string
  // add option to the query values
  values.push(`${limit}`);
  queryString += ` LIMIT $${values.length};`;

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
  // define query
  const queryString = `INSERT INTO properties(
    owner_id,
    title, 
    description, 
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms,
    country,
    street,
    city,
    province,
    post_code) 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
  RETURNING *;`;

  // define values
  const values = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
  ];

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

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
