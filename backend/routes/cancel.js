import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Endpoint for deleting a passenger by BookingID and Email
router.delete("/cancel/:bookingID/:email", async (req, res) => {
  try {
    const bookingID = req.params.bookingID;
    const email = req.params.email;

    if (!bookingID || !email) {
      return res
        .status(400)
        .json({ error: "Booking ID and Email parameters are required" });
    }

    // Get the seat information for the passenger
    const seatQuery =
      "SELECT SeatLetter, SeatNum, FlightID FROM Passengers WHERE BookingID = ? AND Email = ?";
    const seatResult = await db.query(seatQuery, [bookingID, email]);

    if (seatResult.length === 0) {
      return res.status(404).json({ error: "Passenger not found" });
    }

    const { SeatLetter, SeatNum, FlightID } = seatResult[0];

    // Update the PaymentTransaction table to set the BookingID to null
    const updatePaymentTransactionQuery =
      "UPDATE PaymentTransaction SET BookingID = null WHERE BookingID = ?";
    await db.query(updatePaymentTransactionQuery, [bookingID]);

    // Delete the passenger record from the Passengers table
    const deletePassengerQuery =
      "DELETE FROM Passengers WHERE BookingID = ? AND Email = ?";
    await db.query(deletePassengerQuery, [bookingID, email]);

    // Check if there are no more passengers for the booking
    const remainingPassengersQuery =
      "SELECT COUNT(*) AS PassengerCount FROM Passengers WHERE BookingID = ?";
    const remainingPassengersResult = await db.query(remainingPassengersQuery, [
      bookingID,
    ]);

    if (remainingPassengersResult[0].PassengerCount === 0) {
      // If no more passengers, delete the booking from the Bookings table
      const deleteBookingQuery = "DELETE FROM Booking WHERE BookingID = ?";
      await db.query(deleteBookingQuery, [bookingID]);
    }

    // Update the seat availability in the SeatMap table
    const updateSeatQuery =
      "UPDATE SeatMap SET Availability = TRUE WHERE SeatLetter = ? AND SeatNum = ? AND FlightID = ?";
    await db.query(updateSeatQuery, [SeatLetter, SeatNum, FlightID]);

    res.json({ message: "Passenger and booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
