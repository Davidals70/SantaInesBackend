-- PostgreSQL SQL Dump

-- Server: 127.0.0.1:5432
-- Generated on: 2023-10-15 at 06:00:09
-- Server version: 10.4.27-MariaDB
-- PHP version: 8.2.0

-- CREATE DATABASE 'santaines' DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- This line is not needed in PostgreSQL, create the database separately.

-- Connect to 'santaines' database
-- \c santaines;

-- Table structure for 'appointment'
CREATE TABLE appointment (
  ID uuid PRIMARY KEY, -- Primary Key
  creation_date timestamp NOT NULL DEFAULT current_timestamp,
  appointment_date timestamp NOT NULL,
  status varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  patient_id uuid,
  doctor_id uuid
);

-- Table structure for 'doctor'
CREATE TABLE doctor (
  ID uuid PRIMARY KEY, -- Primary Key
  name varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  id_number varchar(255) NOT NULL,
  specialization varchar(255) NOT NULL,
  phone_number varchar(255) NOT NULL,
  gender varchar(255) NOT NULL,
  email varchar(255) NOT NULL
);

-- Table structure for 'patient'
CREATE TABLE patient (
  ID uuid PRIMARY KEY, -- Primary Key
  name varchar(255) NOT NULL,
  lastname varchar(255) NOT NULL,
  birthday timestamp NOT NULL,
  id_number varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  phone_number varchar(255) NOT NULL,
  gender varchar(255) NOT NULL,
  email varchar(255) NOT NULL
);

-- Table structure for 'user'
CREATE TABLE "user" (
  ID serial PRIMARY KEY, -- Primary Key
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  user_type varchar(255) NOT NULL
);

-- Indices for dumped tables
-- Indices for the 'appointment' table
ALTER TABLE appointment
  -- ADD PRIMARY KEY (ID),
  ADD CONSTRAINT FK_86b3e35a97e289071b4785a1402 FOREIGN KEY (patient_id) REFERENCES patient (ID) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT FK_9a9c484aa4a944eaec632e00a81 FOREIGN KEY (doctor_id) REFERENCES doctor (ID) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- -- Indices for the 'doctor' table
-- ALTER TABLE doctor
--   ADD PRIMARY KEY (ID);

-- -- Indices for the 'patient' table
-- ALTER TABLE patient
--   ADD PRIMARY KEY (ID);

-- Indices for the 'user' table
ALTER TABLE "user"
  -- ADD PRIMARY KEY (ID),
  ADD UNIQUE (username);


ALTER TABLE doctor
ADD user_id varchar(255);

ALTER TABLE doctor
    ADD CONSTRAINT fk_user_doctor FOREIGN KEY (user_id) REFERENCES customers (username);

-- Auto-increment for dumped tables
-- Auto-increment for the 'user' table
-- No need to modify the ID column in PostgreSQL; it will auto-increment by default.

-- Foreign key constraints for dumped tables
-- Foreign key constraints for the 'appointment' table
-- Already defined when creating the table in PostgreSQL.

-- COMMIT;
