/* globals  window, sessionStorage */
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import i18n from '../../i18n/i18n';
import { login } from "../../data/index";
import { pageStatus } from "../../actions/actionCreators";

/**
 * @constant
 * @enum { Object } enum for text type.
 */
const TEXT_TYPE = {
  USERNAME: "username",
  PASSWORD: "password"
};

/**
 * @desc function connects the redux dispatch to prop.
 * @param {Function} dispatch - dispatcher.
 * @return {Object} this function connects the redux dispact to props.
 */
const mapDispatchToProps = dispatch => ({
  setPageStatus: status => dispatch(pageStatus(status))
});

/**
 * @desc function to get the username and password text fields.
 * @param {Object} source - instance of Authentication.
 * @param {String} value - state value to set the text field
 * @param {String} type - type of text field.
 * @return {Object} - this function returns the container with text field.
 */
const getTextField =(source, value, type) => (
  <div className="auth-menu-item">
    <TextField
      id={type===TEXT_TYPE.USERNAME ? "outlined-name": "outlined-password-input"}
      label={type===TEXT_TYPE.USERNAME ? "username": "Password"}
      className="auth-menu-text-field"
      value={value}
      type={type===TEXT_TYPE.USERNAME ? "text": "password"}
      onChange={source.handleChange(type)}
      margin="normal"
      variant="outlined"
    />
  </div>
);

/**
 * @desc function returs the user content
 * @param {Object} source - instance of Authentication.
 * @return {Object} - this function returns the user content.
 */
const getUserContent = (source) => {
  const user = sessionStorage.getItem("safarnamaUser")
    ? JSON.parse(sessionStorage.getItem("safarnamaUser")).name.toUpperCase()
    : "";
  return (
    <>
      <div className="auth-menu-item">
        <Typography variant="h6" component="h5" className="auth-menu-header">
          {user}
        </Typography>
      </div>
      <div className="util-background-container auth-menu-body">
        <div className="auth-menu-item auth-menu-action-wrapper">
          <Button
            className="auth-menu-item-content"
            variant="contained"
            onClick={source.modifyUserHandler}
            classes={{ label: "auth-icon-button-allignmnet" }}
          >
            <EditIcon className="util-margin-right-absolute-loose" />
            {i18n.EDIT_USER}
          </Button>
          <Button
            className="auth-menu-item-content"
            variant="contained"
            onClick={source.handleLogout}
            classes={{ label: "auth-icon-button-allignmnet" }}
          >
            <SendIcon className="util-margin-right-absolute-loose" />
            {i18n.SIGNOUT}
          </Button>
        </div>
      </div>
    </>
  );
};

/**
 * @desc function returs the sign in content
 * @param {Object} source - instance of Authentication.
 * @param {Object} state - state attribute.
 * @return {Object} - this function returns the sign in content.
 */
const getSignInContent = (source, state) => {
  const { username, password, errorLabel } = source.state;
  return (
    <div>
      <div className="auth-menu-item">
        <Typography variant="h6" component="h5" className="auth-menu-header">
          {i18n.SIGNIN_TITLE}
        </Typography>
      </div>
      <div className="util-background-container auth-menu-body">
        { getTextField(source, username, TEXT_TYPE.USERNAME)}
        { getTextField(source, password, TEXT_TYPE.PASSWORD)}
        { errorLabel && (
          <div className="auth-menu-item auth-menu-error-label">
            <label>
              {errorLabel}
            </label>
          </div>
        )}
        <div className="auth-menu-item auth-menu-action-wrapper">
          <Button variant="contained" onClick={source.handleSignIn}>
            {i18n.SIGNIN}
          </Button>
          <Button variant="contained" onClick={source.handleRegistration}>
            {i18n.REGISTER}
          </Button>
        </div>
        <div className="auth-menu-item">
          <a
            className="auth-menu-item auth-menu-forgot-password"
            onClick={source.forgotPasswordHandler}
          >
            <label>{i18n.FORGOT_PASSWORD}</label>
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * @class Authentication
 * @desc This is the class for Authentication.
 */
class Authentication extends Component {
  state = {
    anchorEl: null,
    userName: "",
    password: "",
    errorLabel: "",
    isUserLoggedIn: Boolean(sessionStorage.getItem("safarnamaUser"))
  };

  /**
   * @def function to open the popup content
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  openPopupHandler = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * @def function to open the popup content
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  closePopupHandler = () => {
    this.setState({
      errorLabel: "",
      anchorEl: null,
      userName: "",
      password: ""
    });
  };

  /**
   * @def function to register the text change handler for text fields
   * @paran {String} name - state value which get changed
   * @return {Function} returns a function which get triggered on change of text in text field
   */
  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value
    });
  };

  /**
   * @def function to handle the sign in
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  handleSignIn = async (event) => {
    event.preventDefault();
    const { setPageStatus } = this.props;
    const { username, password, isUserLoggedIn } = this.state;
    if (!username && !password && !isUserLoggedIn) {
      this.setState({ errorLabel: i18n.ENTER_USERNAME_PASSWORD });
      return;
    }
    try {
      setPageStatus({ isLoading: true });
      const { data: { token, userDetails } } = await login({ username, password });
      setPageStatus({ isLoading: false });
      sessionStorage.setItem('jwtToken', token);
      sessionStorage.setItem(
        'safarnamaUser',
        JSON.stringify({ username: userDetails.userName, name: userDetails.name })
      );
      this.setState({
        errorLabel: "",
        anchorEl: null,
        userName: "",
        password: "",
        isUserLoggedIn: true
      });
    } catch (error) {
      this.setState({ errorLabel: i18n.INVALID_AUTH });
      setPageStatus({ isLoading: false, hasError: true });
    }
  }

  /**
   * @def function to handle the sign out. It clears session storage after user loges out
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('safarnamaUser');
    this.setState({ isUserLoggedIn: false, anchorEl: null });
  }

  /**
   * @def function to handle the new registration
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  handleRegistration = (event) => {
    this.closePopupHandler();
    // @TODO- need to handle forgot password
  }

  /**
   * @def function to modify the registered user
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  modifyUserHandler = (event) => {
    this.closePopupHandler();
    // @TODO- need to handle forgot password
  }

  /**
   * @def function to handle the forgot password
   * @paran {Object} event - event
   * @return {undefined} this function does not return any value
   */
  forgotPasswordHandler = (event) => {
    this.closePopupHandler();
    // @TODO- need to handle forgot password
  }

  /**
   * @inheritdoc
   */
  render() {
    const { anchorEl, isUserLoggedIn } = this.state;
    return (
      <div>
        <IconButton
          onClick={this.openPopupHandler}
          aria-haspopup="true"
        >
          <MenuIcon />
        </IconButton>
        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.closePopupHandler}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <form noValidate autoComplete="off">
            <div className="auth-menu-container">
              {
                !isUserLoggedIn
                  ? getSignInContent(this, this.state)
                  : getUserContent(this)
              }
            </div>
          </form>
        </Popover>
      </div>
    );
  }
}

Authentication.propTypes = {
  setPageStatus: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Authentication);
