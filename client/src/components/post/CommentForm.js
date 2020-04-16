import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaField from '../common/TextAreaField';
import { createComment } from '../../actions/postActions';

class CommentForm extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const auth = this.props.auth;
    const postId = this.props.postId

    const newComment = {
      text: this.state.text,
      user: auth.name,
      avatar: auth.avatar
    }

    this.props.createComment(postId, newComment)
    this.setState({ text: '' })
  }

  render() {
    const errors = this.props.errors;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-dark text-white"> 
            Leave Comment
          </div>

          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <TextAreaField 
                type="text"
                placeholder="Leave Comment"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                error={errors.text}
              />

              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { createComment }) (CommentForm)