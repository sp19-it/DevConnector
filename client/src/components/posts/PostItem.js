import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { addLike, removeLike, deletePost } from '../../actions/postActions';

 class PostItem extends Component {

  onLikeClick(id) {
    this.props.addLike(id)
  }

  findUserLike(likes) {
    const auth = this.props.auth;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true
    } else {
      return false
    }
  }

  onUnlikeClick(id) {
    this.props.removeLike(id)
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
  }

  render() {
    const { post, auth, showActions } = this.props;
    
    return (
      <div className="card card-body mb-3">
        <div className="row">

          <div className="col-md-2">
            <Link to="/profile">
              <img className="rounded-circle d-done d-md-block" src={post.avatar} alt="" />
            </Link>

            <br/>
            <p className="text-center">{post.name}</p>
          </div>

          <div className="col-md-10">
            <p className="lead">{post.text}</p>
              {showActions ? (
              <span>
                <button
                  className="btn btn-light mr-1"
                  type="button"
                  onClick={this.onLikeClick.bind(this, post._id)}
                >
                  <i
                    className={classnames('fas fa-thumbs-up', { 'text-info': this.findUserLike.bind(this, post.likes) })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                <button
                  className="btn btn-ligth mr-1"
                  type="button"
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>

                <Link
                  to={`/posts/${post._id}`}
                  className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    className="btn btn-danger mr-1"
                    type="button"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
              ): null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
