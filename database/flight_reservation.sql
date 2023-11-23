drop database if exists flight_reservation;
create database flight_reservation;
use flight_reservation;

drop table if exists registered_users;
create table registered_users (
	email 		varchar(50) not null,
	first_name	varchar(25) not null,
	last_name	varchar(25) not null,
	phone		varchar(20),
	address		varchar(225),
	password	varchar(225) not null,
	primary key (email)
);

drop table if exists aircrafts;
create table aircrafts (
    aircraft_id         int not null auto_increment,
    model               varchar(50) not null,
    primary key (aircraft_id)
);

drop table if exists flights;
create table flights (
    flight_number       varchar(10) not null,
    origin              varchar(50) not null,
    destination         varchar(50) not null,
    departure_date      date not null,
    aircraft_id         int not null,
    primary key (flight_number),
    foreign key (aircraft_id) references aircrafts(aircraft_id)
);

insert into aircrafts (model) values
('Boeing 747'),
('Airbus A320');

insert into flights (flight_number, origin, destination, departure_date, aircraft_id) values
('AB123', 'New York', 'Los Angeles', '2023-12-01', 1),
('CD456', 'Chicago', 'Miami', '2023-12-02', 2);

insert into registered_users (email, first_name, last_name, phone, address, password) values
('jack.doe@email.com',	'jack',	'doe', '123-456-789', '123 Main Street', 'password'),
('jill.doe@email.com',	'jill',	'doe', '123-456-789', '123 Main Street', 'password');
