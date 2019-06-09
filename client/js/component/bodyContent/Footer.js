import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';

/**
 * @function Footer
 * @desc This is the Function for safarnama footer
*/
function Footer({ footerLabel }) {
  return (
    <div className="safarnama-footer">
      {footerLabel}
    </div>
  );
}

Footer.propTypes = {
  footerLabel: PropTypes.string
};

Footer.defaultProps = {
  footerLabel: i18n.COPYRIGHT
};

export default Footer;