import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaField from '../common/TextAreaField';
import PropTypes from 'prop-types';
import { createPost } from '../../actions/postActions';


class PostForm extends Component {

  constructor() {

    super();
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const user = this.props.auth.user
    
    const newPost = {
      text: this.state.text,
      user: user.name,
      avatar: user.avatar
    }

    this.props.createPost(newPost);
    this.setState({ text: '' })
    
  }

  render() {
    const errors = this.props.errors

    return (
      <div className="post-form mb-3">
        <div className="card card-dark">
          <div className="card-header bg-dark text-white">Create a Post</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
                <TextAreaField
                  type="text"
                  placeholder="Create a post"
                  value={this.state.text}
                  name="text"
                  onChange={this.onChange}
                  error={errors.text}
                />

              <button className="btn btn-dark" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTyeps = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { createPost })(PostForm);