const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Emissions = function () {
  this.url = 'http://localhost:3000/api/emissions';
  this.request = new RequestHelper(this.url);
};

Emissions.prototype.bindEvents = function () {
  PubSub.subscribe("Emission:emissions-submitted", (event) => {
    const transport = this.calculateTransportEmissions(event.detail);
    const diet = this.calculateEmissionsByType(event.detail, "Diet");
    const household = this.calculateEmissionsByType(event.detail, "Household");

    const arrayOfEmissions = [transport, diet, household];
    console.log(arrayOfEmissions);
    this.postEmissions(arrayOfEmissions);
  })
};

Emissions.prototype.calculateEmissionsByType = function (data, type) {
  const emissionsOfType = data.filter(item => item.type === type)

  const totalEmissions = emissionsOfType.reduce((acc, item) => {
    return acc + parseInt(item.value);
  }, 0)

  const object = {type: type, value: totalEmissions};
  return object;
};

Emissions.prototype.calculateTransportEmissions = function (data) {
  let emissions = 0;

  data.forEach(function(item) {
    if (item.name === "Bus") {
      const busEmissions = (parseInt(item.value)) * 55;
      emissions += busEmissions;
    }
    else if (item.name === "Aeroplane") {
      const aeroplaneEmissions = (parseInt(item.value)) * 160;
      emissions += aeroplaneEmissions;
    }
    else if (item.name === "Car") {
      const carEmissions = (parseInt(item.value)) * 105;
      emissions += carEmissions;
    }
  })

  const object = {type: "Transport", value: emissions};

  return object
};

Emissions.prototype.postEmissions = function (emissions) {
  for (emission of emissions) {
    this.request.post(emission)
      .then((emissions) => {
        PubSub.publish('Emissions:data-loaded', emissions);
      })
      .catch(console.error);
  };
  }



module.exports = Emissions;
