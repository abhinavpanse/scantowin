import React, { Component, Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import QrReader from "react-qr-reader";

const DashboardActions2 = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    coins: "",
    travel_distance: "",
    qrData: {
      src: "",
      dest: "",
      price: "",
      thiscoins: "",
      thistravel_distance: ""
    }
  });
  const [qrShow, setqrShow] = useState(0);

  useEffect(() => {
    getCurrentProfile();
    console.log(profile);
    setFormData({
      coins: loading || !profile.coins ? 0 : profile.coins,
      travel_distance:
        loading || !profile.travel_distance ? 0 : profile.travel_distance,
      qrData: {
        src: "",
        dest: "",
        thiscoins: 0,
        thistravel_distance: 0,
        price: 0
      }
    });
  }, [loading, getCurrentProfile]);
  var qr = qrShow;
  const { coins, travel_distance, qrData } = formData;
  const onChange = () => {
    // e.preventDefault();

    createProfile(
      { coins: formData.coins, travel_distance: formData.travel_distance },
      history,
      true
    );
    ++qr;
    setqrShow(qr);

  };
  const onQRscan = data => {
    if (data) {
      data = JSON.parse(data);
      const updatedCoin = parseInt(coins) + parseInt(data.thiscoins);
      const updatedTravel_distance =
        parseInt(travel_distance) + parseInt(data.thistravel_distance);
      if (qrData.thiscoins == 0 || qrData.thiscoins == "") {

        console.log(formData);





        // console.log("data" + JSON.stringify(data));
        // console.log("formData" + JSON.stringify(formData));

        // if (formData.thiscoins != 0) {
        setFormData({
          ...formData,
          qrData: data,
          coins: updatedCoin,
          travel_distance: updatedTravel_distance
        });
        // createProfile(
        //   { coins: updatedCoin, travel_distance: updatedTravel_distance },
        //   history,
        //   true
        // );
        // }

      }
      onChange();
    }

  };



  const handleError = err => {
    console.error(err);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Ticket Details</h1>
      <p className="lead">
        <i className="fas fa-bus" /> Have a safe journey ahead
      </p>
      {(qrShow <= 1) && <div className="panse">
        <QrReader
          onScan={onQRscan}
          onError={handleError}
          style={{ width: "80%" }}
        />
      </div>}

      <form className="form" >
        <div className="form-group">
          <input
            type="number"
            placeholder="Current Coins"
            name="coins"
            value={coins}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="This Ticket Coins"
            name="coins"
            value={qrData.thiscoins}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Source"
            name="src"
            value={qrData.src}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Destination"
            name="dest"
            value={qrData.dest}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Total Travel Distance"
            name="travel_distance"
            value={travel_distance}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="This Ticket Travel Distance"
            name="thistravel_distance"
            value={qrData.thistravel_distance}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="This Ticket Price"
            name="price"
            value={qrData.price}
          />
        </div>


      </form>
    </Fragment>
  );
};

DashboardActions2.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(DashboardActions2));

// const DashboardActions = props => {
//   const [result, setResult] = useState({ a: "" });

//   const onChange = data => {
//     if (data) {
//       console.log(JSON.parse(data));
//       setResult(data);
//     }
//   };
//   const handleError = err => {
//     console.error(err);
//   };

//   return (
//     <div className="dash-buttons">
//       <QrReader
//         delay={300}
//         onError={handleError}
//         onScan={onChange}
//         style={{ width: "40%" }}
//       />
//       <p>{result}</p>

//       <Link to="/edit-profile" className="btn btn-light">
//         <i className="fas fa-user-circle text-primary" /> Use Ticket
//       </Link>
//     </div>
//   );
// };

// export default DashboardActions;
