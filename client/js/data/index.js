import axios from 'axios';

/**
 * @desc function to get the safarnam data
 * @returns {Promise} returns safarnama data promise
 */
export const getSafarnamaData = () => axios.get("/initialData/");

/**
 * @desc function to add review comments
 * @param {Object} review - review data
 * @returns {Promise} returns review promise data
 */
export const addReviewData = review => axios.post("/reviews/", review);

/**
 * @desc function to get the review data
 * @returns {Promise} returns review data
 */
export const getReviewData = () => axios.get("/reviews/");

/**
 * @desc function to add blog
 * @param {Object} review - blog data
 * @returns {Promise} returns review promise data
 */
export const addBlogData = blog => axios.post("/blogs/", blog);

/**
 * @desc function to get the blog data
 * @returns {Promise} returns blog data
 */
export const getBlogData= () => axios.get("/blogs/");