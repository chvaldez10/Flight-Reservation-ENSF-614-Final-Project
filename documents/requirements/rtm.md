# Requirements Traceability Matrix (RTM)

The RTM is used to ensure each requirement is implemented and tested. Below is the traceability matrix for the Flight Reservation Web Application.

| ID    | Requirement                                                                  | Use Case(s) | Design Element(s) | Implementation      | Test Case(s) | Verified |
| ----- | ---------------------------------------------------------------------------- | ----------- | ----------------- | ------------------- | ------------ | -------- |
| REQ1  | Browse available flights to a specific destination                           | UC1         | ViewFlights       | FlightService       | TC1          | [ ]      |
| REQ2  | Select a desired flight                                                      | UC2         | SelectFlight      | FlightService       | TC2          | [ ]      |
| REQ3  | Browse the seat map graphically                                              | UC3         | ViewSeatMap       | SeatMapService      | TC3          | [ ]      |
| REQ4  | Select desired seat (regular, or business-class)                             | UC4         | ChooseSeat        | SeatService         | TC4          | [ ]      |
| REQ5  | Select desired ticket cancellation insurance                                 | UC5         | InsuranceOption   | InsuranceService    | TC5          | [ ]      |
| REQ6  | Make payment using a credit card                                             | UC6         | ProcessPayment    | PaymentService      | TC6          | [ ]      |
| REQ7  | Receive ticket via email                                                     | UC7         | EmailTicket       | NotificationService | TC7          | [ ]      |
| REQ8  | Receive receipt for payments via email                                       | UC8         | EmailReceipt      | NotificationService | TC8          | [ ]      |
| REQ9  | Cancel their flight                                                          | UC9         | CancelFlight      | FlightService       | TC9          | [ ]      |
| REQ10 | Browse list of passengers in a flight (airline agents and flight attendants) | UC10        | ListPassengers    | PassengerService    | TC10         | [ ]      |
| REQ11 | Manage flight information and other information (system admins)              | UC11        | ManageFlights     | AdminService        | TC11         | [ ]      |
| REQ12 | Registered users receive monthly promotion news                              | UC12        | Promotions        | UserService         | TC12         | [ ]      |
| REQ13 | Use of airport lounges at a discount (registered users)                      | UC13        | LoungeAccess      | UserService         | TC13         | [ ]      |
| REQ14 | Receive a free companion ticket once a year (registered users)               | UC14        | CompanionTicket   | UserService         | TC14         | [ ]      |
| ...   | ...                                                                          | ...         | ...               | ...                 | ...          | [ ]      |

- [ ] Not Implemented / Verified
- [x] Implemented / Verified
