import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
/**
 * @function CommentBox
 * @desc This is the Function for CommentBox
*/
function CommentBox({ details, name, classes }) {
  return (
    <div className={classnames({ [classes]: classes.length > 0 })}>
      {details ? <div className="comment-box-details">{details}</div> : null }
      <div className="comment-box-user">{name}</div>
    </div>
  );
}

CommentBox.propTypes = {
  details: PropTypes.string,
  name: PropTypes.string,
  classes: PropTypes.string
};

CommentBox.defaultProps = {
  details: "",
  name: "",
  classes: ""
};
export default CommentBox;
