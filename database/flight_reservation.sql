drop database if exists flight_reservation;
create database flight_reservation;
use flight_reservation;

drop table if exists users;
create table users (
	email 		varchar(50) not null,
	firstName	varchar(25) not null,
	last_name	varchar(25) not null,
	phone		char(12),
	address		varchar(25),
	primary key (email)
);

insert into users (email, firstName, last_name, phone, address)
values
('john.doe@email.com',	'john',	'doe', '123-456-789', '123 Main Street'),
('jack.doe@email.com',	'jack',	'doe', '123-456-789', '123 Main Street'),
('jill.doe@email.com',	'jill',	'doe', '123-456-789', '123 Main Street');

drop table if exists registered_users;
create table registered_users (
	email 		varchar(50) not null,
	firstName	varchar(25) not null,
	last_name	varchar(25) not null,
	phone		char(12),
	address		varchar(25),
	password	varchar(50) not null,
	primary key (email)
);