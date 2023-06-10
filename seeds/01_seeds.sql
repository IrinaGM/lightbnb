/* Insert data into users table */
INSERT INTO users (name, email, password) 
VALUES ('Frank K', 'frank@test.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Elli M', 'elli@test.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mor D', 'mor@test.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

/* Insert data into properties table */
INSERT INTO properties (
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
  post_code, 
  active)
VALUES (1, 'Cozy Cottage', 'A charming cottage', 'http://example.com/thumbnail1.jpg', 'http://example.com/cover1.jpg', 100, 2, 1, 2, 'USA', '123 Main Street', 'New York', 'NY', '12345', true),
  (2, 'Modern Apartment', 'Stylish apartment', 'http://example.com/thumbnail2.jpg', 'http://example.com/cover2.jpg', 150, 1, 1, 1, 'Canada', '456 Elm Street', 'Vancouver', 'BC', 'V6G 1B4', true),
  (3, 'Luxury Villa', 'Elegant villa', 'http://example.com/thumbnail3.jpg', 'http://example.com/cover3.jpg', 500, 3, 3, 4, 'France', '789 Oak Street', 'Paris', 'Paris', '75001', true);

/* Insert data into reservations table */
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2023-07-01', '2023-07-07', 1, 3),
  ('2023-08-15', '2023-08-20', 2, 2),
  ('2023-09-10', '2023-09-15', 3, 1);


/* Insert data into property_reviews table */
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (3, 1, 1, 4, 'Great place, highly recommended!'),
  (2, 2, 2, 5, 'Wonderful experience!'),
  (1, 3, 3, 3, 'Lovely villa, had a great time!');
