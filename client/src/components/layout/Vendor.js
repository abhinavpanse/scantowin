import React from "react";
import "../dashboard/harsh.css";
const Vendor = () => {
  return (
    <div>
      <h1>Hello ! You are Loged in as a Vendor</h1>
      <h3>Here are some insights for you </h3>
      <div className="row">
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>102 Customers had avail coupons of your shop</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>10 Customers had visited more than 10 times in your shop</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>Most of your Customers were from Udyog Vihar, Gurugram</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>Your Shop is among top 5% grossing in your area</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
