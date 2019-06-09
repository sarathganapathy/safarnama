import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import i18n from '../../i18n/i18n';
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
 * @desc function returns the no result label.
 * @param {Array} phone - phone array containing object of phone details.
 * @return {Object} this function returns element containing no result label
 */
const getNoResultLabel = () => (
  <div className="work-with-us-no-result-label util-text-area-container util-text-area-data">
    {i18n.NO_OPENINGS}
  </div>
);

/**
 * @desc function returns the body content details.
 * @param {Object} description - description containing header and body.
 * @param {Array} phone - phone array containing object of phone details.
 * @param {String} email - email details
 * @return {Object} this function returns body content details.
 */
const getBodyContent= (description, phone, email) => (
  <>
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
  </>
);

/**
 * @function WorkWithUs
 * @desc This is the Function for WorkWithUs
*/
function WorkWithUs({ description, phone, email }) {
  return (
    <div className="work-with-us-wrapper util-background-container">
      {description ? getBodyContent(description, phone, email) : getNoResultLabel() }
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
