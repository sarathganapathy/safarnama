import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

/**
 * @desc function connects the redux state to component props
 * @param {Object} state - state from redux store
 * @return {Object} this function returns props which will be passed to component.
 */
const mapStateToProps = (
  {
    aboutUsData: {
      aboutUs: {
        description,
        userDetails
      }
    }
  }
) => ({
  description, userDetails
});

/**
 * @desc function returns the user Details.
 * @param {Array} userDetails - userDetails array containing object of user details.
 * @return {Object} this function returns element containing user details
 */
const getUserDetails = phone => phone.map(userDetails => (
  <div key={userDetails.userName} className="about-us-user-details util-text-area-container util-flex-flow-row-nowrap">
    <div className="about-us-user-details-avatar">
      <div>
        <img src={userDetails.image} alt={userDetails.userName} />
      </div>
      <div className="about-us-user-details-avatar-username util-font-label">{userDetails.userName}</div>
    </div>
    <div className="about-us-user-details-description util-text-area-data">{userDetails.description}</div>
  </div>
));

/**
 * @function AboutUs
 * @desc This is the Function for AboutUs
*/
function AboutUs({ description, userDetails }) {
  return (
    <div className="about-us-wrapper util-background-container">
      <div className="about-us-content util-background-container">
        <div className="about-us-description util-text-area-container util-text-area-data">
          {description}
        </div>
      </div>
      <div className="about-us-content util-background-container">
        {getUserDetails(userDetails)}
      </div>
    </div>
  );
}

AboutUs.propTypes = {
  description: PropTypes.string,
  userDetails: PropTypes.instanceOf(Array)
};

AboutUs.defaultProps = {
  description: "",
  userDetails: []
};

export default connect(mapStateToProps)(AboutUs);
