import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import i18n from '../../i18n/i18n';

/**
 * @function NoResults
 * @desc This is the Functisn for safarnama NoResults
*/
const NoResults = ({ classes, label }) => (
  <div className={
      classnames(
        "util-text-area-container util-text-area-data no-results",
        { [classes]: classes.length > 0 }
      )}
  >
    {label}
  </div>
);

NoResults.propTypes = {
  label: PropTypes.string,
  classes: PropTypes.string
};

NoResults.defaultProps = {
  label: i18n.NO_RESULTS_FOUND,
  classes: ""
};

export default NoResults;
