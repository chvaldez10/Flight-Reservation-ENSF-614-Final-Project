DROP DATABASE IF EXISTS AirlineDatabase;
CREATE DATABASE AirlineDatabase;
USE AirlineDatabase;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    UserID varchar(25) PRIMARY KEY,
    LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
    Address varchar(225),
    Phone varchar(25),
    Email varchar(100) UNIQUE,
    Password varchar(60),
    MembershipFlag BOOLEAN DEFAULT FALSE,
    LoyaltyBonus int DEFAULT 0
);

DROP TABLE IF EXISTS AdminUser;
CREATE TABLE AdminUser (
	AdminID varchar(25) PRIMARY KEY,
    Password varchar(60)
);

DROP TABLE IF EXISTS AirlineUser;
CREATE TABLE AirlineUser (
	StaffID varchar(25) PRIMARY KEY,
	Password varchar(60)
);

DROP TABLE IF EXISTS Aircraft; 
CREATE TABLE Aircraft (
	AircraftID INT AUTO_INCREMENT PRIMARY KEY,
    Model varchar(25) NOT NULL
);

DROP TABLE IF EXISTS Flights;
CREATE TABLE Flights (
	FlightID char(6) PRIMARY KEY,
    Origin varchar(50) NOT NULL,
    Destination varchar(50) NOT NULL,
    DepartureDate DATE NOT NULL,
    AircraftID INT NOT NULL,
    DepartureTime TIME,
    Duration TIME,
    ArrivalTime TIME,
    FOREIGN KEY (AircraftID) REFERENCES Aircraft(AircraftID)
);

DROP TABLE IF EXISTS Crew; 
CREATE TABLE Crew (
	CrewID char(5) PRIMARY KEY,
    LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
    Position varchar(25) NOT NULL
);

DROP TABLE IF EXISTS Seats;
CREATE TABLE Seats (
	SeatID varchar(6) PRIMARY KEY,
    SeatClass ENUM('Ordinary', 'Comfort', 'Business-Class') NOT NULL,
    Features ENUM('Window', 'Aisle'),
    LegRoom BOOLEAN,
    Price DECIMAL(10, 2)
);

DROP TABLE IF EXISTS SeatMap;
CREATE TABLE SeatMap (
	SeatLetter char(1) NOT NULL CHECK (SeatLetter >= 'A' AND SeatLetter <= 'D'),
    SeatNum int NOT NULL CHECK (SeatNum >= 1 AND SeatNum <= 20),
    FlightID varchar(6),
    SeatID varchar(6),
	Availability BOOLEAN NOT NULL,
    PRIMARY KEY (SeatLetter, SeatNum),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID),
    FOREIGN KEY (SeatID) REFERENCES Seats(SeatID)
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
    BookingID char(6) PRIMARY KEY,
    UserID varchar(25),
    FlightID char(6),
	SeatLetter char(1) NOT NULL CHECK (SeatLetter >= 'A' AND SeatLetter <= 'D'),
    SeatNum int NOT NULL CHECK (SeatNum >= 1 AND SeatNum <= 20),
    InsuranceFlag BOOLEAN NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID),
    FOREIGN KEY (SeatLetter, SeatNum) REFERENCES SeatMap(SeatLetter, SeatNum)
);

DROP TABLE IF EXISTS Ticket;
CREATE Table Ticket (
	TicketID INT AUTO_INCREMENT PRIMARY KEY,
    BookingID char(6),
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID)
);

DROP TABLE IF EXISTS PaymentTransaction;
CREATE TABLE PaymentTransaction (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    BookingID char(6),
    Amount DECIMAL(10, 2) NOT NULL,
    Time_stamp DATETIME NOT NULL,
    UserID varchar(25),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

DROP TABLE IF EXISTS Passengers;
CREATE TABLE Passengers (
	LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
	SeatLetter char(1) NOT NULL CHECK (SeatLetter >= 'A' AND SeatLetter <= 'D'),
    SeatNum int NOT NULL CHECK (SeatNum >= 1 AND SeatNum <= 20),
    FlightID char(6),
    Email varchar(100) NOT NULL,
    FOREIGN KEY (SeatLetter, SeatNum) REFERENCES SeatMap(SeatLetter, SeatNum),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID)
);

