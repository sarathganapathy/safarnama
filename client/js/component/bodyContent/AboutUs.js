import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';

/**
 * @desc function returns the user Details.
 * @param {Array} userDetails - userDetails array containing object of user details.
 * @return {Object} this function returns element containing user details
 */
const getUserDetails = phone => phone.map(userDetails => (
  <div
    key={userDetails.userName}
    className="safarnama-about-us-user-details util-text-area-container util-flex-flow-row-nowrap"
  >
    <div className="safarnama-about-us-user-details-avatar">
      <div>
        <img src={userDetails.image} alt={userDetails.userName} />
      </div>
      <div className="safarnama-about-us-user-details-avatar-username util-font-label">{userDetails.userName}</div>
    </div>
    <div className="util-text-area-data safarnama-about-us-user-details-description ">{userDetails.description}</div>
  </div>
));

/**
 * @function AboutUs
 * @desc This is the Function for AboutUs
*/
const AboutUs = ({ description, userDetails }) => (
  <div className="safarnama-about-us-wrapper util-background-container">
    <div className="safarnama-about-us-content util-background-container">
      <div className="safarnama-about-us-description  util-text-area-data">
        {description}
      </div>
    </div>
    <div className="safarnama-about-us-content util-background-container">
      {getUserDetails(userDetails)}
    </div>
  </div>
);

AboutUs.propTypes = {
  description: PropTypes.string,
  userDetails: PropTypes.instanceOf(Array)
};

AboutUs.defaultProps = {
  description: i18n.ABOUT_US_DESCRIPTION,
  userDetails: Array.from({ length: 2 }, (_, i) => (
    {
      image: `./images/user${i+1}.png`,
      userName: i18n[`USER_${i+1}_NAME`],
      description: i18n[`USER_${i+1}_DESCRIPTION`]
    }
  ))
};

export default AboutUs;
