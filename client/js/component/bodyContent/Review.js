import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarReview from './starReview/StarReview';
import CommentBox from "./CommentBox";
import NoResults from "./NoResults";
import i18n from '../../i18n/i18n';
import { createUserReview } from "../../actions/actionCreators";

/**
 * @desc function connects the redux state to component props
 * @param {Object} state - state from redux store
 * @return {Object} this function returns props which will be passed to component.
 */
const mapStateToProps = ({ reviewsData: { reviews } }) => ({ reviews });


/**
 * @desc function connects the redux dispatch to prop.
 * @param {Function} dispatch - dispatcher.
 * @return {Object} this function connects the redux dispact to props.
 */
const mapDispatchToProps = dispatch => ({
  createReview: review => dispatch(createUserReview(review))
});

/**
 * @desc function returns array of review element.
 * @param {Array} reviews - Array of reviews.
 * @return {Array} this function returns array of review comment element.
 */
const getReviews = reviews => (reviews.map(({ _id, selectedStars, ...commentData }) => (
  <div key={_id} className="safarnama-reviews-star-content">
    <StarReview
      isEditable={false}
      selectedStars={selectedStars}
    />
    <CommentBox classes="safarnama-reviews-comment-box-wrapper" {...commentData} />
  </div>
)));

/**
 * @desc function returns element saying there is no reviews.
 * @return {NoResults} this function returns element saying there is no reviews.
 */
const getNoReviewsLabel = () => (
  <NoResults label={i18n.NO_REVIEWS_AVAILABLE} />
);

/**
 * @Class Review
 * @desc This is the class for Review
*/
class Review extends Component {
  state = {
    textValue: "",
    selectedReviewStars: 0
  }

  /**
  * @desc Event handler for text area content change.
  * sets the text value to state.
  * @param {Object} event - event.
  * @return {undefined} this function does not return any value.
  */
  textContentChangeHandler = ({ target: { value } }) => {
    this.setState({ textValue: value });
  }

  /**
  * @desc Event handler for srar review change.
  * sets the total number of selected stars to review.
  * @param {Object} event - event.
  * @param {Number} selectedNumberOfStars - selected number of stars.
  * @return {undefined} this function does not return any value.
  */
  starSelectionChangeHandler = (event, selectedNumberOfStars) => {
    this.setState({ selectedReviewStars: selectedNumberOfStars });
  }

  /**
  * @desc Event handler for  adding a review.
  * calls the dipatcher to add the review.
  * @return {undefined} this function does not return any value.
  */
  addReviewClickHandler = () => {
    const { textValue, selectedReviewStars } = this.state;
    const { createReview } = this.props;
    createReview(
      {
        details: textValue.trim(),
        selectedStars: selectedReviewStars
      }
    );
    this.setState({ textValue: "", selectedReviewStars: 0 });
  }

  /**
   * @inheritdoc
   */
  render() {
    const { reviews } = this.props;
    const { textValue, selectedReviewStars } = this.state;
    return (
      <div className="safarnama-reviews util-background-container">
        <div className="safarnama-reviews-content-body util-background-container">
          {reviews.length ? getReviews(reviews) : getNoReviewsLabel()}
        </div>
        <div className="safarnama-reviews-create-content">
          <div
            className="safarnama-reviews-create-content-header util-text-area-container util-header-text"
          >
            {i18n.RATE_US}
          </div>
          <div className="safarnama-reviews-create-content-body util-background-container">
            <StarReview
              selectedStars={selectedReviewStars}
              onSelectionChange={this.starSelectionChangeHandler}
            />
            <TextField
              fullWidth
              multiline
              onChange={this.textContentChangeHandler}
              placeholder={i18n.ENTER_YOUR_REVIEW_COMMENTS}
              value={textValue}
            />
            <div className="safarnama-reviews-create-content-body-button util-flex-align-right">
              <Button
                variant="contained"
                size="small"
                disabled={!selectedReviewStars}
                onClick={this.addReviewClickHandler}
              >
                {i18n.ADD}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  reviews: PropTypes.instanceOf(Array),
  createReview: PropTypes.func.isRequired
};

Review.defaultProps = {
  reviews: [
  ]
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);
