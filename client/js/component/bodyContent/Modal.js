import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Transition from "./Transition";
import Slider from "./Slider";
import i18n from '../../i18n/i18n';
import { IMAGE_PATHS } from '../../constants/constants';
import { getFormatedDateFromISOString, getUniqueKey } from "../helper/utils";

/**
 * returns the  grid body content description details
 * @param {String} value - values for the description in form of key and value
 * @returns {Grid} returns the description content in form of grid
 */
const getGridDescriptionContent= value => (
  <Grid item xs={12} sm={6} spacing={1}>
    <Paper className="safarnama-modal-paper safarnama-modal-data">
      <Typography variant="h6" component="h5">
        {value}
      </Typography>
    </Paper>
  </Grid>
);

/**
 * returns the  grid details content
 * @param {String} value - values for the details
 * @returns {Grid} returns the details content in form of grid
 */
const getGridDetailsContent= value => (
  <Grid item xs={12} sm={12} spacing={1}>
    <Paper className="safarnama-modal-paper safarnama-modal-details">
      {value}
    </Paper>
  </Grid>
);

/**
 * returns the toolbar content
 * @param {Object} modal - instance of modal
 * @param {*} eventName - eventname to set has header label in menubar
 * @returns {AppBar} returns the appbar containing toolbar
 */
const getToolBar = (modal, eventName) => (
  <AppBar className="safarnama-modal-appBar" position="relative" color="inherit">
    <Toolbar>
      <Typography variant="h6" className="safarnama-modal-title">{eventName}</Typography>
      <IconButton edge="end" color="inherit" onClick={modal.handleClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

/**
 * function returns object containing image details
 * @param {Array} images - images array
 * @param {String} eventName -  eventName
 * @returns {Array} array  of object containing image details
 */
const getSliderImageData = (images, eventName) => images.map(image => (
  {
    id: (image.eventImage || getUniqueKey()),
    path: image.eventImage ? image.eventImage : IMAGE_PATHS.IMAGE_NOT_FOUND,
    label: eventName
  }
));

/**
 * @class Modal
 * @desc This is the class for Modal dialog.
 */
class Modal extends Component {
 state = {
   isModalOpen: false
 }

 /**
  * @inheritDoc
  */
 static getDerivedStateFromProps(props, state) {
   return props.isModalOpen !== state.isModalOpen
     ? { ...state, isModalOpen: props.isModalOpen }
     : null;
 }

 /**
  * @desc function for handling the modal close
  * @param {event} event object of onclick
  * @returns {undefined} it does not rturn any value
  */
 handleClose = (event) => {
   const { handleModalClose } = this.props;
   const { isModalOpen } = this.state;
   this.setState({ isModalOpen: false });
   handleModalClose(event, !isModalOpen);
 }

 /**
  * @desc function for handling booking
  * @param {event} event object of onclick
  * @returns {undefined} it does not rturn any value
  */
 handleBooking = (event) => {
   const { handleModalClose } = this.props;
   const { isModalOpen } = this.state;
   this.setState({ isModalOpen: false });
   handleModalClose(event, !isModalOpen);
 }

 /**
  * @inheritDoc
  */
 render() {
   const { isModalOpen } = this.state;
   const {
     modalContent: {
       currency,
       eventName,
       eventLocation,
       price,
       eventStartDate,
       eventEndDate,
       images,
       description,
       details,
       moreDetails
     }
   } = this.props;
   return (
     <Dialog
       fullScreen
       open={isModalOpen}
       onClose={this.handleClose}
       TransitionComponent={Transition}
     >
       { getToolBar(this, eventName) }
       <div className="safarnama-modal util-background-container">
         <Slider images={getSliderImageData(images, eventName)} />
         <div className="safarnama-modal-grid">
           <Grid container spacing={3}>
             <Grid item xs={12} spacing={1}>
               <Paper className="safarnama-modal-paper safarnama-modal-heading util-text-center-align">
                 <Typography variant="h5" component="h3">
                   {description}
                 </Typography>
               </Paper>
             </Grid>
             {getGridDescriptionContent(`${i18n.LOCATION} : ${eventLocation}`)}
             {getGridDescriptionContent(`${i18n.PRICE} : ${currency}${price}`)}
             {getGridDescriptionContent(`${i18n.STARTS} : ${getFormatedDateFromISOString(eventStartDate)}`)}
             {getGridDescriptionContent(`${i18n.ENDS} : ${getFormatedDateFromISOString(eventEndDate)}`)}
             {getGridDetailsContent(details)}
             {getGridDetailsContent(moreDetails)}
             <Grid item xs={12} sm={12} spacing={1}>
               <Paper className="util-flex-align-center safarnama-modal-button">
                 <Button variant="contained" onClick={this.handleBooking}>{i18n.BOOK}</Button>
               </Paper>
             </Grid>
           </Grid>
         </div>
       </div>
     </Dialog>
   );
 }
}

Modal.propTypes = {
  modalContent: PropTypes.instanceOf(Object),
  handleModalClose: PropTypes.func
};

Modal.defaultProps = {
  handleModalClose: (event, modalState) => ({}),
  modalContent: {}
};

export default Modal;
