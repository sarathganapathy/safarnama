import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import i18n from '../../i18n/i18n';
import { getFormatedDateFromISOString } from "../helper/utils";

/**
 * Function returns the typograpy content to display as row in card content
 * @param {String} label - row label
 * @returns {Typography} typrograpy containg description
 */
const getCardRow = label => (
  <Typography component="label" noWrap className="safarnama-card-body-text">
    {label}
  </Typography>
);

/**
 * returns the card content with details
 * @param {String} description - description of the event
 * @param {String} eventLocation - event location
 * @param {String} eventStartDate - event start date
 * @param {String} currency - event curency type
 * @param {Number} price - price of event
 * @returns {CardContent} card content with nexting details as children
 */
const getCardContent=(description, eventLocation, eventStartDate, currency, price) => (
  <CardContent>
    {getCardRow(description)}
    {getCardRow(eventLocation)}
    {getCardRow(getFormatedDateFromISOString(eventStartDate))}
    {getCardRow(`${currency} ${price}`)}
  </CardContent>
);

/**
 * returns the card actions by setting events
 * @param {Object} eventCard - instance of EventCard
 * @param {Boolean} isExpanded - state to indicate whether collapse should be extended
 * @returns {CardActions}  returns the card actions
 */
const getCardActions = (eventCard, isExpanded) => (
  <CardActions className="safarnama-card-action" disableActionSpacing>
    <Button onClick={eventCard.handleDetailsClick} variant="contained">{i18n.DETAILS}</Button>
    <IconButton
      className={classnames('safarnama-card-expand', {
        'safarnama-card-expand-open': isExpanded
      })}
      onClick={eventCard.handleExpandClick}
      aria-expanded={isExpanded}
      aria-label="Show more"
    >
      <ExpandMoreIcon />
    </IconButton>
  </CardActions>
);

/**
 * @class EventCard
 * @desc This is the class for rendering event card.
 */
export default class EventCard extends React.Component {
  state = {
    isExpanded: false
  };

  /**
   * @desc this functions handles the expanding of description block.
   * @returns {undefined} does not return any value.
   */
  handleExpandClick = () => {
    this.setState(state => ({ isExpanded: !state.isExpanded }));
  };

  /**
   * @desc this functions handles the details button click.
   * @returns {undefined} does not return any value.
   */
  handleDetailsClick = (event) => {
    const { id, detailsClickHandler } = this.props;
    detailsClickHandler(event, id);
  };

  /**
   * @inheritdoc
   */
  render() {
    // props
    const {
      currency, eventName, eventLocation, price, eventStartDate, images: [{ eventImage }], description, details
    } = this.props;
    // state
    const { isExpanded } = this.state;
    return (
      <>
        <Card className="safarnama-card-root">
          <CardHeader
            classes={
            {
              root: 'safarnama-card-header',
              title: 'safarnama-card-header-text',
              content: 'safarnama-card-header-content'
            }
          }
            title={eventName}
          />
          <CardMedia
            className="safarnama-card-media"
            image={eventImage}
            title={eventName}
          />
          { getCardContent(description, eventLocation, eventStartDate, currency, price) }
          { getCardActions(this, isExpanded)}
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph className="safarnama-card-body-text">
                {details}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </>
    );
  }
}

EventCard.propTypes = {
  currency: PropTypes.string,
  description: PropTypes.string,
  details: PropTypes.string,
  detailsClickHandler: PropTypes.func,
  eventStartDate: PropTypes.string,
  images: PropTypes.instanceOf(Array),
  eventName: PropTypes.string,
  eventLocation: PropTypes.string,
  id: PropTypes.string.isRequired,
  price: PropTypes.number
};

EventCard.defaultProps = {
  currency: "",
  description: "",
  details: "",
  detailsClickHandler: (event, id) => ({}),
  eventName: "",
  eventLocation: "",
  eventStartDate: "",
  images: [],
  price: 0
};
