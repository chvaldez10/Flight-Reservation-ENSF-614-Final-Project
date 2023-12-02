import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const BookingDetailsContext = createContext();

export const useBookingDetails = () => useContext(BookingDetailsContext);

export const BookingDetailsProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    UserID: "",
    LName: "",
    FName: "",
    SeatLetter: null,
    SeatNum: null,
    FlightID: "",
    Email: "",
    InsuranceFlag: false,
  });

  const updateBookingDetail = (key, value) => {
    console.log(`Updating ${key} to`, value);
    setBookingDetails((prevDetails) => ({ ...prevDetails, [key]: value }));
  };

  const updateBookingDetails = (details) => {
    console.log("Updating booking details:", details);
    setBookingDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  useEffect(() => {
    // Conditional to prevent initial POST request
    if (
      bookingDetails.FlightID &&
      bookingDetails.SeatLetter &&
      bookingDetails.SeatNum &&
      bookingDetails.LName &&
      bookingDetails.FName &&
      bookingDetails.Email
    ) {
      submitBookingDetails();
    }
  }, [bookingDetails]);

  const submitBookingDetails = async () => {
    try {
      const { UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag } =
        bookingDetails;

      // Check if all required fields are filled
      if (
        !UserID ||
        !FlightID ||
        !SeatLetter ||
        SeatNum === null ||
        InsuranceFlag === undefined
      ) {
        console.error("All fields are required.");
        return; // Exit the function if any field is missing
      }

      const response = await axios.post(
        "http://localhost:3001/api/recordBooking",
        { UserID, FlightID, SeatLetter, SeatNum, InsuranceFlag }
      );
      console.log("Booking Details Submitted:", response.data);
    } catch (error) {
      console.error("Error submitting booking details:", error);
    }
  };

  return (
    <BookingDetailsContext.Provider
      value={{
        bookingDetails,
        updateBookingDetail,
        updateBookingDetails,
        submitBookingDetails,
      }}
    >
      {children}
    </BookingDetailsContext.Provider>
  );
};
