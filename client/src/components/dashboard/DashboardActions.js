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
    src: "",
    dest: "",
    price: ""
  });
  useEffect(() => {
    getCurrentProfile();

    setFormData({
      coins: loading || !profile.coins ? "" : profile.coins,
      travel_distance:
        loading || !profile.travel_distance ? "" : profile.travel_distance
    });
  }, [loading, getCurrentProfile]);

  const {
    location,
    coins,
    travel_distance,
    thistravel_distance,
    thiscoins,
    src,
    price,
    dest
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Ticket Details</h1>
      <p className="lead">
        <i className="fas fa-bus" /> Have a safe journey ahead
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="number"
            placeholder="Current Coins"
            name="coins"
            value={coins}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="This Ticket Coins"
            name="coins"
            value={thiscoins}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Source"
            name="src"
            value={src}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Destination"
            name="dest"
            value={dest}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Total Travel Distance"
            name="travel_distance"
            value={travel_distance}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="This Ticket Travel Distance"
            name="thistravel_distance"
            value={thistravel_distance}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="This Ticket Price"
            name="price"
            value={price}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
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

// export default connect(mapStateToProps,
//   {createProfile,getCurrentProfile}
//   )(withRouter(DashboardActions2));

class DashboardActions extends Component {
  state = {
    result: "No result"
  };

  onChange = data => {
    if (data) {
      this.setState({
        result: data
      });
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    return (
      <div className="dash-buttons">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.onChange}
          style={{ width: "40%" }}
        />
        <p>{this.state.result}</p>

        <Link to="/edit-profile" className="btn btn-light">
          <i className="fas fa-user-circle text-primary" /> Use Ticket
        </Link>
      </div>
    );
  }
}

export default DashboardActions;
