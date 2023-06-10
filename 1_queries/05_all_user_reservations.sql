/* Show all reservations for a user. */

SELECT reservations.id AS id, properties.title AS title, reservations.start_date AS start_date, properties.cost_per_night AS cost_per_nigth, AVG(property_reviews.rating) as avarage_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE reservations.guest_id = 1
GROUP BY reservations.id, properties.title, reservations.start_date, properties.cost_per_night
ORDER BY reservations.start_date ASC
LIMIT 10;