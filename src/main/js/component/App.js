/* globals window */
/* eslint-disable react/no-array-index-key, react/sort-comp */

import React from 'react';
import { connect } from "react-redux";
import {
  Link, Route, BrowserRouter as Router, Switch
} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Logo from './bodyContent/Logo';
import i18n from '../i18n/i18n';
import AboutUs from './bodyContent/AboutUs';
import Home from './bodyContent/Home';
import OurBlogs from './bodyContent/OurBlogs';
import Review from './bodyContent/Review';
import WorkWithUs from './bodyContent/WorkWithUs';
import { getInitialSafarnamaData } from "../actions/actionCreators";
import { TAB_LINKS } from '../constants/constants';

/**
 * @desc function connects the redux dispatch to prop
 * @param {Function} dispatch - dispatcher
 * @return {Object} this function connects the redux dispact to props.
 */
const mapDispatchToProps = dispatch => ({
  getInitialLoadData: () => dispatch(getInitialSafarnamaData())
});

/**
 * @desc function returns the tab for rendering
 * @return {Array} this function returns array of tab.
 */
const getTabs = () => {
  const {
    HOME, WORK_WITH_US, OUR_BLOGS, REVIEW, ABOUT_US
  } = i18n;
  return [
    HOME, WORK_WITH_US, OUR_BLOGS, REVIEW, ABOUT_US
  ].map((item, i) => (
    <Tab
      key={i}
      label={<span className="safarnama-app-tab-background">{item}</span>}
      component={Link}
      to={TAB_LINKS[i]}
    />
  ));
};


/**
 * @class App
 * @desc This is the main class which consists of router to switch the page on selection of tabs.
 */
class App extends React.Component {
  tabContainer = React.createRef();

  // initial state value
  state = {
    selectedTabIndex: 0, // By default home page will be active
    bodyPaddingTop: '130px'
  }

  /**
   * @desc function to set the body padding top
   * This function calculates the height of header and sets it as padding top of body.
   * This is the tweak to handle the material ui APPBAR  position fixed isue.
   * @return {undefined} this function does not return any value.
   */
  setBodyPaddingTop = () => {
    setTimeout(() => {
      this.setState({ bodyPaddingTop: `${this.tabContainer.current.offsetHeight}px` });
    }, 0);
  }

  /**
   * @desc function to set the selected tab value
   * If we dont set the selected tab value to tab, active (selected tab underline) does not get updated
   * @param {Object} event - event payload.
   * @param {Number} selectedTabIndex - selected tab index.
   * @return {undefined} this function does not return any value.
   */
  tabSelectionChange = (event, selectedTabIndex) => {
    this.setState(prevState => Object.assign({}, prevState, { selectedTabIndex }));
  };

  /**
   * @inheritdoc
   */
  componentDidMount() {
    // gets the initial load data and dispatch it to store.
    const { getInitialLoadData } = this.props;
    getInitialLoadData();
    // sets the body top padding
    this.setBodyPaddingTop();
    window.addEventListener('resize', this.setBodyPaddingTop);
  }

  /**
   * @inheritdoc
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.setBodyPaddingTop);
  }

  /**
   * @inheritdoc
   */
  render() {
    const [home, workWithUs, Blog, review, aboutUs] = TAB_LINKS;
    const { selectedTabIndex, bodyPaddingTop } = this.state;
    return (
      <div className="safarnama-app-root">
        <Router>
          <AppBar position="fixed" color="default" className="safarnama-app-tabs-background">
            <div ref={this.tabContainer} className="safarnama-app-tabs-wrapper util-background-container">
              <Logo />
              <Tabs
                className="safarnama-app-tabs-menu-wrapper"
                indicatorColor="primary"
                textColor="primary"
                value={selectedTabIndex}
                onChange={this.tabSelectionChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {getTabs()}
              </Tabs>
            </div>
          </AppBar>
          <Switch>
            <div style={{ paddingTop: bodyPaddingTop }} ref={this.bodyContainer}>
              <Route key={home} path={home} exact render={() => <Home />} />
              <Route key={workWithUs} path={workWithUs} render={() => <WorkWithUs />} />
              <Route key={Blog} path={Blog} render={() => <OurBlogs />} />
              <Route key={review} path={review} render={() => <Review />} />
              <Route key={aboutUs} path={aboutUs} render={() => <AboutUs />} />
            </div>
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  getInitialLoadData: PropTypes.func.isRequired
};
export default connect(null, mapDispatchToProps)(App);
