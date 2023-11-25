# Flight Reservation Web Application

## Contributors

- Carrie Chan
- Christian Valdez
- Dhananjay Roy
- Shadman Sajid

## Google Drive

[Link](https://drive.google.com/drive/folders/1afMQ9yS6ALphVekIJAWCYKHWRKbWoSj1?usp=sharing)

## Description

The Flight Reservation Web Application is designed to provide a comprehensive solution for booking flights online. Tailored to serve tourism agents, airline agents, registered users, and system administrators, the application offers a seamless experience for managing flight-related activities ranging from browsing available flights to processing payments and managing flight information.

### Key Features

- Browse flights to various destinations.
- Graphically select seats on flights.
- Opt for ticket cancellation insurance.
- Secure payment processing.
- Email notifications for ticket and payment confirmations.
- Flight management for airline agents and admins.

## Requirements Checklist

Below is the list of requirements that the application will fulfill. As development progresses, these checkboxes will be updated to reflect the current state of implementation.

### User Requirements

- [ ] **FR1**: Browse available flights to a specific destination.
- [ ] **FR2**: Select their desired flight.
- [ ] **FR3**: Browse the seat map graphically.
- [ ] **FR4**: Select their desired seat (regular or business-class).
- [ ] **FR5**: Select the desired ticket cancellation insurance.
- [ ] **FR6**: Make payment using a credit card.
- [ ] **FR7**: Receive ticket via email.
- [ ] **FR8**: Receive receipt for payments via email.
- [ ] **FR9**: Cancel their flight.

### Airline Agent Requirements

- [ ] **AR1**: Browse the list of passengers on a flight.

### System Admin Requirements

- [ ] **SR1**: Browse the list of flights, their origin, and destination on a specific date.
- [ ] **SR2**: Browse the list of crews on a specific flight.
- [ ] **SR3**: Browse the list of aircraft that the company owns.
- [ ] **SR4**: Add/remove crew members.
- [ ] **SR5**: Add/remove an aircraft.
- [ ] **SR6**: Add/remove flight destinations.
- [ ] **SR7**: Add/remove/modify flight information.
- [ ] **SR8**: Print list of users who have registered with the airline company.

### Registered User Benefits

- [ ] **BR1**: Receive monthly promotion news.
- [ ] **BR2**: Use airport lounges at a discounted price.
- [ ] **BR3**: Receive a free companion ticket once a year.

## Getting Started

(Instructions on how to get a copy of the application running on a local machine for development and testing purposes.)

## Installing

(Step-by-step series of examples that tell you how to get a development environment running.)

1. Clone the repo

2. Change the branch to main inside the terminal `git checkout main`

3. Pull the latest changes `git pull`

4. Load the `AirlineDatabase.sql` into MySQL.

5. Create a `.env` file in the `backend` directory

6. The `.env` should have the following credentials for your local MySQL server

   `DB_HOST='localhost'`

   `DB_USER='<your_mysql_user>'`

   `DB_PASSWORD='<your_mysql_password>'`

   `DB_DATABASE='AirlineDatabase'`

   `PORT=3001`

7. Open a new terminal then select the backend directory `cd backend`

8. `npm install`

9. `npm start` You should get confirmation that the backend server is up and connected to the port (default 3001, set in `.env` file).

10. Open a new terminal then select the frontend directory `cd frontend`

11. `npm install`

12. `npm start` You should get confirmation that the frontend server is up and connected to the right port (default 3000).

## Built With

- React
- Node.js + Express.js
- MySQL
