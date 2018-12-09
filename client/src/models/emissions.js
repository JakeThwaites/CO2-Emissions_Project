const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Emissions = function () {

};

Emissions.prototype.bindEvents = function () {
  PubSub.subscribe("Emission:emissions-submitted", (event) => {
    const transport = this.calculateTransportEmissions(event.detail);
    const diet = this.calculateEmissionsByType(event.detail, "Diet") * 7;
    const household = this.calculateEmissionsByType(event.detail, "Household");
    const totalEmissions = transport + diet + household;

    console.log("Tranport emissions:", transport);
    console.log("Diet emissions", diet);
    console.log("Household emissions:", household);
    console.log("Total emissions:", totalEmissions);
  })
};

Emissions.prototype.calculateEmissionsByType = function (data, type) {
  const emissionsOfType = data.filter(item => item.type === type)

  const totalEmissions = emissionsOfType.reduce((acc, item) => {
    return acc + parseInt(item.value);
  }, 0)

  return totalEmissions;
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

  return emissions
};

module.exports = Emissions;
