import React, { useState } from "react";
import "./checkout.css";
import Payment from "../../components/checkout/Payment";
import FlightDetails from "../../components/checkout/FlightDetails";
import InsuranceOption from "../../components/checkout/InsuranceOption";

const Checkout = () => {
  const [hasInsurance, setHasInsurance] = useState(false);

  const handleInsuranceSelect = (isSelected) => {
    setHasInsurance(isSelected);
  };

  return (
    <div>
      <FlightDetails
        flightInfo={{
          origin: "Calgary",
          destination: "Edmonton",
          departureDate: "2023-11-26",
          departureTime: "8:20-9:21",
        }}
      />

      <InsuranceOption onInsuranceSelect={handleInsuranceSelect} />
      <Payment />
    </div>
  );
};

export default Checkout;
