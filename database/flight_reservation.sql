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

insert into registered_users (email, first_name, last_name, phone, address, password)
values
('john.doe@email.com',	'john',	'doe', '123-456-789', '123 Main Street', 'password'),
('jack.doe@email.com',	'jack',	'doe', '123-456-789', '123 Main Street', 'password'),
('jill.doe@email.com',	'jill',	'doe', '123-456-789', '123 Main Street', 'password');
