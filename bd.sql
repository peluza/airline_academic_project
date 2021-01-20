-- Create data base
CREATE DATABASE IF NOT EXISTS aerolinea;

-- Create user
CREATE USER IF NOT EXISTS 'vuelos'@'localhost' IDENTIFIED BY 'Vuelos_01';
GRANT ALL PRIVILEGES ON `aerolinea`.* TO 'vuelos'@'localhost';

-- Solutions a problem conection databases for nodejs
ALTER USER 'vuelos'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Vuelos_01';

-- Use databases aerolinea
USE aerolinea;

-- Create table: Consulta vuelos
CREATE TABLE IF NOT EXISTS Consulta_Vuelos(
    numero_vuelo VARCHAR(10) NOT NULL UNIQUE,
    ciudad_salida VARCHAR(30),
    ciudad_destino VARCHAR(30),
    fecha_salida VARCHAR(30),
    fecha_llegada VARCHAR(30),
    tarifaVuelo INT,
    estado_vuelo TINYINT(1),
    asiento_A1 INT UNIQUE,
    asiento_A2 INT UNIQUE,
    asiento_A3 INT UNIQUE,
    asiento_A4 INT UNIQUE,
    asiento_A5 INT UNIQUE,
    asiento_B1 INT UNIQUE,
    asiento_B2 INT UNIQUE,
    asiento_B3 INT UNIQUE,
    asiento_B4 INT UNIQUE,
    asiento_B5 INT UNIQUE,
    asiento_C1 INT UNIQUE,
    asiento_C2 INT UNIQUE,
    asiento_C3 INT UNIQUE,
    asiento_C4 INT UNIQUE,
    asiento_C5 INT UNIQUE,
    PRIMARY KEY (numero_vuelo)
);

-- Insert data in tables Consulta de vuelos
INSERT INTO Consulta_Vuelos(
     numero_vuelo, ciudad_salida, ciudad_destino, fecha_salida, fecha_llegada, 
     tarifaVuelo, estado_vuelo, asiento_A1, asiento_A2, asiento_A3, asiento_A4,
     asiento_A5, asiento_B1, asiento_B2, asiento_B3, asiento_B4, asiento_B5,
     asiento_C1, asiento_C2, asiento_C3, asiento_C4, asiento_C5)
    VALUES('ED01', 'Medellin', 'Bogota', '2020-01-08 06:00:00', '2020-01-08 7:00:00', '800000', '1', '123', '0','0','0','0','0','0','0','0','0','0','0','0','0','0'), 
        ('ED02', 'Medellin', 'Bogota', '2020-01-09 06:00:00', '2020-01-09 7:00:00', '800000', '1', '0', '423','0','0','0','0','0','0','0','0','0','0','0','0','0'), 
        ('ED03', 'Medellin', 'Bogota', '2020-01-10 06:00:00', '2020-01-10 7:00:00', '900000', '1', '724', '0','214','0','0','0','0','0','0','0','0','0','0','0','0'); 

-- Create table: Personas
CREATE TABLE IF NOT EXISTS Personas(
    id_usuario INT NOT NULL UNIQUE,
    nombre_usuario VARCHAR(30),
    correo VARCHAR(30),
    password_ VARCHAR(100)
);

-- Insert data in tables Personas
INSERT INTO Personas(
    id_usuario, nombre_usuario, correo, password_)
    VALUES('123', 'Edison', 'edisonisaza@gmail.com', 'password_123');

-- Create table: Date_Users
CREATE TABLE IF NOT EXISTS Date_Users (
    id_usuario INT NOT NULL,
    numero_vuelo VARCHAR(10) NOT NULL UNIQUE,
    fechaPago VARCHAR(30),
    FOREIGN KEY (numero_vuelo) REFERENCES Consulta_Vuelos(numero_vuelo)
);

-- Insert data in tables Date_Users
INSERT INTO  Date_Users(
    id_usuario, numero_vuelo, fechaPago)
    VALUES('123', 'ED01', '2020-01-03 06:00:00');
    