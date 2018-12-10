const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Emissions = function () {
  this.url = 'http://localhost:3000/api/emissions';
  this.request = new RequestHelper(this.url);
  this.emissions = [
    {
      type: "transport",
      name: "car",
      value: 0

    },
     {
       type: "transport",
       name: "aeroplane",
       value: 0
     },
     {
       type: "transport",
       name: "bus",
       value: 0
     },
     {
       type: "diet",
       name: "diet",
       value: 0
     },
     {
       type: "household",
       name: "electricity",
       value: 0
     },
     {
       type: "household",
       name: "gas",
       value: 0
     }
   ]
};

Emissions.prototype.handleUpdate = function (updatedEmission) {
  updatedEmission.value = parseInt(updatedEmission.value);

  this.emissions.forEach((emission) => {
    if (emission.name === updatedEmission.name) {
      emission.value = updatedEmission.value;
    };
  });
};

Emissions.prototype.bindEvents = function () {
    PubSub.subscribe("EmissionFormView:emissions-updated", (event) => {
      this.handleUpdate(event.detail);
      const transport = this.calculateTransportEmissions(this.emissions);
      const diet = this.calculateEmissionsByType(this.emissions, "diet");
      const household = this.calculateEmissionsByType(this.emissions, "household");

    const arrayOfEmissions = [transport, diet, household];
    console.log(arrayOfEmissions);
    PubSub.publish("Emissions:data-loaded", arrayOfEmissions);
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
    if (item.name === "bus") {
      const busEmissions = (parseInt(item.value)) * 55;
      emissions += busEmissions;
    }
    else if (item.name === "aeroplane") {
      const aeroplaneEmissions = (parseInt(item.value)) * 160;
      emissions += aeroplaneEmissions;
    }
    else if (item.name === "car") {
      const carEmissions = (parseInt(item.value)) * 105;
      emissions += carEmissions;
    }
  })

  const object = {type: "transport", value: emissions};

  return object
};

Emissions.prototype.calculateHouseholdEmissions = function (emissions) {
  const emissionsOfType = data.filter(item => item.type === "household")

  const totalEmissions = emissionsOfType.reduce((acc, item) => {
    return acc + parseInt(item.value);
  }, 0)
};

Emissions.prototype.postEmissions = function (emissions) {
  for (emission of emissions) {
    this.request.post(emission)
      .then((emissions) => {
        // PubSub.publish('Emissions:data-loaded', emissions);
      })
      .catch(console.error);
  };
  }



module.exports = Emissions;
