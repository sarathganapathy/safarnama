import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommentBox from "./CommentBox";
import NoResults from "./NoResults";
import i18n from '../../i18n/i18n';
import { createUserBlog } from "../../actions/actionCreators";

/**
 * @desc function connects the redux state to component props
 * @param {Object} state - state from redux store
 * @return {Object} this function returns props which will be passed to component.
 */
const mapStateToProps = ({ blogsData: { blogs } }) => ({ blogs });

/**
 * @desc function connects the redux dispatch to prop.
 * @param {Function} dispatch - dispatcher.
 * @return {Object} this function connects the redux dispact to props.
 */
const mapDispatchToProps = dispatch => ({
  createBlog: blog => dispatch(createUserBlog(blog))
});

/**
 * @desc function returns array of Blog element.
 * @param {Array} blogs - Array of blogs.
 * @return {Array<Blog>} this function returns array of Blog class containing element.
 */
const getBlogs = blogs => (blogs.map(({ _id, ...blog }) => (
  <CommentBox classes="safarnama-blogs-content-background-shade" key={_id} {...blog} />
)));

/**
 * @desc function returns element saying there is no blog.
 * @return {NoResults} this function returns element saying there is no blog.
 */
const getNoBlogsLabel = () => (
  <NoResults label={i18n.NO_BLOGS_AVAILABLE} />
);

/**
 * @Class OurBlogs
 * @desc This is the class for safarnama blogs
*/
class OurBlogs extends Component {
  state = {
    isSaveButtonDisabled: true,
    textValue: ""
  }

  /**
  * @desc Event handler for text area content change.
  * sets the button status and text value to state.
  * @param {Object} event - event.
  * @return {undefined} this function does not return any value.
  */
  textContentChangeHandler = ({ target: { value } }) => {
    this.setState({ isSaveButtonDisabled: !value.trim().length, textValue: value });
  }

  /**
  * @desc Event handler for create button click.
  * calls the dipatcher to save a written blog.
  * @return {undefined} this function does not return any value.
  */
  createButtonClickHandler = () => {
    const { textValue } = this.state;
    const { createBlog } = this.props;
    createBlog({
      details: textValue.trim()
    });
    this.setState({ textValue: "" });
  }

  /**
   * @inheritdoc
   */
  render() {
    const { blogs } = this.props;
    const { isSaveButtonDisabled, textValue } = this.state;
    return (
      <div className="safarnama-blogs util-background-container">
        <div className="safarnama-blogs-content-body util-background-container">
          {blogs.length ? getBlogs(blogs) : getNoBlogsLabel()}
        </div>
        <div className="safarnama-blogs-create-content">
          <div className="safarnama-blogs-create-content-header util-text-area-container util-header-text">
            {i18n.CREATE_BLOG}
          </div>
          <div className="safarnama-blogs-create-content-body util-background-container">
            <TextField
              fullWidth
              multiline
              onChange={this.textContentChangeHandler}
              placeholder={i18n.ENTER_YOUR_BLOG}
              value={textValue}
            />
            <div className="safarnama-blogs-create-content-body-button util-flex-align-right">
              <Button
                variant="contained"
                disabled={isSaveButtonDisabled}
                size="small"
                onClick={this.createButtonClickHandler}
              >
                {i18n.CREATE}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OurBlogs.propTypes = {
  blogs: PropTypes.instanceOf(Array),
  createBlog: PropTypes.func.isRequired
};

OurBlogs.defaultProps = {
  blogs: [
  ]
};

export default connect(mapStateToProps, mapDispatchToProps)(OurBlogs);
