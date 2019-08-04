import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @class Star
 * @desc This is the Class for star component
*/
export default class Star extends Component {
  // initial state
  state = {
    isStarSelected: false
  };

  /**
     @inheritdoc
     */
  static getDerivedStateFromProps(props, state) {
    return props.isSelected !== state.isStarSelected ? { isStarSelected: props.isSelected } : null;
  }

  /**
    * @desc Event handler for srar selection.
    * @param {Object} event - event.
    * @return {undefined} this function does not return any value.
    */
   handleOnClick = (event) => {
     const { isStarSelected: isSelected } = this.state;
     const { onSelectionChange, isEditable, id } = this.props;
     if (isEditable) {
       onSelectionChange(event, !isSelected, id);
       this.setState(({ isStarSelected }) => ({ isStarSelected: !isStarSelected }));
     }
   }

   /**
     @inheritdoc
     */
   render() {
     const { isStarSelected } = this.state;
     return (
       <div
         className={classnames("star-container", {
           "star-selected": isStarSelected,
           "star-deselected": !isStarSelected
         })}
         onClick={this.handleOnClick}
       />
     );
   }
}

Star.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  isSelected: PropTypes.bool, // Bug in eslint- not able to detect the props used in get derived state to props.
  isEditable: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onSelectionChange: PropTypes.func
};

Star.defaultProps = {
  isSelected: false,
  isEditable: true,
  onSelectionChange: (event, isSelected) => undefined
};
