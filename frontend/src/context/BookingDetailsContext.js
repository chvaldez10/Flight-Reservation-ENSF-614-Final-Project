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
    submitted: false,
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
      bookingDetails.Email &&
      !bookingDetails.submitted 
    ) {
      submitBookingDetails();
    }
  }, [bookingDetails]);

  const submitBookingDetails = async () => {
    console.log("Entering submitBookingDetails");
    try {
      const {
        FlightID,
        SeatLetter,
        SeatNum,
        FName,
        LName,
        Email,
        InsuranceFlag,
      } = bookingDetails;
      console.log("Passenger details:", bookingDetails);
  
      const response = await axios.post(
        "http://localhost:3001/api/completeBooking",
        {
          FlightID,
          SeatLetter,
          SeatNum,
          InsuranceFlag,
          FName,
          LName,
          Email,
        }
      );
  
      console.log("Booking Details Submitted:", response.data);
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        submitted: true,
      }));
      return response.data;
    } catch (error) {
      console.error("Error submitting booking details:", error);
      throw error;
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
