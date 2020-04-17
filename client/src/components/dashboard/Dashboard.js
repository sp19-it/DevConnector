import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
  
  componentWillMount() {
    this.props.getCurrentProfile()
  }

  onClickDelete() {
    this.props.deleteAccount()
  }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profiles/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <br/>
            <button
            className="btn btn-danger"
            onClick={this.onClickDelete.bind(this)}
            >
              Delete Account
            </button>
          </div>
        )
      } else {
        dashboardContent = (
          <div>
            <p>Please create your profile</p>
            <Link to="profile/create-profile" className="btn btn-info">
              Create Profile
            </Link>
          </div>
        )
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-5">Dashboard</h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);