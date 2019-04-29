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
    workWithUsData: {
      workWithUs: {
        description,
        phone,
        email
      }
    }
  }
) => ({ description, phone, email });

/**
 * @desc function returns the phone details.
 * @param {Array} phone - phone array containing object of phone details.
 * @return {Object} this function returns element containing phone details
 */
const getPhoneDetails = phone => phone.map(({ type, number }) => (
  <div key={number}>
    <span className="util-font-label">{type}</span>
    <span> : </span>
    <span>{number}</span>
  </div>
));

/**
 * @function WorkWithUs
 * @desc This is the Function for WorkWithUs
*/
function WorkWithUs({ description, phone, email }) {
  return (
    <div className="work-with-us-wrapper util-background-container">
      <div className="work-with-us-content util-background-container">
        <div className="work-with-us-description-header util-text-area-container util-header-text">
          {description.header}
        </div>
        <div className="work-with-us-description-data util-text-area-container util-text-area-data">
          {description.content}
        </div>
      </div>
      <div className="work-with-us-content">
        <div className="work-with-us-contact-phone util-text-area-container">
          { getPhoneDetails(phone) }
        </div>
        <div className="util-font-label work-with-us-contact-email util-text-area-container">{email}</div>
      </div>
    </div>
  );
}

WorkWithUs.propTypes = {
  description: PropTypes.instanceOf(Object),
  phone: PropTypes.instanceOf(Array),
  email: PropTypes.string
};

WorkWithUs.defaultProps = {
  description: {
    header: "",
    content: ""
  },
  phone: [],
  email: ""
};

export default connect(mapStateToProps)(WorkWithUs);