insert into Aircraft (Model) values
('Boeing 747'),
('Airbus A320');

INSERT INTO Flights (FlightID, Origin, Destination, DepartureDate, AircraftId, DepartureTime, Duration, ArrivalTime) VALUES
('AB1230', 'Calgary', 'Vancouver', '2023-12-01', 1, '08:20:00', '03:00:00', '11:20:00'),
('CD4560', 'Montreal', 'Toronto', '2023-12-02', 2, '13:00:00', '05:00:00', '18:00:00'),
('CA7890', 'Toronto', 'Vancouver', '2023-12-03', 1, '09:30:00', '05:30:00', '15:00:00'),
('BC2468', 'Montreal', 'Calgary', '2023-12-04', 2, '11:45:00', '04:15:00', '16:00:00'),
('ON1357', 'Edmonton', 'Ottawa', '2023-12-05', 1, '14:20:00', '03:45:00', '18:05:00'),
('NS9753', 'Toronto', 'Halifax', '2023-12-07', 1, '08:00:00', '06:15:00', '14:15:00'),
('MB7142', 'Montreal', 'Vancouver', '2023-12-09', 1, '12:40:00', '07:00:00', '19:40:00'),
('YT4876', 'Montreal', 'Edmonton', '2023-12-12', 2, '07:45:00', '05:00:00', '12:45:00'),
('NT9046', 'Whitehorse', 'Montreal', '2023-12-15', 1, '16:00:00', '04:30:00', '20:30:00'),
('NS2087', 'Calgary', 'Montreal', '2023-12-18', 2, '11:15:00', '06:15:00', '17:30:00');

INSERT INTO Users (UserID, LName, FName, Address, Phone, Email, Password) VALUES 
('jack1', 'Doe', 'Jack', '123 Main Street', '123-456-789', 'jack.doe@email.com', 'password'),
('testID', 'test', 'testing', '123 Test Street', '123-123-123', 'test.testing@gmail.com', 'password'),
('jill2', 'Doe', 'Jill', '123 Main Street', '123-456-789', 'jill.doe@email.com', 'password');

insert into AdminUser (AdminID, Password) values
('admin', 'password');

insert into AirlineUser (StaffID, Password) values
('staff', 'password');

insert into Crew (CrewID, LName, FName, Position) values
('123AA', 'Smith', 'Sarah', 'Pilot'),
('234CC', 'Smith', 'John', 'Flight Attendant');

insert into Seats (SeatID, SeatClass, Features, LegRoom) values
('1','Comfort', 'Window', '1'),
('2', 'Comfort', 'Aisle', '1'),
('3', 'Business-Class', 'Window', '0'),
('4', 'Business-Class', 'Aisle', '0'),
('5', 'Ordinary', 'Window', '0'),
('6', 'Ordinary', 'Aisle', '0');

insert into SeatMap (SeatLetter, SeatNum, FlightID, SeatID, Availability) values
('A', '12', 'AB1230', '3', '0'),
('A', '13', 'AB1230', '3', '0');

insert into Passengers (LName, FName, SeatLetter, SeatNum, FlightID, Email) values
('Doe', 'Jack', 'A', '12', 'AB1230', 'jack.doe@email.com'),
('Doe', 'Jill', 'A', '13', 'AB1230', 'jill.doe@email.com');

insert into Booking (BookingID, UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag) values
('B1234', 'jack1', 'AB1230', 'A', '12', '1'),
('B1235', 'jill2', 'AB1230', 'A', '13', '1');

insert into Ticket (TicketID, BookingID) values
('0001', 'B1234'),
('0002', 'B1235');

insert into PaymentTransaction (TransactionID, BookingID, Amount, Time_stamp, UserID) values
('00001', 'B1234', '200.51', '2023-10-22 15:30:00', 'jack1'),
('00002', 'B1235', '189.89', '2023-11-01 11:38:45', 'jill2'); 

insert into FlightCrew (FlightID, CrewID, Destination) values
('AB1230', '123AA', 'Los Angeles'),
('CD4560', '234CC', 'Miami');
