/* eslint-disable no-underscore-dangle */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EventCard from "./EventCard";
import Modal from "./Modal";
import NoResults from "./NoResults";
import i18n from "../../i18n/i18n";

/**
 * @desc function connects the redux state to component props
 * @param {Object} state - state from redux store
 * @return {Object} this function returns props which will be passed to component.
 */
const mapStateToProps = ({ eventsData: { events } }) => ({ events });

/**
 * @desc this functions returns the array of event cards
 * @param {Array} events - events array containing event objects
 * @param {Events} contect - contect of events
 * @returns {Array} Array of EventCard.
 */
const getEventCads = (events, context) => (
  events.map(({ _id, ...event }) => (
    <div key={_id} className="safarnama-events-body-content-items">
      <EventCard id={_id} {...event} detailsClickHandler={context.handleDetailsClick} />
    </div>
  ))
);

/**
 * @desc this functions returns label saying there is no events available.
 * @returns {NoResults} return noevents found label.
 */
const getNoEventsLabel = () => (
  <NoResults label={i18n.NO_EVENTS_AVAILABLE} classes="safarnama-events-body-content-no-results" />
);

/**
 * @class Events
 * @desc This is the class for safarnama Events
 */
class Events extends Component {
  state = {
    isModalOpen: false,
    modalContent: {}
  }

  /**
   * @desc this functions handles the details button click.
   * @returns {undefined} does not return any value.
   */
  handleDetailsClick = (event, id) => {
    const { events } = this.props;
    this.setState({
      isModalOpen: true,
      modalContent: events.find(item => id === item._id)
    });
  };

  /**
  * @desc function for handling the modal close
  * @param {event} event object of onclick
  * @returns {undefined} it does not rturn any value
  */
  handleClose = (event, isModalOpen) => {
    this.setState({ isModalOpen });
  }

  render() {
    const { events } = this.props;
    const { isModalOpen, modalContent } = this.state;

    return (
      <div className="safarnama-events util-background-container">
        <div className="safarnama-events-header util-text-area-container">{i18n.UPCOMING_EVENTS}</div>
        <div className="util-flex-wrap">
          { events.length ? getEventCads(events, this) : getNoEventsLabel()}
        </div>
        {isModalOpen
          ? (
            <Modal
              isModalOpen={isModalOpen}
              handleModalClose={this.handleClose}
              modalContent={modalContent}
            />
          )
          : null}
      </div>
    );
  }
}

Events.propTypes = {
  events: PropTypes.instanceOf(Array)
};

Events.defaultProps = {
  events: []
};

export default connect(mapStateToProps)(Events);
