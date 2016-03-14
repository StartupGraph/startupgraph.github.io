import React/* , { PropTypes } */ from "react";

const subject = new Map();
subject.set("Elon Musk", {
  experience: [
    { id: 0, name: "Zip2", year: 2001, status: "acquired" },
    { id: 1, name: "PayPal", year: 2004, status: "closed" },
    { id: 2, name: "Tesla", year: 2006, status: "ipo" },
    { id: 3, name: "SpaceX", year: 2010, status: "ipo" },
    { id: 3, name: "SolarCity", year: 2010, status: "ipo" }
  ]
});
subject.set("", {
  experience: [
    { id: 0, name: "Zip2", year: 2001, status: "acquired" },
    { id: 1, name: "PayPal", year: 2004, status: "closed" },
    { id: 2, name: "Tesla", year: 2006, status: "ipo" },
    { id: 3, name: "SpaceX", year: 2010, status: "ipo" },
    { id: 3, name: "SolarCity", year: 2010, status: "ipo" }
  ]
});

class Storyline extends React.Component {
  render() {
    return <g></g>;
  }
}

export default Storyline;
