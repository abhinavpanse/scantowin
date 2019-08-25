import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "./Login.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: ""
  });

  const { phone_number, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(phone_number, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div class="signupSection">
        <div class="info">
          <h2>Virtuso</h2>
          <i class="icon ion-ios-ionic-outline" aria-hidden="true"></i>
          <p>Effectively Free Public Transport EcoSystem</p>
        </div>
        <form className="signupForm " onSubmit={e => onSubmit(e)}>
          <h2>Sign In</h2>
          <ul class="noBullet">
            <li>
              <label for="Phone Number"></label>
              <input
                type="text"
                class="inputFields"
                id="phone_number"
                name="phone_number"
                placeholder="Phone Number"
                value={phone_number}
                onChange={e => onChange(e)}
                required
              />
            </li>
            <li>
              <label for="Password"></label>
              <input
                type="password"
                class="inputFields"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => onChange(e)}
                required
              />
            </li>
            <li id="center-btn">
              <input
                type="submit"
                id="join-btn"
                name="Login"
                alt="Login"
                value="Login"
              />
            </li>
          </ul>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
