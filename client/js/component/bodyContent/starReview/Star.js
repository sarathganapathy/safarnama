/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, react/sort-comp */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @class Star
 * @desc This is the Class for star component
*/
export default class Star extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarSelected: props.isSelected
    };
  }

  /**
    * @desc Event handler for srar selection.
    * @param {Object} e - event.
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
    static getDerivedStateFromProps(props, state) {
      return props.selected !== state.isStarSelected ? { isStarSelected: props.isSelected } : null;
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
  isSelected: PropTypes.bool,
  isEditable: PropTypes.bool,
  id: PropTypes.number.isRequired,
  onSelectionChange: PropTypes.func
};

Star.defaultProps = {
  isSelected: false,
  isEditable: true,
  onSelectionChange: (event, isSelected) => undefined
};
