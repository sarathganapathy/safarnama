/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Star from "./Star";

/**
 * @Class StarReview
 * @desc This is the StarReview component
*/
export default class StarReview extends Component {
  // initial state
  state = {
    totalSelectedStars: 0,
    isStar1Selected: false,
    isStar2Selected: false,
    isStar3Selected: false,
    isStar4Selected: false,
    isStar5Selected: false
  };

    /**
    * @desc Event handler for star selection change.
    * @param {Object} e - event.
    * @param {Boolean} isSelected - boolean ststing whether the value is selected.
    * @param {Number} selectedStarKey - selected star number.
    * @return {undefined} this function does not return any value.
    */
    handleOnSelectionChange = (event, isSelected, selectedStarKey) => {
      const { onSelectionChange } = this.props;
      this.setState({
        ...[...Array(5)].reduce(
          (accumulator, _, index) => {
            accumulator[`isStar${index+1}Selected`]= ((isSelected && index+1 <= selectedStarKey)
            || (!isSelected && index+1 < selectedStarKey));
            return accumulator;
          }, {}
        ),
        ...{ totalSelectedStars: isSelected ? selectedStarKey : (selectedStarKey - 1) }
      });
      onSelectionChange(event, isSelected ? selectedStarKey : (selectedStarKey- 1));
    }

    /**
     @inheritdoc
     */
    static getDerivedStateFromProps({ selectedStars }, { totalSelectedStars }) {
      return !(selectedStars > 5 || selectedStars < 0) && selectedStars !== totalSelectedStars
        ? {
          ...[...Array(5)].reduce(
            (accumulator, _, index) => {
              accumulator[`isStar${index+1}Selected`]= index+1 <= selectedStars;
              return accumulator;
            }, {}
          ),
          ...{ totalSelectedStars: selectedStars }
        } : null;
    }

    /**
     @inheritdoc
     */
    render() {
      const { isEditable } = this.props;
      return (
        <div className="star-review-wrapper">
          {
            Object.keys(this.state).filter(value => value.includes("isStar") && value.includes("Selected"))
              .map((starValue, index) => (
                <div key={starValue}>
                  <Star
                    id={index + 1}
                    isEditable={isEditable}
                    // eslint-disable-next-line react/destructuring-assignment
                    isSelected={this.state[starValue]}
                    onSelectionChange={this.handleOnSelectionChange}
                  />
                </div>
              ))
          }
        </div>
      );
    }
}

StarReview.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  selectedStars: PropTypes.number, // Bug in eslint- not able to detect the props used in get derived state to props.
  isEditable: PropTypes.bool,
  onSelectionChange: PropTypes.func
};

StarReview.defaultProps = {
  selectedStars: 0,
  isEditable: true,
  onSelectionChange: (event, selectedNumberOfStars) => undefined
};
