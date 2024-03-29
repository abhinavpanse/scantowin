import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import Vendor from "../layout/Vendor";
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, date, burns },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt={name} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <p className="post-date">
        Coins Required <span>{burns}</span>
      </p>
      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type="button"
            className="btn btn-success"
          >
            <i className="fab fa-hotjar" />{" "}
            <span>{burns > 0 && <span>{burns}</span>}</span>
          </button>
          {/* <button
            onClick={() => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button> */}
          <Link to={`/posts/${_id}`} className="btn btn-primary">
            More{" "}
            {/* {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )} */}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button type="button" className="btn btn-danger">
              <Link to="/vendor" component={Vendor}>
                get data of this coupon
              </Link>
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
