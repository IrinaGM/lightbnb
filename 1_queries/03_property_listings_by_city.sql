/* Show specific details about properties located in Vancouver including their average rating. */

SELECT properties.id AS id, properties.title AS title, properties.cost_per_night, AVG(property_reviews.rating) AS average_rating
FROM properties
LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE city = 'Vancouver'
GROUP BY properties.id
HAVING AVG(property_reviews.rating) >=4
ORDER BY cost_per_night ASC
LIMIT 10;