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

  const submitBookingDetails = async (newBookingDetails) => {
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
        totalPrice,
      } = newBookingDetails;

      console.log(newBookingDetails);
      const Amount = totalPrice;

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
          Amount,
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
