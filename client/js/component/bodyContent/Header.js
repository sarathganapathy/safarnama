import React from 'react';
import Authentication from "./Authentication";
import i18n from '../../i18n/i18n';
import { IMAGE_PATHS } from '../../constants/constants';

/**
 * @function Header
 * @desc This is the function for header which has logo and authentication.
 */
const Header = () => (
  <div className="safarnama-header">
    <div className="safarnama-header-image-wrapper">
      <img className="safarnama-header-image-content" src={IMAGE_PATHS.LOGO} alt="safarnama" />
    </div>
    <div className="safarnama-header-text-content">
      <div className="safarnama-header-text-content-primary-text">{i18n.LOGO_NAME}</div>
      <div className="safarnama-header-text-content-secondary-text">{i18n.LOGO_DESCRIPTION}</div>
    </div>
    <div className="safarnama-header-signin-logo"><Authentication /></div>
  </div>
);
export default Header;
