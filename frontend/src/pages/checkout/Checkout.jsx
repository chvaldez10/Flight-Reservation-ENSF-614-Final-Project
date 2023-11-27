import React from "react";
import "./checkout.css";
import Payment from "../../components/payment/Payment";
import Seatmap from "../../components/seatmap/Seatmap";

const Checkout = () => {
  return (
    <div>
      <Seatmap />
      <Payment />
    </div>
  );
};

export default Checkout;
