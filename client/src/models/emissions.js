const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Emissions = function () {

};

Emissions.prototype.bindEvents = function () {
  PubSub.subscribe("Emission:emissions-submitted", (event) => {
    console.log(event.detail);
  })
};

module.exports = Emissions;
