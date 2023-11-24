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
    Email varchar(100),
    Password varchar(25),
    MembershipFlag BOOLEAN,
    LoyaltyBonus int DEFAULT 0
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
    DepartureDate DATETIME NOT NULL,
    AircraftID INT NOT NULL,
    FOREIGN KEY (AircraftID) REFERENCES Aircraft(AircraftID)
);

DROP TABLE IF EXISTS Crew; 
CREATE TABLE Crew (
	CrewID char(5) PRIMARY KEY,
    LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
    Position varchar(25) NOT NULL
);

DROP TABLE IF EXISTS SeatMap;
CREATE TABLE SeatMap (
	SeatMapID char(6) PRIMARY KEY,
    FlightID char(6),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID)
);

DROP TABLE IF EXISTS Seats;
CREATE TABLE Seats (
	SeatID char(6) PRIMARY KEY,
    SeatMapID char(6),
    SeatClass ENUM('Ordinary', 'Comfort', 'Business-Class') NOT NULL,
    Availability BOOLEAN NOT NULL,
    Features ENUM('Extra LegRoom', 'Window', 'Aisle'),
    FOREIGN KEY (SeatMapID) REFERENCES SeatMap(SeatMapID)
);

DROP TABLE IF EXISTS CancellationInsurance;
CREATE TABLE CancellationInsurance (
	CancelID varchar(15) PRIMARY KEY,
    Policy TEXT,
    Price DECIMAL(10,2)
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
    UserID char(6),
    FlightID char(5),
    SeatID char(6),
    CancelID varchar(15),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID),
    FOREIGN KEY (SeatID) REFERENCES Seats(SeatID),
    FOREIGN KEY (CancelID) REFERENCES CancellationInsurance(CancelID)
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
    UserID char(6),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

DROP TABLE IF EXISTS CreditInfo;
CREATE TABLE CreditInfo (
	CardNum varchar(25) PRIMARY KEY,
    UserID char(6),
    CardType varchar(50),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

DROP TABLE IF EXISTS Passengers;
CREATE TABLE Passengers (
	LName varchar(25) NOT NULL,
    FName varchar(25) NOT NULL,
    SeatID char(6), 
    FlightID char(5),
    FOREIGN KEY (SeatID) REFERENCES Seats(SeatID),
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID)
);

insert into Aircraft (Model) values
('Boeing 747'),
('Airbus A320');

insert into Flights (FlightID, Origin, Destination, DepartureDate, AircraftId) values
('AB123', 'New York', 'Los Angeles', '2023-12-01', 1),
('CD456', 'Chicago', 'Miami', '2023-12-02', 2);

insert into Users (UserID, LName, FName, Address, Phone, Email, Password, MembershipFlag, LoyaltyBonus) values
('jack1', 'Doe', 'Jack', '123 Main Street', '123-456-789', 'jack.doe@email.com', 'password', '1', '10'),
('jill2', 'Doe', 'Jill', '123 Main Street', '123-456-789', 'jill.doe@email.com', 'password', '0', '0');

insert into Crew (CrewID, LName, FName, Position) values
('123AA', 'Smith', 'Sarah', 'Pilot'),
('234CC', 'Smith', 'John', 'Flight Attendant');

insert into CreditInfo (CardNum, UserID, CardType) values
('4385822056110982', 'jack1', 'Visa'),
('4000123456789010', 'jill2', 'MasterCard');

insert into SeatMap (SeatMapID, FlightID) values
('SA12', 'AB123'),
('SA13', 'AB123');

insert into Seats (SeatID, SeatMapID, SeatClass, Availability, Features) values
('A12', 'SA12', 'Ordinary', '0', 'Window'),
('A13', 'SA13', 'Ordinary', '0', 'Aisle');

insert into Passengers (LName, FName, SeatID, FlightID) values
('Doe', 'Jack', 'A12', 'AB123'),
('Doe', 'Jill', 'A13', 'AB123');

insert into CancellationInsurance (CancelID, Policy, Price) values
('C001', 'Can cancel', '99.49');

insert into Booking (BookingID, UserID, FlightID, SeatID, CancelID) values
('B1234', 'jack1', 'AB123', 'A12', 'C001'),
('B1235', 'jill2', 'AB123', 'A13', 'C001');

insert into Ticket (TicketID, BookingID) values
('0001', 'B1234'),
('0002', 'B1235');

insert into PaymentTransaction (TransactionID, BookingID, Amount, Time_stamp, UserID) values
('00001', 'B1234', '200.51', '2023-10-22 15:30:00', 'jack1'),
('00002', 'B1235', '189.89', '2023-11-01 11:38:45', 'jill2'); 