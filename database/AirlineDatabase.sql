DROP DATABASE IF EXISTS AirlineDatabase;
CREATE DATABASE AirlineDatabase;
USE AirlineDatabase;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	UserID char(6) AUTO_INCREMENT PRIMARY KEY,
    LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
    Address varchar(100),
    Phone varchar(25),
    Email varchar(100),
    AccessLevel varchar(50),
    Membership varchar(50),
    LoyaltyBonus int DEFAULT 0
);


DROP TABLE IF EXISTS Aircrafts; 
CREATE TABLE Aircrafts (
	AircraftID char(6) AUTO_INCREMENT PRIMARY KEY,
    Model varchar(25) NOT NULL,
    Capacity INT NOT NULL
);

DROP TABLE IF EXISTS Flights;
CREATE TABLE Flights (
	FlightID char(6) AUTO_INCREMENT PRIMARY KEY,
    Origin varchar(50) NOT NULL,
    Destination varchar(50) NOT NULL,
    FlightDate DATETIME NOT NULL,
    SeatAvailability INT NOT NULL,
    Duration TIME NOT NULL,
    Airlines varchar(50) NOT NULL
);

DROP TABLE IF EXISTS Crew; 
CREATE TABLE Crew (
	CrewID char(5) AUTO_INCREMENT PRIMARY KEY,
    LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
    Position varchar(25) NOT NULL
);

DROP TABLE IF EXISTS FlightCrew;
CREATE TABLE FlightCrew (
	FlightID char(6),
    CrewID char(5),
    Destination varchar(50) NOT NULL,
    PRIMARY KEY (FlightID, CrewID),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID),
    FOREIGN KEY (CrewID) REFERENCES Crew(CrewID)
);

DROP TABLE IF EXISTS Booking;
CREATE TABLE Booking (
	BookingID char(6) AUTO_INCREMENT PRIMARY KEY,
    UserID char(6),
    FlightID char(6),
    SeatID char(6),
    InsuranceID varchar(15),
    PaymentStatus varchar(50),
    CancellationPolicy varchar(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID),
    FOREIGN KEY (SeatID) REFERENCES Seat(SeatID),
    FOREIGN KEY (InsuranceID) REFERENCES InsuranceOptions(InsuranceID)
);

DROP TABLE IF EXISTS InsuranceOptions;
CREATE TABLE InsuranceOptions (
	InsuranceID varchar(15) AUTO_INCREMENT PRIMARY KEY,
    CoverageDetails TEXT,
    Price DECIMAL(10,2)
);

DROP TABLE IF EXISTS Ticket;
CREATE Table Ticket (
	TicketID char(6) AUTO_INCREMENT PRIMARY KEY,
    BookingID char(6),
    BoardingInfo TEXT,
    FOREIGN KEY (BookingID) REFERENCES Bookings(BookingID)
);

DROP TABLE IF EXISTS Seats;
CREATE TABLE Seats (
	SeatID char(6) AUTO_INCREMENT PRIMARY KEY,
    SeatMapID char(6),
    SeatNumber char(3),
    SeatClass ENUM('Ordinary', 'Comfort', 'Business-Class') NOT NULL,
    Availability BOOLEAN NOT NULL,
    Features ENUM('Extra LegRoom', 'Window', 'Aisle'),
    FOREIGN KEY (SeatMapID) REFERENCES SeatMap(SeatMapID)
);

DROP TABLE IF EXISTS SeatMap;
CREATE TABLE SeatMap (
	SeatMapID char(6) AUTO_INCREMENT PRIMARY KEY,
    FlightID char(6),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID)
);

DROP TABLE IF EXISTS PaymentTransaction;
CREATE TABLE PaymentTransaction (
	TransactionID char(6) AUTO_INCREMENT PRIMARY KEY,
    BookingID char(6),
    Amount DECIMAL(10, 2) NOT NULL,
    Time_stamp DATETIME NOT NULL,
    PaymentID char(6),
    FOREIGN KEY (PaymentID) REFERENCES PaymentMethods(PaymentID)
);

DROP TABLE IF EXISTS PaymentMethods;
CREATE TABLE PaymentMethods (
	PaymentID char(6) AUTO_INCREMENT PRIMARY KEY,
    UserID char(6),
    PaymentProvider varchar(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);