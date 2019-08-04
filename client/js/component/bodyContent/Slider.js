import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

/**
 * @desc function returns the images container for slider
 * @param {Array} images - array of object containing images.
 * @return {Array} this function returns array of images.
 */
const getSliderImages = images => images.map(image => (
  <div key={image.id}>
    <img src={image.path} alt={image.label} />
  </div>
));

/**
 * @function Slider
 * @desc This is the slider class for displaying image carousel.
 */
const Slider = (props) => {
  const { images } = props;
  return (
    <div className="safarnama-carousel-wrapper">
      <Carousel
        className="safarnama-carousel"
        showArrows
        showThumbs={false}
        autoPlay
        interval={1000}
        infiniteLoop
        showStatus={false}
        showIndicators
        centerMode
        centerSlidePercentage={50}
        emulateTouch
      >
        {getSliderImages(images)}
      </Carousel>
    </div>
  );
};

Slider.propTypes = {
  images: PropTypes.instanceOf(Array)
};

Slider.defaultProps = {
  images: [
    {
      id: 1,
      path: "./images/1.png",
      label: "one"
    },
    {
      id: 1,
      path: "./images/2.png",
      label: "two"
    },
    {
      id: 1,
      path: "./images/3.png",
      label: "three"
    }
  ]
};
export default Slider;
