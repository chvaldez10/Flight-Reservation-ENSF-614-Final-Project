import React from "react";
import "./checkout.css";
import Payment from "../../components/checkout/Payment";
import PassengerDetails from "../../components/checkout/PassengerDetails";
import SeatSelection from "../../components/checkout/SeatSelection";
import FlightDetails from "../../components/checkout/FlightDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";

const Checkout = () => {
  return (
    <div>
      <PassengerDetails />
      <SeatSelection />
      <FlightDetails />
      <InsuranceOption />
      <Payment />
    </div>
  );
};

export default Checkout;
