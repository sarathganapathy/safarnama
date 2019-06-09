/* eslint-disable prop-types */

const tempEvents = {
  events: [
    {
      eventId: 1,
      bookingURl: 'http:kjkjkj.com',
      eventName: 'GOKARNA',
      eventLocation: 'Gokarna',
      price: 2000,
      date: '12/jun/2019',
      imageUrl: './images/1.png',
      description: 'gokarna trecking event',
      details: 'gokarna trecking : trecking at gokarnan hills with two days stay and free food',
      currency: '₹'
    },
    {
      eventId: 2,
      bookingURl: 'http:kjkjkj.com',
      eventName: 'KUDREMUKA',
      eventLocation: 'kudremuka',
      price: 2000,
      date: '12/jun/2019',
      imageUrl: './images/2.png',
      description: 'kudremuka treck event',
      details: 'kudremuka trecking : trecking at gokarnan hills with two days stay and free food',
      currency: '₹'
    },
    {
      eventId: 3,
      bookingURl: 'http:kjkjkj.com',
      eventName: 'MADIKERI',
      eventLocation: 'madikeri',
      price: 2000,
      date: '12/jun/2019',
      imageUrl: './images/3.png',
      description: 'madikeri trecking event',
      details: 'madikeri trecking : trecking at gokarnan hills with two days stay and free food',
      currency: '₹'
    },
    {
      eventId: 4,
      bookingURl: 'http:kjkjkj.com',
      eventName: 'SAKLESHPURA',
      eventLocation: 'Sakleshpura',
      price: 2000,
      date: '12/jun/2019',
      imageUrl: './images/4.png',
      description: 'Sakleshpura trecking event',
      details: 'Sakleshpura trecking : trecking at gokarnan hills with two days stay and free food',
      currency: '₹'
    }
  ],
  blogs: [
    {
      id: 1,
      details: "safarnama is great tecking group \nsuper crazy people \nhad wonderful experience",
      user: "Ganapathy"
    }
  ],
  reviews: [
    {
      id: 1,
      details: "safarnama is great tecking group \nsuper crazy people \nhad wonderful experience",
      user: "Ganapathy",
      selectedStars: 3
    }
  ],
  workWithUs: {
    // eslint-disable-next-line max-len
    description: {
      header: "We are hiring",
      content: "We are looking to expand our amazing team \nWe are looking for content writers and marketing associates \nPeople who are interested plese free feel to contact"
    },
    phone: [{
      type: "business",
      number: 123456
    }, {
      type: "faxs",
      number: 123456
    }],
    email: "fmp.com"
  },
  aboutUs: {
    // eslint-disable-next-line max-len
    description: "We are looking to expand our amazing team \nWe are looking for content writers and marketing associates \nPeople who are interested plese free feel to contact",
    userDetails: [{
      image: "./images/2.png",
      userName: "Karandeep singh",
      description: "I am rocket sing, I am facinated business man . I am founder of this company"
    }, {
      image: "./images/2.png",
      userName: "Karandeep singh",
      description: "I am rocket sing, I am facinated business man . I am founder of this company"
    }]
  }
};

export default tempEvents;
