import React from 'react';
import i18n from '../../i18n/i18n';

/**
 * @function Logo
 * @desc This is the Function for safarnama logo and description
*/
function Logo() {
  return (
    <div className="safarnama-logo">
      <div className="safarnama-logo-image-wrapper">
        <img className="safarnama-logo-image-content" src="./images/logo.png" alt="safarnama" />
      </div>
      <div className="safarnama-logo-text-content">
        <div className="safarnama-logo-text-content-primary-text">{i18n.LOGO_NAME}</div>
        <div className="safarnama-logo-text-content-secondary-text">{i18n.LOGO_DESCRIPTION}</div>
      </div>
    </div>
  );
}
export default Logo;
