import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import EventCard from './EventCard';
import i18n from '../../i18n/i18n';

/**
 * @desc function connects the redux state to component props
 * @param {Object} state - state from redux store
 * @return {Object} this function returns props which will be passed to component.
 */
const mapStateToProps = ({ eventsData: { events } }) => ({ events });

/**
 * @desc this functions returns the array of event cards
 * @param {Array} events - events array containing event objects
 * @returns {Array} Array of EventCard.
 */
const getEventCads = events => (
  events.map(({ eventId, ...event }) => (
    <div key={eventId} className="safarnama-events-body-content-items">
      <EventCard {...event} />
    </div>
  ))
);

/**
 * @desc this functions returns label saying there is no events available.
 * @returns {undefined} does not return any value.
 */
const getNoEventsLabel = () => (
  <div
    className="safarnama-events-body-content-no-results util-text-area-container"
  >
    {i18n.NO_EVENTS_AVAILABLE}
  </div>
);

/**
 * @function Footer
 * @desc This is the Function for safarnama Events
 */
function Events({ events }) {
  return (
    <div className="safarnama-events util-background-container">
      <div className="safarnama-events-header util-text-area-container">{i18n.UPCOMING_EVENTS}</div>
      <div className="util-flex-wrap">
        { events.length ? getEventCads(events) : getNoEventsLabel()}
      </div>
    </div>
  );
}

Events.propTypes = {
  events: PropTypes.instanceOf(Array)
};

Events.defaultProps = {
  events: []
};

export default connect(mapStateToProps)(Events);
