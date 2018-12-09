const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const EmissionFormView = function (form) {
  this.form = form;
};

EmissionFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (event) => {
    this.handleSubmit(event);
  });
};

EmissionFormView.prototype.handleSubmit = function (event) {
  event.preventDefault();
  const newEmission = this.createEmission(event.target);
  console.log(newEmission);
  PubSub.publish("Emission:emissions-submitted", newEmission);

  event.target.reset();
};

EmissionFormView.prototype.createEmission = function (form) {
  const newCar = {
    type: "Transport",
    name: "Car",
    value: form.userCar.value
  };

  const newAeroplane = {
    type: "Transport",
    name: "Aeroplane",
    value: form.userAeroplane.value
  };

  const newBus = {
    type: "Transport",
    name: "Bus",
    value: form.userBus.value
  };

  const newDiet = {
    type: "Diet",
    value: form.userDiet.value
  };

  const newHousehold = {
    type: "Household",
    value: form.userHousehold.value
  };

  const allEmissions = [newCar, newAeroplane, newBus, newDiet, newHousehold];

  return allEmissions;
};


module.exports = EmissionFormView;
