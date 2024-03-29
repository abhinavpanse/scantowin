import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import "./harsh.css";
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not told us your location, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
      <h1 className="large text-primary" style={{ "margin-top": "5vh" }}>
        Dashboard
      </h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      <div className="row">
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>You currently have {profile && profile.coins} coins.</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div class="card">
            <div className="form-group">
              <p>
                You have travelled {profile && profile.travel_distance} kms in
                public transport.
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>
                You have saved the planet by reducing your carbon footprint by{" "}
                {(profile && profile.travel_distance) * 12}
              </p>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="form-group">
              <p>You have saved 0.54 lit of Fuel by using public transport </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
