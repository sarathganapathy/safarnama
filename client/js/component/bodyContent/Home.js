import React from 'react';
import Slider from './Slider';
import Events from './Events';
import Footer from './Footer';

/**
 * @function Home
 * @desc This is the Function for home page which has slider/ Events and footer has children.
 */
const Home = () => (
  <div>
    <Slider />
    <Events />
    <Footer />
  </div>
);

export default Home;
