CREATE DATABASE IF NOT EXISTS bookings;

USE bookings;


CREATE TABLE bookedDates (
  id INT NOT NULL AUTO_INCREMENT,
  start_date DATE,
  end_date DATE,
  room_id INT
);

CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  room_rate_peak INT,
  room_rate_off_peak INT,
  extra_guests_rate INT,
  cleaning_fee INT,
  service_fee INT,
  max_guests INT,
  stars INT
);

ALTER TABLE bookedDates ADD FOREIGN KEY room_id REFERENCES rooms(id);

