drop database if exists flight_reservation;
create database flight_reservation;
use flight_reservation;

drop table if exists users;
create table users (
	Name			varchar(25) not null,
	Phone			char(12),
	Address			varchar(25),
	primary key (Name)
);

insert into users (Name, Phone, Address)
values
('A',	'1',	'5'),
('B',	'2',	'5'),
('C.',	'3',	'5');