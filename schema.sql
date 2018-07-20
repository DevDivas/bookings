DROP DATABASE IF EXISTS bookings;

CREATE DATABASE IF NOT EXISTS bookings; 

USE bookings;

SET GLOBAL local_infile = 'ON';


CREATE TABLE rooms (
  id INT NOT NULL AUTO_INCREMENT,
  room_rate_base INT,
  room_rate_peak INT,
  extra_guests_rate INT,
  cleaning_fee INT,
  service_fee INT,
  base_guests INT,
  max_guests INT,
  stars INT,
  PRIMARY KEY (id)
);

CREATE TABLE bookedDates (
  id INT NOT NULL AUTO_INCREMENT,
  start_date DATE,
  end_date DATE,
  room_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES rooms (id)
);

LOAD DATA LOCAL INFILE './database/fakeRoomDetails.csv' INTO TABLE rooms
  FIELDS TERMINATED BY ', ' 
  LINES TERMINATED BY '\r\n';

LOAD DATA LOCAL INFILE './database/fakeBookings.csv' INTO TABLE bookedDates
  FIELDS TERMINATED BY ', ' 
  LINES TERMINATED BY '\r\n';
