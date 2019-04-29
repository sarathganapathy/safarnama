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

/**
 * @class EventCard
 * @desc This is the class for rendering event card.
 */
export default class EventCard extends React.Component {
  state = { expanded: false };

  /**
   * @desc this functions handles the expanding of description block.
   * @returns {undefined} does not return any value.
   */
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  /**
   * @inheritdoc
   */
  render() {
    // props
    const {
      currency, eventName, eventLocation, price, date, imageUrl, description, details
    } = this.props;
    // state
    const { expanded } = this.state;
    return (
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
          image={imageUrl}
          title={eventName}
        />
        <CardContent>
          <Typography component="label" noWrap className="safarnama-card-body-text">
            {description}
          </Typography>
          <Typography component="label" noWrap className="safarnama-card-body-text">
            {eventLocation}
          </Typography>
          <Typography component="label" noWrap className="safarnama-card-body-text">
            {date}
          </Typography>
          <Typography component="label" noWrap className="safarnama-card-body-text">
            {currency}
            {price}
          </Typography>
        </CardContent>
        <CardActions className="safarnama-card-action" disableActionSpacing>
          <Button variant="contained">{i18n.BOOK}</Button>
          <IconButton
            className={classnames('safarnama-card-expand', {
              'safarnama-card-expand-open': expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className="safarnama-card-body-text">
              {details}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

EventCard.propTypes = {
  currency: PropTypes.string,
  eventName: PropTypes.string,
  eventLocation: PropTypes.string,
  price: PropTypes.number,
  date: PropTypes.string,
  imageUrl: PropTypes.string,
  description: PropTypes.string,
  details: PropTypes.string
};

EventCard.defaultProps = {
  currency: "",
  eventName: "",
  eventLocation: "",
  price: 0,
  date: "",
  imageUrl: "",
  description: "",
  details: ""
};
